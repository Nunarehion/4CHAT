# DjangoApp/urls.py
from django.contrib import admin
from django.urls import path
from . import views 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/ping/', views.ping, name='ping'),
]
