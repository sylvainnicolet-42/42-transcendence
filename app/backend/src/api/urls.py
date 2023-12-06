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
    re_path(r'^tournaments/list', views.TournamentList.as_view(), name='tournament-list'),
    re_path(r'^tournaments/detail/(?P<pk>[0-9]+)', views.TournamentDetail.as_view(), name='tournament-detail'),
    re_path(r'^tournaments/create', views.TournamentCreate.as_view(), name='tournament-create'),
    re_path(r'^tournaments/update/(?P<pk>[0-9]+)', views.TournamentUpdate.as_view(), name='tournament-update'),
    re_path(r'^tournaments/delete/(?P<pk>[0-9]+)', views.TournamentDelete.as_view(), name='tournament-delete'),
]