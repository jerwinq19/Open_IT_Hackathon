from django.shortcuts import render
from .models import EarthquakeInfo, CustomUser
from rest_framework import generics, views
from .serializers import EarthquakeSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from django.db.models import Avg

class LogoutView(views.APIView):
    def post(self, request):
        try:
            refresh_token = request.data.get('refresh_token')
            if not refresh_token:
                return Response({"message": "No refresh token."})
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Successfully log out."}, status=status.HTTP_200_OK)
        except Exception as e:
                return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class RegisterUser(generics.CreateAPIView):
    serializer_class = UserSerializer
    queryset = CustomUser.objects.all()
    permission_classes = [AllowAny]

class GetEQdata(generics.ListAPIView):
    serializer_class = EarthquakeSerializer
    queryset = EarthquakeInfo.objects.all()
    # permission_classes = [IsAuthenticated]

class DashboardData(views.APIView):
    # permission_classes = [IsAuthenticated]
    
    def get(self, request):
        total_ea_caces = EarthquakeInfo.objects.all().count()
        average_magnitude = EarthquakeInfo.objects.aggregate(average=(Avg('magnitude')))
        
        return Response({
            "average_magnitude": average_magnitude
        })