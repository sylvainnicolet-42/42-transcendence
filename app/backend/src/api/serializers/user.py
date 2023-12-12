from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = User
        fields = ('username', 'password')

    def create(self, validated_data):
        # Check if user already exists
        if User.objects.filter(username=validated_data['username']).exists():
            raise serializers.ValidationError({'username': 'Username already exists.'})
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user