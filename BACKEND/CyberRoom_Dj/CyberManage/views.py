from django.shortcuts import render
from .models import (
    Tariff,
)
from .serializers import (
    TariffSerializer,
)

class TariffCreateAPIView(generics.CreateAPIView):
    queryset = Tariff.objects.all()
    serializer_class = TariffSerializer

class TariffListAPIView(generics.ListAPIView):
    queryset = Tariff.objects.all()
    serializer_class = TariffSerializer
    
class TariffDeleteAPIView(generics.DestroyAPIView):
    queryset = Tariff.objects.all()
    serializer_class = TariffSerializer
    lookup_field = 'id'

class TariffUpdateAPIView(generics.UpdateAPIView):
    queryset = Tariff.objects.all()
    serializer_class = TariffSerializer
    lookup_field = 'id'