from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, generics, status
from .models.tournament import Tournament
from .serializers.tournament import TournamentSerializer
from .serializers.user import UserSerializer
from drf_yasg.utils import swagger_auto_schema

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    @swagger_auto_schema(request_body=UserSerializer)
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class HelloWorldView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request):
        return Response({"message": "Hello World from Django!"})

class TournamentListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer

class TournamentDetailView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer

class TournamentCreateView(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer

class TournamentUpdateView(generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer

class TournamentDeleteView(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer