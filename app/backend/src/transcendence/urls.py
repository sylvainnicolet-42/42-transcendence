from django.contrib import admin
from django.urls import include, re_path
from .views import redirect_to_api

urlpatterns = [
    re_path(r'^$', redirect_to_api),
    re_path(r'^admin/', admin.site.urls),
    re_path(r'^api/', include('api.urls')),
]