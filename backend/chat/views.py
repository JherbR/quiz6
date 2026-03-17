import os
from google import genai
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.conf import settings
from subscriptions.models import UserSubscription

class AIChatbotView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        user = request.user
        user_query = request.data.get('query')

        if not user_query:
            return Response({"detail": "Query is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check for API key
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            return Response({"detail": "AI service not configured."}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
        
        try:
            sub = UserSubscription.objects.get(user=user, is_active=True)
        except UserSubscription.DoesNotExist:
            return Response({"detail": "Active subscription required."}, status=status.HTTP_403_FORBIDDEN)

        if sub.usage_left <= 0:
            return Response({"detail": "AI usage limit reached."}, status=status.HTTP_403_FORBIDDEN)

        try:
            client = genai.Client(api_key=api_key)
            response = client.models.generate_content(
                model="gemini-3.1-flash-lite-preview",
                contents=f"You are a roofing consultant. Answer only technical roofing/gutter questions. If the user asks any question outside of this scope, politely decline to answer. Query: {user_query}"
            )

            sub.usage_left -= 1
            sub.save()

            return Response({
                "response": response.text,
                "usage_left": sub.usage_left
            })
        except Exception as e:
            return Response({"detail": "AI Service unavailable."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)