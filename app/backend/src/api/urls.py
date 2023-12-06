from django.urls import re_path
from . import views
from rest_framework import permissions
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
    re_path(r'^hello', views.HelloWorld.as_view(), name='hello'),
]