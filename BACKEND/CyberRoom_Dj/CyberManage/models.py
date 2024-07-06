from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

    # USER MODEL

class UserManager(BaseUserManager):
    def create_user(self, email, username, password = None):
        if not email:
            raise ValueError('El usuario debe tener un correo electrónico')
        
        usuario = self.model(
            username = username,
            email = self.normalize_email(email)
        )
        
        usuario.set_password(password)
        usuario.save()
        return usuario
    
    def create_superuser(self, email, username, password):
        usuario = self.create_user(
            email,
            username = username,
            password = password
        )
        
        usuario.usuario_administrador = True
        usuario.user_type = 'admin'
        usuario.save()
        return usuario
    
    def create_total_user(self, email, username, user_type, name, lastName, imagen, balance, dni, phoneNumber, age, gender, password = None):
        if not email:
            raise ValueError('El usuario debe tener un correo electrónico')
        
        usuario = self.model(
            username = username,
            email = self.normalize_email(email),
            user_type = user_type,
            name = name,
            lastName = lastName,
            imagen = imagen,
            balance = balance,
            dni = dni,
            phoneNumber = phoneNumber,
            age = age,
            gender = gender
        )
        
        usuario.set_password(password)
        usuario.save()
        return usuario
        
class User(AbstractBaseUser):
    ADMIN = 'admin'
    EMPLOYEE = 'employee'
    CLIENT = 'client'

    USER_TYPE_CHOICES = [
        (ADMIN, 'Administrador'),
        (EMPLOYEE, 'Employee'),
        (CLIENT, 'Client'),
    ]
    
    username = models.CharField('Nombre de usuario', unique = True, max_length = 100)
    email = models.EmailField('Correo Electrónico', max_length = 254, unique = True)
    user_type = models.CharField(max_length=15, choices=USER_TYPE_CHOICES, default=CLIENT)
    name = models.CharField('Nombres', max_length=200, blank = True, null = True)
    lastName = models.CharField('Apellidos', max_length=200, blank = True, null = True)
    imagen = models.CharField('Imagen de Perfil', max_length=200, blank = True, null = True)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default = 0.00)
    dni = models.CharField(max_length=20, blank = True, null = True)
    phoneNumber = models.CharField(max_length=20, blank = True, null = True)
    age = models.IntegerField(blank = True, null = True)
    gender = models.CharField(max_length=10, blank = True, null = True)
    registrationDate = models.DateField(auto_now_add=True)
    usuario_activo = models.BooleanField(default = True)
    usuario_administrador = models.BooleanField(default = False)
    objects = UserManager()
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']
    
    def __str__(self):
        return f'{self.username},{self.lastName}'
    
    def has_perm(self,perm,obj = None):
        return True
    
    def has_module_perms(self,app_label):
        return True
    
    @property
    def is_staff(self):
        return self.usuario_administrador