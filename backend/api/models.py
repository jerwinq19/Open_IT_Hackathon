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

class Report(models.Model):
    
    STAT_CHOICES = (
        ('Accepted', 'Accepted'),
        ('Rejected', 'Rejected'),
    )
    
    who = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    when = models.DateTimeField(auto_now_add=True)
    where = models.CharField(max_length=400)
    description = models.TextField()
    report_status = models.CharField(max_length=20, default="Rejected", choices=STAT_CHOICES)
    
    def __str__(self):
        return f"{self.who.username} - {self.report_status}"