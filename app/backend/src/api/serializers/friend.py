from rest_framework import serializers
from ..models import Account

class FriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = [
            'id',
            'username',
            'avatar'
        ]