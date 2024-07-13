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
