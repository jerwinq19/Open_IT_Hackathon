from django.shortcuts import render
from .models import EarthquakeInfo, CustomUser, Report
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

class GetOneEQdata(generics.RetrieveAPIView):
    serializer_class = EarthquakeSerializer
    queryset = EarthquakeInfo.objects.all()
    

class DashboardData(views.APIView):
    # permission_classes = [IsAuthenticated]
    
    def get(self, request):
        total_eq_cases = EarthquakeInfo.objects.all().count()
        total_reports = Report.objects.all().count()
        
        return Response({
            "average_magnitude": total_eq_cases,
            'total_reports': total_reports
        })
        
class RetriveEQByMag(generics.ListAPIView):
    serializer_class = EarthquakeSerializer
    
    def get_queryset(self):
        start = self.request.GET.get('start')
        end = self.request.GET.get('end')
        
        print(start)
        print(end)
        
        return EarthquakeInfo.objects.filter(magnitude__range=(start, end)).order_by('-date_time_ph')

class EQLocationsView(generics.ListAPIView):
    serializer_class = EarthquakeSerializer
    
    def get_queryset(self):
        loc = self.request.GET.get('loc')
        
        return EarthquakeInfo.objects.filter(location__icontains=(loc))
