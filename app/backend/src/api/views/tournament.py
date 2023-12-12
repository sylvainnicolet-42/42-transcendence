from rest_framework import permissions, generics
from ..models.tournament import Tournament
from ..serializers.tournament import TournamentSerializer

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