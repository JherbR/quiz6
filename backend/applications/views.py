from rest_framework import serializers, generics, permissions, status
from rest_framework.response import Response
from .models import SellerApplication
from .serializers import SellerApplicationSerializer

class SubmitApplicationView(generics.CreateAPIView):
    serializer_class = SellerApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        # Check if user already has a pending application
        if SellerApplication.objects.filter(user=self.request.user, status='Pending').exists():
            raise serializers.ValidationError("You already have a pending application.")
        serializer.save(user=self.request.user)

class ListApplicationView(generics.ListAPIView):
    queryset = SellerApplication.objects.all()
    serializer_class = SellerApplicationSerializer
    permission_classes = [permissions.IsAdminUser]

class ApproveApplicationView(generics.UpdateAPIView):
    queryset = SellerApplication.objects.all()
    permission_classes = [permissions.IsAdminUser]

    def update(self, request, *args, **kwargs):
        application = self.get_object()
        merchant_id = request.data.get('merchant_id')
        
        if not merchant_id:
            return Response({"detail": "Merchant ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Update User
        user = application.user
        user.role = 'Seller'
        user.merchant_id = merchant_id
        user.save()
        
        # Update Application
        application.status = 'Approved'
        application.save()
        
        return Response({"detail": f"User {user.email} is now a Seller."})

class MyApplicationsView(generics.ListAPIView):
    serializer_class = SellerApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SellerApplication.objects.filter(user=self.request.user)

class DeclineApplicationView(generics.UpdateAPIView):
    queryset = SellerApplication.objects.all()
    permission_classes = [permissions.IsAdminUser]

    def update(self, request, *args, **kwargs):
        application = self.get_object()
        reason = request.data.get('decline_reason')
        
        application.status = 'Declined'
        application.decline_reason = reason
        application.save()
        
        return Response({"detail": "Application declined."})