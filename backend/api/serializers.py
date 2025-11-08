from rest_framework import serializers
from .models import EarthquakeInfo, CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'password', 'first_name', 'last_name', 'region', 'province','city','barangay']
        extra_kwargs = {"password": {"write_only": True}}

class EarthquakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EarthquakeInfo
        fields = ['id','date_time_ph', 'latitude', 'longtitude', 'magnitude', 'location', 'specific_loc', 'general_loc']
        read_only_fields = ['id']
        