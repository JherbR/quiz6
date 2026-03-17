from django.db import models
from django.conf import settings

class SubscriptionTier(models.Model):
    name = models.CharField(max_length=50) # Tier 1, 2, 3
    price = models.DecimalField(max_digits=10, decimal_places=4)
    max_usage = models.IntegerField() # 3, 5, or 10

    def __str__(self):
        return self.name

class UserSubscription(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    tier = models.ForeignKey(SubscriptionTier, on_delete=models.SET_NULL, null=True)
    usage_left = models.IntegerField(default=0)
    is_active = models.BooleanField(default=False)
    subscribed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.tier.name if self.tier else 'No Tier'}"