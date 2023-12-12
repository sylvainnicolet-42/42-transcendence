from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions

class HelloWorldView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request):
        return Response({"message": "Hello World from Django!"})