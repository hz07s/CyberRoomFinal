from django.urls import path
from .views import (
    MachineCreateAPIView,
    MachineListAPIView,
    MachineDeleteAPIView,
    MachineUpdateAPIView,
)

urlpatterns = [ 
   
    # Machine URLs  
    path('machines/create/', MachineCreateAPIView.as_view(), name='machine-create'),
    path('machines/list/', MachineListAPIView.as_view(), name='machine-list'),
    path('machines/delete/<int:idMachine>/', MachineDeleteAPIView.as_view(), name='machine-delete'),
    path('machines/update/<int:idMachine>/', MachineUpdateAPIView.as_view(), name='machine-update'),
]
