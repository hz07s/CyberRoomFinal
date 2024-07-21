from datetime import timezone
from django.db import models

# Create your models here.
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