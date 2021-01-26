from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from Api.Permission import IsOwnerOrDeny
from Api.Views.Store.Purchases.Serializers import PurchasesSerializers
from Api.models import purchases


class PurchasesViewSet(viewsets.ModelViewSet):
    queryset = purchases.objects.all()
    serializer_class = PurchasesSerializers
    permission_classes = (IsAuthenticated, IsOwnerOrDeny)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        queryset = purchases.objects.filter(user=self.request.user)
        return queryset
