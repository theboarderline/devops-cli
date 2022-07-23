from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated as IsAuth
from rest_framework.response import Response

from api.permissions import (
    IsOwner,
)

from .models import (
    House,
    Picture,
)

from .serializers import (
    HouseSerializer,
    PictureSerializer,
)


class HouseView(viewsets.ModelViewSet):
    queryset = House.objects.all().order_by('id')
    serializer_class = HouseSerializer
    permission_classes = [IsAuth, IsOwner]

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        if 'state' in request.query_params:
            queryset = queryset.filter(state=request.query_params['state'])

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class PictureView(viewsets.ModelViewSet):
    queryset = Picture.objects.all().order_by('id')
    serializer_class = PictureSerializer
    permission_classes = [IsAuth, IsOwner]

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        if 'house' in request.query_params:
            queryset = queryset.filter(house=request.query_params['house'])

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
