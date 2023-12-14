from rest_framework import permissions, generics, status, serializers
from ..models import Account
from ..serializers.account import AccountDetailSerializer
from ..serializers.friend import FriendRequestSerializer
from rest_framework.response import Response

class UserListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Account.objects.all()
    serializer_class = AccountDetailSerializer

class UserDetailView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Account.objects.all()
    serializer_class = AccountDetailSerializer
    lookup_field = 'pk'


class UserFriendRequestView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Account.objects.all()
    serializer_class = AccountDetailSerializer

    def post(self, request):
        # Check if user exists
        try:
            user = Account.objects.get(username=request.data['username'])
        except Account.DoesNotExist:
            raise serializers.ValidationError({'error': 'User does not exist.'})
        # Check if user is not blocked
        if request.user.blocked_users.filter(username=user.username).exists():
            raise serializers.ValidationError({'error': 'User is blocked.'})
        # Check if user is already a friend
        if request.user.friends.filter(username=user.username).exists():
            raise serializers.ValidationError({'error': 'User is already a friend.'})
        # Check if user already sent a friend request
        if request.user.friend_requests.filter(username=user.username).exists():
            raise serializers.ValidationError({'error': 'Friend request already sent.'})
        # Check if user is not the same
        if request.user.username == user.username:
            raise serializers.ValidationError({'error': 'You cannot send a friend request to yourself.'})
        # Send friend request
        request.user.friend_requests.add(user)
        return Response(self.get_serializer(request.user).data, status=status.HTTP_200_OK)

class UserFriendRequestDeleteView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Account.objects.all()
    serializer_class = AccountDetailSerializer

    def delete(self, request):
        # Check if user exists
        try:
            user = Account.objects.get(username=request.data['username'])
        except Account.DoesNotExist:
            raise serializers.ValidationError({'username': 'User does not exist.'})
        # Check if user already sent a friend request
        if not request.user.friend_requests.filter(username=user.username).exists():
            raise serializers.ValidationError({'username': 'Friend request not sent.'})
        # Delete friend request
        request.user.friend_requests.remove(user)
        return Response(self.get_serializer(request.user).data, status=status.HTTP_200_OK)

class UserFriendRequestSentView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Account.objects.all()
    serializer_class = FriendRequestSerializer

    def get(self, request):
        return Response(self.get_serializer(request.user.friend_requests.all(), many=True).data, status=status.HTTP_200_OK)

class UserFriendRequestReceivedView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Account.objects.all()
    serializer_class = AccountDetailSerializer

    def get(self, request):
        return Response(self.get_serializer(request.user.related_friend_requests.all(), many=True).data, status=status.HTTP_200_OK)

class UserFriendRequestAcceptView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Account.objects.all()
    serializer_class = AccountDetailSerializer

    def post(self, request):
        # Check if user exists
        try:
            user = Account.objects.get(username=request.data['username'])
        except Account.DoesNotExist:
            raise serializers.ValidationError({'username': 'User does not exist.'})
        # Check if user already sent a friend request
        if not request.user.related_friend_requests.filter(username=user.username).exists():
            raise serializers.ValidationError({'username': 'Friend request not received.'})
        # Accept friend request
        request.user.friends.add(user)
        request.user.friend_requests.remove(user)
        return Response(self.get_serializer(request.user).data, status=status.HTTP_200_OK)

class UserFriendRequestRejectView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Account.objects.all()
    serializer_class = AccountDetailSerializer

    def post(self, request):
        # Check if user exists
        try:
            user = Account.objects.get(username=request.data['username'])
        except Account.DoesNotExist:
            raise serializers.ValidationError({'username': 'User does not exist.'})
        # Check if user already sent a friend request
        if not request.user.related_friend_requests.filter(username=user.username).exists():
            raise serializers.ValidationError({'username': 'Friend request not received.'})
        # Reject friend request
        request.user.friend_requests.remove(user)
        return Response(self.get_serializer(request.user).data, status=status.HTTP_200_OK)




class UserBlockView(generics.CreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Account.objects.all()
    serializer_class = AccountDetailSerializer

    def post(self, request, *args, **kwargs):
        # Check if user exists
        try:
            user = Account.objects.get(pk=kwargs['pk'])
        except Account.DoesNotExist:
            raise serializers.ValidationError({'username': 'User does not exist.'})
        # Check if user is not blocked
        if request.user.blocked_users.filter(username=user.username).exists():
            raise serializers.ValidationError({'username': 'User is already blocked.'})
        # Check if user is not the same
        if request.user.username == user.username:
            raise serializers.ValidationError({'username': 'You cannot block yourself.'})
        # Block user
        request.user.blocked_users.add(user)
        return Response(self.get_serializer(request.user).data, status=status.HTTP_200_OK)

class UserUnblockView(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Account.objects.all()
    serializer_class = AccountDetailSerializer

    def delete(self, request, *args, **kwargs):
        # Check if user exists
        try:
            user = Account.objects.get(pk=kwargs['pk'])
        except Account.DoesNotExist:
            raise serializers.ValidationError({'username': 'User does not exist.'})
        # Check if user is blocked
        if not request.user.blocked_users.filter(username=user.username).exists():
            raise serializers.ValidationError({'username': 'User is not blocked.'})
        # Unblock user
        request.user.blocked_users.remove(user)
        return Response(self.get_serializer(request.user).data, status=status.HTTP_200_OK)

class UserBlockListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Account.objects.all()
    serializer_class = AccountDetailSerializer

    def get_queryset(self):
        return self.request.user.blocked_users.all()