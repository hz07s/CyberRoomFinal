from django.shortcuts import render
from rest_framework import serializers
from rest_framework import generics, viewsets, status
from rest_framework.views import APIView

from .models import (
    Machine,    
)
from .serializers import (
    MachineSerializer,
)
class MachineCreateAPIView(generics.CreateAPIView):
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer
    
class MachineListAPIView(generics.ListAPIView):
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer
    
class MachineDeleteAPIView(generics.DestroyAPIView):
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer
    lookup_field = 'idMachine' 
