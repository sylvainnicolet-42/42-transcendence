from django.contrib import admin
from django.urls import include, path
from .views import redirect_to_api

urlpatterns = [
    path('', redirect_to_api),
    path('admin', admin.site.urls),
    path('api', include('api.urls')),
]