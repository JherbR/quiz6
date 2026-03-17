from django.urls import path
from .views import (
    SubscriptionTierListView,
    AdminSubscriptionListView,
    SubscribeToTierView,
    MySubscriptionDetailView,
)

urlpatterns = [
    path('tiers/', SubscriptionTierListView.as_view()),
    path('subscribe/', SubscribeToTierView.as_view()),
    path('me/', MySubscriptionDetailView.as_view()),
    path('admin/list/', AdminSubscriptionListView.as_view()),
]