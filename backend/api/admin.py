from django.contrib import admin
from .models import EarthquakeInfo, Report
# Register your models here.


admin.site.register(EarthquakeInfo)
admin.site.register(Report)