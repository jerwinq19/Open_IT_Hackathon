from django.urls import path
from . import views
urlpatterns = [
    path('data/', views.GetEQdata.as_view(), name="get_loc"),
    path('data/<int:pk>/', views.GetOneEQdata.as_view(), name="get_one_loc"),
    path('data/magnitude/', views.RetriveEQByMag.as_view()),
    path('data/location/', views.EQLocationsView.as_view()),
    path('logout/', views.LogoutView.as_view(), name="log_out"),
    path('register/', views.RegisterUser.as_view(), name="register"),
    # path('dashboard/data/', views.DashboardData.as_view(), name="dashboard_data"),d
]
