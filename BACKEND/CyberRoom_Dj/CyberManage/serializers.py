from rest_framework import serializers
from .models import (
    User,
    CreditCard,
    Tariff,
    Machine,
    Reservation,
    Transaction,
    Event,
    Promotion,

    # USER SERIALIZER
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'name', 'lastName', 'imagen', 'balance', 'dni', 'phoneNumber', 'age', 'gender']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user

    
# class UserManageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = '__all__'


class UserManageSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'user_type', 'name', 'lastName', 'imagen', 'balance', 'dni', 'phoneNumber', 'age', 'gender']
        #extra_kwargs = {'password': {'write_only': True}}
    


class UserManageCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'user_type', 'name', 'lastName', 'imagen', 'balance', 'dni', 'phoneNumber', 'age', 'gender']
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        user = User.objects.create_total_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password'],
            user_type=validated_data['user_type'],
            name=validated_data.get('name', ''),
            lastName=validated_data.get('lastName', ''),
            imagen=validated_data.get('imagen', None),
            balance=validated_data.get('balance', 0.00),
            dni=validated_data.get('dni', ''),
            phoneNumber=validated_data.get('phoneNumber', ''),
            age=validated_data.get('age', None),
            gender=validated_data.get('gender', '')
        )
        return user

    # CREDITCARD SERIALIZER

class CreditCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditCard
        fields = '__all__'


    # TARIFF SERIALIZER

class TariffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tariff
        fields = '__all__'


    # MACHINE SERIALIZER

class MachineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Machine
        fields = '__all__'

    # RESERVATION SERIALIZER

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'
    # TRANSACTION SERIALIZER

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'

    # EVENT SERIALIZER
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


























































































>>>>>>> 9048d795664d6b642211587491fd8bacfdd6a656

    # PROMOTION SERIALIZER

class PromotionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Promotion
        fields = '__all__'
<<<<<<< HEAD
    # ----------------------------------------- END -----------------------------------------
=======
>>>>>>> 9048d795664d6b642211587491fd8bacfdd6a656
