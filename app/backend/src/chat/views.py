from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Respose
from rest_framework import permission, generics, status
from drf_yasg.utils import swagger_auto_schema

# Create your views here.

class ChatView(APIView):
    permission_classes = [permission.AllowAny]
    def get(self, request):
        return Response({"message": "Hello from Backend"})
