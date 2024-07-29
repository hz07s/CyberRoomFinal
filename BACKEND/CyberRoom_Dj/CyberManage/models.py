from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.utils import timezone
from django.urls import reverse


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
    
    

    # CREDITCARD MODEL

class CreditCard(models.Model):
    id = models.AutoField(primary_key=True)
    idUser = models.ForeignKey(User, on_delete=models.CASCADE, related_name='credit_cards')
    creditCardBalance = models.DecimalField(max_digits=10, decimal_places=2)
    expirationDate = models.DateField()
    creditCardNumber = models.CharField(max_length=16)

    def __str__(self):
        return f"Credit Card {self.id} for User {self.idUser.username}"

    # TARIFF MODEL

class Tariff(models.Model):
    id = models.AutoField(primary_key=True)
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    tarifRange = models.CharField(max_length=15) 
    
    def __str__(self):
        return f"{self.tarifRange} - Costo: {self.cost}"
        

    # MACHINE MODEL

class Machine(models.Model):
    AVAILABLE = 'available'
    BOOKED = 'booked'
    DISABLED = 'disabled'

    MACHINE_STATE_CHOICES = [
        (AVAILABLE, 'Disponible'),
        (BOOKED, 'Reservada'),
        (DISABLED, 'Deshabilitada'),
    ]

    idMachine = models.AutoField(primary_key=True)
    machineName = models.CharField(max_length=100)
    machineRange = models.ForeignKey(Tariff, on_delete=models.CASCADE)
    assignedUser = models.CharField(max_length=100, blank=True, null=True)
    machineStatus = models.CharField(
        max_length=20,
        choices=MACHINE_STATE_CHOICES,
        default=AVAILABLE,
    )
    # price_per_hour = models.DecimalField(max_digits=10, decimal_places=2)
    operatingSystem = models.CharField(max_length=50)
    installedSoftware = models.TextField()
    lastMaintenance = models.DateField()
    acquisitionDate = models.DateField()
    ipAddress = models.CharField(max_length=15)
    macAddress = models.CharField(max_length=17)
    processor = models.CharField(max_length=50)
    ram = models.IntegerField()
    hardDrive = models.CharField(max_length=50)
    location = models.CharField(max_length=100)
    additionalNotes = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.machineName

    # RESERVATION MODEL

class Reservation(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
    ]

    id = models.AutoField(primary_key=True)
    idUser = models.ForeignKey('User', on_delete=models.CASCADE)
    idMachine = models.ForeignKey('Machine', on_delete=models.CASCADE)
    startTime = models.DateTimeField(default=timezone.now)
    endTime = models.DateTimeField()
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    reservationStatus = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')

    def __str__(self):
        return f'Reservation {self.id} - {self.reservationStatus}'


    # TRANSACTION MODEL

class Transaction(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ]

    id = models.AutoField(primary_key=True)
    idReservation = models.OneToOneField('Reservation', on_delete=models.CASCADE)
    idUser = models.ForeignKey('User', on_delete=models.CASCADE, blank=True, null=True)
    idMachine = models.ForeignKey('Machine', on_delete=models.CASCADE, blank=True, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    transactionDate = models.DateTimeField(default=timezone.now)
    transactionStatus = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')

    def save(self, *args, **kwargs):
        if self.idReservation:
            self.idUser = self.idReservation.idUser
            self.idMachine = self.idReservation.idMachine
        super().save(*args, **kwargs)

    def __str__(self):
        return f'Transaction {self.id} - {self.transactionStatus}'

    # Events Model
class Event (models.Model):
    id = models.AutoField(primary_key=True)
    nameEvent = models.CharField(max_length=100)
    description = models.TextField()
    startDate = models.DateTimeField(default=timezone.now)
    completionDate = models.DateTimeField()

        # Promotions Model
class Promotion (models.Model):
    id = models.AutoField(primary_key=True)
    namePromotion = models.CharField(max_length=50)
    description = models.TextField(max_length=500)
    startDate = models.DateTimeField(default=timezone.now)
    completionDate = models.DateTimeField()
    
    # ----------------------------------------- END ----------------------------------------
