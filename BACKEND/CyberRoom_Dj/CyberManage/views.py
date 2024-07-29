from django.contrib.auth import authenticate
from rest_framework import generics, status
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from rest_framework import generics, viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.state import TokenBackend
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken
from django.conf import settings
from .models import (
    User,
    CreditCard,
    Tariff,
    Machine,    
    Reservation,
    Transaction,
    Event,
    Promotion,
)
from .serializers import (
    UserSerializer,
    UserManageSerializer,
    UserManageCreateSerializer,
    CreditCardSerializer,
    TariffSerializer,
    MachineSerializer,
    ReservationSerializer,
    TransactionSerializer,
    EventSerializer,
    PromotionSerializer,
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

class UserLogout(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            print(str(e))
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class UserEdit(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

# USERMANAGE API's VIEW

class UserCreateApiView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserManageCreateSerializer(data=request.data)
        print("Datos recibidos:", request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("Errores de validación:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserListApiView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserManageSerializer

class UserDetailApiView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserManageSerializer

class UserUpdateApiView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserManageSerializer
    lookup_field = 'id'

class UserDeleteApiView(generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserManageSerializer
    lookup_field = 'id'

# CREDITCARD API's VIEW

class CreditCardCreateAPIView(generics.CreateAPIView):
    queryset = CreditCard.objects.all()
    serializer_class = CreditCardSerializer

class CreditCardListAPIView(generics.ListAPIView):
    queryset = CreditCard.objects.all()
    serializer_class = CreditCardSerializer

class CreditCardDeleteAPIView(generics.DestroyAPIView):
    queryset = CreditCard.objects.all()
    serializer_class = CreditCardSerializer
    lookup_field = 'id' 
    
class CreditCardUpdateAPIView(generics.UpdateAPIView):
    queryset = CreditCard.objects.all()
    serializer_class = CreditCardSerializer
    lookup_field = 'id'


# TARIFF API's VIEW

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


# MACHINE API's VIEW

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

class MachineUpdateAPIView(generics.UpdateAPIView):
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer
    lookup_field = 'idMachine'  # Asegúrate de que este campo existe en tu modelo


# RESERVATION API's VIEW

class ReservationCreateAPIView(generics.CreateAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

class ReservationListAPIView(generics.ListAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

class ReservationDeleteAPIView(generics.DestroyAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    lookup_field = 'id'

class ReservationUpdateAPIView(generics.UpdateAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    lookup_field = 'id'


# TRANSACTION API's VIEW

class TransactionCreateAPIView(generics.CreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

class TransactionListAPIView(generics.ListAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

class TransactionDeleteAPIView(generics.DestroyAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    lookup_field = 'id'

class TransactionUpdateAPIView(generics.UpdateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    lookup_field = 'id'


# EVENT API's VIEW

class EventCreateAPIView(generics.CreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class EventListAPIView(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class EventDeleteAPIView(generics.DestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    lookup_field = 'id'

class EventUpdateAPIView(generics.UpdateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    lookup_field = 'id'


# PROMOTION API's VIEW

class PromotionCreateAPIView(generics.CreateAPIView):
    queryset = Promotion.objects.all()
    serializer_class = PromotionSerializer

class PromotionListAPIView(generics.ListAPIView):
    queryset = Promotion.objects.all()
    serializer_class = PromotionSerializer

class PromotionDeleteAPIView(generics.DestroyAPIView):
    queryset = Promotion.objects.all()
    serializer_class = PromotionSerializer
    lookup_field = 'id'

class PromotionUpdateAPIView(generics.UpdateAPIView):
    queryset = Promotion.objects.all()
    serializer_class = PromotionSerializer
    lookup_field = 'id'

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Machine

@api_view(['GET'])
def machine_stats(request):
    total_machines = Machine.objects.count()
    active_machines = Machine.objects.filter(machineStatus__in=['available', 'booked']).count()
    inactive_machines = Machine.objects.filter(machineStatus__in=['disabled']).count()
    
    stats = {
        'total_machines': total_machines,
        'active_machines': active_machines,
        'inactive_machines': inactive_machines
    }
    
    return Response(stats)



# Pay
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import stripe

stripe.api_key = settings.STRIPE_SECRET_KEY

@csrf_exempt
def create_checkout_session(request):
    if request.method == 'POST':
        try:
            session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[{
                    'price_data': {
                        'currency': 'usd',
                        'product_data': {
                            'name': 'Producto de prueba',
                        },
                        'unit_amount': 2000,  # 20.00 USD
                    },
                    'quantity': 1,
                }],
                mode='payment',
                success_url='http://localhost:4200/success',  # Asegúrate de que esta URL sea correcta
                cancel_url='http://localhost:4200/cancel',    # Asegúrate de que esta URL sea correcta
            )
            return JsonResponse({'id': session.id})
        except Exception as e:
            return JsonResponse({'error': str(e)})
    return JsonResponse({'error': 'Método no permitido'}, status=405)



    # ----------------------------------------- END -----------------------------------------    
