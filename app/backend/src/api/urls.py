from django.urls import re_path
from . import views
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
    public=False,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    re_path(r'^$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^auth/token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    re_path(r'^auth/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    re_path(r'^auth/token/verify', TokenVerifyView.as_view(), name='token_verify'),
    re_path(r'^auth/register', views.RegisterView.as_view(), name='register'),
    re_path(r'^hello', views.HelloWorldView.as_view(), name='hello'),
    re_path(r'^tournaments/list', views.TournamentListView.as_view(), name='tournament-list'),
    re_path(r'^tournaments/detail/(?P<pk>[0-9]+)', views.TournamentDetailView.as_view(), name='tournament-detail'),
    re_path(r'^tournaments/create', views.TournamentCreateView.as_view(), name='tournament-create'),
    re_path(r'^tournaments/update/(?P<pk>[0-9]+)', views.TournamentUpdateView.as_view(), name='tournament-update'),
    re_path(r'^tournaments/delete/(?P<pk>[0-9]+)', views.TournamentDeleteView.as_view(), name='tournament-delete'),
]