from rest_framework_simplejwt.views import TokenObtainPairView
from .models import (
    User,
)
from .serializers import (
    UserSerializer,
)

# USER API's VIEW


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer