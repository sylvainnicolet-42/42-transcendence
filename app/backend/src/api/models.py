from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Account(AbstractUser):
    bio = models.TextField(max_length=200, blank=True)

class Tournament(models.Model):
    objects = models.Manager()
    name = models.CharField(max_length=100)
    points_to_win = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(10)]
    )
    created_at = models.DateTimeField(auto_now_add=True, null=False)
    started_at = models.DateTimeField(null=True)
    finished_at = models.DateTimeField(null=True)

    STATUS_CHOICES = [
        ('not_started', 'Not Started'),
        ('in_progress', 'In Progress'),
        ('done', 'Done'),
    ]
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='not_started',
        null=False
    )