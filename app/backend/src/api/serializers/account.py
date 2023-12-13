from rest_framework import serializers
from ..models import Account

class AccountSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = Account
        fields = ('username', 'password')

    def create(self, validated_data):
        # Check if user already exists
        if Account.objects.filter(username=validated_data['username']).exists():
            raise serializers.ValidationError({'username': 'Username already exists.'})
        user = Account.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user

class AccountDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'username', 'bio')