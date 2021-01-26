from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from Api.Permission import IsOwnerOrDeny
from Api.Views.Store.Products.Serializers import ProductSerializers, ProductCreateSerializers

from Api.models import product


class ProductViewSet(viewsets.ModelViewSet):
    queryset = product.objects.all()
    serializer_class = ProductSerializers
    permission_classes = (IsAuthenticated, IsOwnerOrDeny)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        queryset = product.objects.filter(user=self.request.user)
        return queryset

    def create(self, request, *args, **kwargs):

            serializer = ProductCreateSerializers(data=request.data)
            if serializer.is_valid():
                self.perform_create(serializer)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
