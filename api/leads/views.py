from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated as IsAuth
from rest_framework.response import Response

from api.permissions import IsAdminOrReadOnly, IsAdmin
from .models import Deal, DealType, State, Question, Testimonial
from .serializers import (
    TestimonialSerializer,
    DealSerializer,
    DealTypeSerializer,
    StateSerializer,
    QuestionSerializer,
)

from accounts.models import Member

from messaging.sendgrid_email import send_buyer_lead_email, send_seller_lead_email



class DealView(viewsets.ModelViewSet):
    queryset = Deal.objects.all().order_by('id')
    serializer_class = DealSerializer
    permission_classes = [IsAuth, IsAdmin]

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        data = serializer.validated_data

        buyer = data['buyer']
        send_buyer_lead_email(buyer)

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class DealTypeView(viewsets.ModelViewSet):
    queryset = DealType.objects.all().order_by('id')
    serializer_class = DealTypeSerializer
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = None


class StateView(viewsets.ModelViewSet):
    queryset = State.objects.all().order_by('id')
    serializer_class = StateSerializer
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = None


class QuestionView(viewsets.ModelViewSet):
    queryset = Question.objects.all().order_by('id')
    serializer_class = QuestionSerializer
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = None


class TestimonialView(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all().order_by('id')
    serializer_class = TestimonialSerializer
    permission_classes = [IsAdminOrReadOnly]
    pagination_class = None

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        self.perform_create(serializer)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

