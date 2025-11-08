from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    region = models.CharField(max_length=300, default="")
    province = models.CharField(max_length=300, default="")
    city = models.CharField(max_length=300, default="")
    barangay = models.CharField(max_length=300, default="")
    
    def __str__(self):
        return f"{self.username} - {self.region}"

class EarthquakeInfo(models.Model):
    date_time_ph = models.DateTimeField(auto_now_add=False)
    latitude = models.FloatField(default=0.0)
    longtitude = models.FloatField(default=0.0)
    magnitude = models.FloatField(default=0.0)
    location = models.CharField(default="", max_length=500)
    specific_loc = models.CharField(default="", max_length=300)
    general_loc = models.CharField(default="", max_length=300)
    
    def __str__(self):
        return f"{self.location}"