from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework import permissions, status, generics
from ..serializers.account import AccountSerializer, AccountDetailSerializer
from ..models import Account
from drf_yasg.utils import swagger_auto_schema

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    @swagger_auto_schema(request_body=AccountSerializer)
    def post(self, request):
        serializer = AccountSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AccountListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Account.objects.all()
    serializer_class = AccountDetailSerializer

class AccountDetailView(RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Account.objects.all()
    serializer_class = AccountDetailSerializer

    def get_object(self):
        return self.request.user

class AccountUpdateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request):
        user = request.user
        serializer = AccountDetailSerializer(user, data=request.data)
        if serializer.is_valid():
            if 'avatar' in request.data:
                user.avatar.delete()
                user.avatar = request.data['avatar']
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AccountDeleteView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request):
        user = request.user
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class AccountDeleteAvatarView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request):
        user = request.user
        if user.avatar:
            user.avatar.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_404_NOT_FOUND)