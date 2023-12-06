from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions

class HelloWorld(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request):
        """
        Return a Hello World message.
        """
        return Response({"message": "Hello World!"})