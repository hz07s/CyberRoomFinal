from rest_framework import serializers
from .models import (
    Tariff,
)

# TARIFF SERIALIZER
class TariffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tariff
        fields = '__all__'
