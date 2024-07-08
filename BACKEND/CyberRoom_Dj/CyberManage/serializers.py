from rest_framework import serializers
from .models import (
    User,
)

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

class UserManageSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'user_type', 'name', 'lastName', 'imagen', 'balance', 'dni', 'phoneNumber', 'age', 'gender']

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