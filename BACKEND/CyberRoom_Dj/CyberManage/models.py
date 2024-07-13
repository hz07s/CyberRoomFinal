from django.db import models

# Create your models here.

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