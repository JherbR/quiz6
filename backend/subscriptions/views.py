from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import SubscriptionTier, UserSubscription
from .serializers import SubscriptionTierSerializer, UserSubscriptionSerializer

class SubscriptionTierListView(generics.ListAPIView):
    queryset = SubscriptionTier.objects.all()
    serializer_class = SubscriptionTierSerializer
    permission_classes = [permissions.AllowAny]

class AdminSubscriptionListView(generics.ListAPIView):
    queryset = UserSubscription.objects.all()
    serializer_class = UserSubscriptionSerializer
    permission_classes = [permissions.IsAdminUser]

class MySubscriptionDetailView(generics.RetrieveAPIView):
    serializer_class = UserSubscriptionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        sub, _ = UserSubscription.objects.get_or_create(user=self.request.user)
        return sub

class SubscribeToTierView(generics.GenericAPIView):
    serializer_class = UserSubscriptionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        tier_id = request.data.get('tier_id')
        try:
           
            tier = SubscriptionTier.objects.get(id=tier_id)
         
            sub, created = UserSubscription.objects.get_or_create(user=request.user)

            sub.tier = tier
            sub.usage_left = tier.max_usage
            sub.is_active = True
            sub.save()

            return Response({
                "detail": f"Subscribed to {tier.name}. {tier.max_usage} queries added.",
                "subscription": UserSubscriptionSerializer(sub).data,
            }, status=status.HTTP_200_OK)

        except SubscriptionTier.DoesNotExist:
            return Response({"detail": "Invalid Tier ID"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)