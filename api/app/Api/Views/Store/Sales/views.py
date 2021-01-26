from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from Api.Permission import IsOwnerOrDeny
from Api.Views.Store.Sales.Serializers import SalesSerializers
from Api.models import sales


class SalesViewSet(viewsets.ModelViewSet):
    queryset = sales.objects.all()
    serializer_class = SalesSerializers
    permission_classes = (IsAuthenticated, IsOwnerOrDeny)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        queryset = sales.objects.filter(user=self.request.user)
        return queryset
