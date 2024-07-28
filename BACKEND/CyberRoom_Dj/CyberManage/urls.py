from django.urls import path
from .views import (
    UserRegister,
    CustomTokenObtainPairView,
    UserLogout,
    UserEdit,
    UserDetail,
    UserCreateApiView,
    UserListApiView,
    UserDetailApiView,
    UserUpdateApiView,
    UserDeleteApiView,
    CreditCardCreateAPIView,
    CreditCardListAPIView,
    CreditCardUpdateAPIView,
    CreditCardDeleteAPIView,
    TariffCreateAPIView,
    TariffListAPIView,
    TariffDeleteAPIView,
    TariffUpdateAPIView,
    MachineCreateAPIView,
    MachineListAPIView,
    MachineDeleteAPIView,
    MachineUpdateAPIView,
    ReservationCreateAPIView,
    ReservationListAPIView,
    ReservationUpdateAPIView,
    ReservationDeleteAPIView,
    TransactionCreateAPIView,
    TransactionListAPIView,
    TransactionUpdateAPIView,
    TransactionDeleteAPIView,
    EventCreateAPIView,
    EventListAPIView,
    EventUpdateAPIView,
    EventDeleteAPIView,
    PromotionCreateAPIView,
    PromotionListAPIView,
    PromotionUpdateAPIView,
    PromotionDeleteAPIView,
    create_checkout_session,
    machine_stats
)
# from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [

    # Pay
    path('create-checkout-session/', create_checkout_session, name='create-checkout-session'),
    
    # USER URL's
    path('register/', UserRegister.as_view(), name='user-register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', UserLogout.as_view(), name='user-logout'),
    path('edit/', UserEdit.as_view(), name='user-edit'),
    path('profile/', UserDetail.as_view(), name='user-detail'),
    
    # USERMANAGE URL's
    path('user-manage/create/', UserCreateApiView.as_view(), name='user-manage-create'),
    path('user-manage/list/', UserListApiView.as_view(), name='user-manage-list'),
    path('user-manage/detail/', UserDetailApiView.as_view(), name='user-manage-detail'),
    path('user-manage/update/<int:id>/', UserUpdateApiView.as_view(), name='user-manage-update'),
    path('user-manage/delete/<int:id>/', UserDeleteApiView.as_view(), name='user-manage-delete'),
    
    # CREDITCARD URL's
    path('credit-card/create/', CreditCardCreateAPIView.as_view(), name='credit-card-create'),
    path('credit-card/list/', CreditCardListAPIView.as_view(), name='credit-card-list'),
    path('credit-card/update/<int:id>/', CreditCardUpdateAPIView.as_view(), name='credit-card-update'),
    path('credit-card/delete/<int:id>/', CreditCardDeleteAPIView.as_view(), name='credit-card-delete'),
    
    # TARIFF URL's
    path('tariffs/create/', TariffCreateAPIView.as_view(), name='tariff-create'),
    path('tariffs/list/', TariffListAPIView.as_view(), name='tariff-list'),
    path('tariffs/delete/<int:id>/', TariffDeleteAPIView.as_view(), name='tariff-delete'),
    path('tariffs/update/<int:id>/', TariffUpdateAPIView.as_view(), name='tariff-update'),  
    
    # Machine URLs
    path('machines/stats/', machine_stats, name='machine-stats'),
    
    path('machines/create/', MachineCreateAPIView.as_view(), name='machine-create'),
    path('machines/list/', MachineListAPIView.as_view(), name='machine-list'),
    path('machines/delete/<int:idMachine>/', MachineDeleteAPIView.as_view(), name='machine-delete'),
    path('machines/update/<int:idMachine>/', MachineUpdateAPIView.as_view(), name='machine-update'),
    
    # RESERVATIONS URL's
    path('reservation/create/', ReservationCreateAPIView.as_view(), name='reservation-create'),
    path('reservation/list/', ReservationListAPIView.as_view(), name='reservation-list'),
    path('reservation/update/<int:pk>/', ReservationUpdateAPIView.as_view(), name='reservation-update'),
    path('reservation/delete/<int:pk>/', ReservationDeleteAPIView.as_view(), name='reservation-delete'),
    
    # TRANSACTION URL's
    path('transaction/create/', TransactionCreateAPIView.as_view(), name='transaction-create'),
    path('transaction/list/', TransactionListAPIView.as_view(), name='transaction-list'),
    path('transaction/update/<int:id>/', TransactionUpdateAPIView.as_view(), name='transaction-update'),
    path('transaction/delete/<int:id>/', TransactionDeleteAPIView.as_view(), name='transaction-delete'),

    # EVENT URL's
    path('event/create/', EventCreateAPIView.as_view(), name='event-create'),
    path('event/list/', EventListAPIView.as_view(), name='event-list'),
    path('event/update/<int:id>/', EventUpdateAPIView.as_view(), name='event-update'),
    path('event/delete/<int:id>/', EventDeleteAPIView.as_view(), name='event-delete'),

    # PROMOTION URL's
    path('promotion/create/', PromotionCreateAPIView.as_view(), name='event-create'),
    path('promotion/list/', PromotionListAPIView.as_view(), name='event-list'),
    path('promotion/update/<int:id>/', PromotionUpdateAPIView.as_view(), name='event-update'),
    path('promotion/delete/<int:id>/', PromotionDeleteAPIView.as_view(), name='event-delete'),
]
