from django.urls import path
from . import views
from rest_framework import permissions
from rest_framework_simplewt.views import(
    TokenObtainPairView,
    ToekenRefreshView,
    TokenVerifyView)
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
import os

schema_view = get_schema_view(
    openapi.Info(
        title="Transcendence API",
        default_version='v1',
        description="Welcome to the Transcendence API documentation."
    ),
    urls=os.getenv("BACKEND_API_URL"),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
        path('/chat', views.ChatView.as_view(), name='chat'),
]
