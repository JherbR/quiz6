from rest_framework import serializers
from .models import Service

class ServiceSerializer(serializers.ModelSerializer):
    seller_email = serializers.ReadOnlyField(source='seller.email')
    seller_name = serializers.SerializerMethodField()
    seller_merchant_id = serializers.ReadOnlyField(source='seller.merchant_id')

    class Meta:
        model = Service
        fields = '__all__'
        read_only_fields = ['seller']

    def get_seller_name(self, obj):
        if obj.seller:
            return f"{obj.seller.first_name} {obj.seller.last_name}".strip()
        return None
