# DjangoApp/urls.py
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import ping, register

urlpatterns = [
    # Админ‑панель
    path('admin/', admin.site.urls),

    # API‑префикс
    path('api/ping/', ping, name='ping'),

    # JWT‑аутентификация
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Регистрация нового пользователя
    path('api/register/', register, name='register'),
]
