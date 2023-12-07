from django.urls import path
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
    path('', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('auth/token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/token/verify', TokenVerifyView.as_view(), name='token_verify'),
    path('auth/register', views.RegisterView.as_view(), name='register'),
    path('hello', views.HelloWorldView.as_view(), name='hello'),
    path('tournaments/list', views.TournamentListView.as_view(), name='tournament-list'),
    path('tournaments/detail/<int:pk>', views.TournamentDetailView.as_view(), name='tournament-detail'),
    path('tournaments/create', views.TournamentCreateView.as_view(), name='tournament-create'),
    path('tournaments/update/<int:pk>', views.TournamentUpdateView.as_view(), name='tournament-update'),
    path('tournaments/delete/<int:pk>', views.TournamentDeleteView.as_view(), name='tournament-delete'),
]