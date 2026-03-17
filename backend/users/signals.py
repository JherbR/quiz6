from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from subscriptions.models import UserSubscription

User = get_user_model()

@receiver(post_save, sender=User)
def create_user_subscription(sender, instance, created, **kwargs):
    if created:
        UserSubscription.objects.create(
            user=instance,
            usage_left=0,
            is_active=False
        )

@receiver(post_save, sender=User)
def save_user_subscription(sender, instance, **kwargs):
    if hasattr(instance, 'usersubscription'):
        instance.usersubscription.save()