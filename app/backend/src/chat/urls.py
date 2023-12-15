from django.urls import path
from . import views

urlpatterns = [
    path("", views.ChatView, name="chat"),
];
