from django.db import models
from django.conf import settings
from services.models import Service

class Order(models.Model):
    buyer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.SET_NULL, null=True)
    paypal_transaction_id = models.CharField(max_length=255)
    price_paid = models.DecimalField(max_digits=12, decimal_places=4)
    date_purchased = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.paypal_transaction_id} by {self.buyer.email}"