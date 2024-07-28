from django.contrib import admin
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

admin.site.register(User)
admin.site.register(CreditCard)
admin.site.register(Tariff)
admin.site.register(Machine)
admin.site.register(Reservation)
admin.site.register(Transaction)
admin.site.register(Event)
admin.site.register(Promotion)


# Register your models here.
