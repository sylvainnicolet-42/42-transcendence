from django.urls import path
from .views.hello import HelloWorldView
from .views.account import (
    RegisterView,
    AccountDetailView,
    AccountUpdateView,
    AccountDeleteView,
    AccountDeleteAvatarView
)
from .views.user import (
    UserListView,
    UserDetailView,
    UserFriendRequestView,
    UserFriendRequestDeleteView,
    UserFriendRequestSentView,
    UserFriendRequestReceivedView,
    UserFriendRequestAcceptView,
    UserFriendRequestRejectView,
    UserBlockView,
    UserUnblockView,
    UserBlockListView
)
from .views.tournament import (
    TournamentListView,
    TournamentDetailView,
    TournamentCreateView,
    TournamentUpdateView,
    TournamentDeleteView
)
from rest_framework import permissions
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
import os

schema_view = get_schema_view(
    openapi.Info(
        title="Transcendence API",
        default_version='v1',
        description="Welcome to the Transcendence API documentation."
    ),
    url=os.getenv("BACKEND_API_URL"),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('/hello', HelloWorldView.as_view(), name='hello-world'),

    # Authentication
    path('/auth/token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('/auth/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('/auth/token/verify', TokenVerifyView.as_view(), name='token_verify'),
    path('/auth/register', RegisterView.as_view(), name='auth_register'),

    # Accounts
    path('/accounts/detail', AccountDetailView.as_view(), name='profile-detail'),
    path('/accounts/update', AccountUpdateView.as_view(), name='profile-update'),
    path('/accounts/delete', AccountDeleteView.as_view(), name='profile-delete'),
    path('/accounts/delete-avatar', AccountDeleteAvatarView.as_view(), name='profile-delete-avatar'),

    # Users
    path('/users/list', UserListView.as_view(), name='player-list'),
    path('/users/detail/<int:pk>', UserDetailView.as_view(), name='player-detail'),
    path('/users/friend-requests/<int:pk>', UserFriendRequestView.as_view(), name='friend-request'),
    path('/users/friend-requests/delete', UserFriendRequestDeleteView.as_view(), name='friend-request-delete'),
    path('/users/friend-requests/sent', UserFriendRequestSentView.as_view(), name='friend-request-sent'),
    path('/users/friend-requests/received', UserFriendRequestReceivedView.as_view(), name='friend-request-received'),
    path('/users/friend-requests/accept', UserFriendRequestAcceptView.as_view(), name='friend-request-accept'),
    path('/users/friend-requests/reject', UserFriendRequestRejectView.as_view(), name='friend-request-reject'),
    path('/users/block/<int:pk>', UserBlockView.as_view(), name='user-block'),
    path('/users/unblock/<int:pk>', UserUnblockView.as_view(), name='user-unblock'),
    path('/users/block/list', UserBlockListView.as_view(), name='user-block-list'),

    # Tournaments
    path('/tournaments/list', TournamentListView.as_view(), name='tournament-list'),
    path('/tournaments/detail/<int:pk>', TournamentDetailView.as_view(), name='tournament-detail'),
    path('/tournaments/create', TournamentCreateView.as_view(), name='tournament-create'),
    path('/tournaments/update/<int:pk>', TournamentUpdateView.as_view(), name='tournament-update'),
    path('/tournaments/delete/<int:pk>', TournamentDeleteView.as_view(), name='tournament-delete'),
]