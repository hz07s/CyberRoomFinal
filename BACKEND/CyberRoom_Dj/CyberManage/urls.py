from django.urls import path
from .views import *
# from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
# TRANSACTION URL's
    path('transaction/create/', TransactionCreateAPIView.as_view(), name='transaction-create'),
    path('transaction/list/', TransactionListAPIView.as_view(), name='transaction-list'),
    path('transaction/update/<int:id>/', TransactionUpdateAPIView.as_view(), name='transaction-update'),
    path('transaction/delete/<int:id>/', TransactionDeleteAPIView.as_view(), name='transaction-delete'),
]