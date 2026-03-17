from rest_framework import serializers
from .models import SubscriptionTier, UserSubscription

class SubscriptionTierSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionTier
        fields = '__all__'

class UserSubscriptionSerializer(serializers.ModelSerializer):
    user_email = serializers.ReadOnlyField(source='user.email')
    tier_name = serializers.ReadOnlyField(source='tier.name')

    class Meta:
        model = UserSubscription
        fields = ['id', 'user_email', 'tier_name', 'usage_left', 'is_active', 'subscribed_at']