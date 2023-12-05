from django.urls import path
from . import views

urlpatterns = [
    path('hello', views.HelloWorld.as_view(), name='hello'),
]