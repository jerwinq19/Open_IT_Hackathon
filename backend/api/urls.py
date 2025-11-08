from django.urls import path
from . import views
urlpatterns = [
    path('data/', views.GetLocAndGenLoc.as_view(), name="get_loc"),
    path('logout/', views.LogoutView.as_view(), name="log_out"),
    path('register/', views.RegisterUser.as_view(), name="register")
]
