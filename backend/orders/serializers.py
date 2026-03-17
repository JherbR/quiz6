from rest_framework import serializers
from .models import Order

class OrderSerializer(serializers.ModelSerializer):
    buyer_email = serializers.ReadOnlyField(source='buyer.email')
    service_name = serializers.ReadOnlyField(source='service.service_name')

    class Meta:
        model = Order
        fields = ['id', 'buyer', 'buyer_email', 'service', 'service_name', 'paypal_transaction_id', 'price_paid', 'date_purchased']
        read_only_fields = ['buyer']