from rest_framework import permissions, generics, status, serializers
from ..models import Account
from ..serializers.account import AccountDetailSerializer
from rest_framework.response import Response

class UserBlockView(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Account.objects.all()
    serializer_class = AccountDetailSerializer

    def post(self, request, *args, **kwargs):
        # Check if user exists
        try:
            user = Account.objects.get(pk=kwargs['pk'])
        except Account.DoesNotExist:
            raise serializers.ValidationError({'username': 'User does not exist.'})
        # Check if user is not blocked
        if request.user.blocked_users.filter(username=user.username).exists():
            raise serializers.ValidationError({'username': 'User is already blocked.'})
        # Check if user is not the same
        if request.user.username == user.username:
            raise serializers.ValidationError({'username': 'You cannot block yourself.'})
        # Block user
        request.user.blocked_users.add(user)
        return Response(self.get_serializer(request.user).data, status=status.HTTP_200_OK)

class UserUnblockView(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Account.objects.all()
    serializer_class = AccountDetailSerializer

    def delete(self, request, *args, **kwargs):
        # Check if user exists
        try:
            user = Account.objects.get(pk=kwargs['pk'])
        except Account.DoesNotExist:
            raise serializers.ValidationError({'username': 'User does not exist.'})
        # Check if user is blocked
        if not request.user.blocked_users.filter(username=user.username).exists():
            raise serializers.ValidationError({'username': 'User is not blocked.'})
        # Unblock user
        request.user.blocked_users.remove(user)
        return Response(self.get_serializer(request.user).data, status=status.HTTP_200_OK)

class UserBlockListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Account.objects.all()
    serializer_class = AccountDetailSerializer

    def get_queryset(self):
        return self.request.user.blocked_users.all()