from django.urls import path
from .views import (
    TariffCreateAPIView,
    TariffListAPIView,
    TariffDeleteAPIView,
    TariffUpdateAPIView,
)

urlpatterns = [
   
    # TARIFF URL's
    path('tariffs/create/', TariffCreateAPIView.as_view(), name='tariff-create'),
    path('tariffs/list/', TariffListAPIView.as_view(), name='tariff-list'),
    path('tariffs/delete/<int:id>/', TariffDeleteAPIView.as_view(), name='tariff-delete'),
    path('tariffs/update/<int:id>/', TariffUpdateAPIView.as_view(), name='tariff-update'),  
    
]