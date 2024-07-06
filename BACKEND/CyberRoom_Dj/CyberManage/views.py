from django.contrib.auth import authenticate
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