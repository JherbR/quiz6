from django.urls import path
from .views import CreateOrderView, UpdateOrderView, UserOrderHistoryView

urlpatterns = [
    path('create/', CreateOrderView.as_view()),
    path('update/<int:pk>/', UpdateOrderView.as_view()),
    path('history/', UserOrderHistoryView.as_view()),
]