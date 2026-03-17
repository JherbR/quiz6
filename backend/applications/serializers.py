from rest_framework import serializers
from .models import SellerApplication
from users.serializers import UserSerializer

class SellerApplicationSerializer(serializers.ModelSerializer):
    user_email = serializers.CharField(source='user.email', read_only=True)

    class Meta:
        model = SellerApplication
        fields = ['id', 'user_email', 'business_license', 'status', 'decline_reason', 'created_at']
        read_only_fields = ['user', 'status']
        extra_kwargs = {
            'business_license': {'required': False},
        }