from django.db import models

# Create your models here.

class Tariff(models.Model):
    id = models.AutoField(primary_key=True)
    cost = models.DecimalField(max_digits=10, decimal_places=2)
    tarifRange = models.CharField(max_length=15) 
    
    def __str__(self):
        return f"{self.tarifRange} - Costo: {self.cost}"