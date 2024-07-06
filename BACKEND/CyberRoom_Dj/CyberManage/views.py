from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers
from .models import (
    User,
)
from .serializers import (
    UserSerializer,
)

# USER API's VIEW

class CustomTokenObtainPairSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        user = authenticate(username=attrs['username'], password=attrs['password'])
        if user is not None:
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            payload = {
                'refresh': str(refresh),
                'access': access_token,
                'user_type': user.user_type  # Agregar tipo de usuario al payload
            }
            return payload
        else:
            raise serializers.ValidationError("Invalid credentials")

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class UserRegister(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)