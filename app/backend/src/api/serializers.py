from rest_framework import serializers
from .models import Tournament
from django.contrib.auth.models import User

class UserSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        # Check if user already exists
        if User.objects.filter(username=validated_data['username']).exists():
            raise serializers.ValidationError({'username': 'Username already exists.'})
        if User.objects.filter(email=validated_data['email']).exists():
            raise serializers.ValidationError({'email': 'Email already exists.'})
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password']
        )
        return user

class TournamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = '__all__'