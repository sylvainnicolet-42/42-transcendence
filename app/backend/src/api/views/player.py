from rest_framework import permissions, generics
from ..models import Account
from ..serializers.account import AccountDetailSerializer

class PlayerListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Account.objects.all()
    serializer_class = AccountDetailSerializer
