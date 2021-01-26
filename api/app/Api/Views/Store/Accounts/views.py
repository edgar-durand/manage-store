from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from Api.Permission import IsOwnerOrDeny
from Api.Views.Store.Accounts.Serializers import AccountsSerializers
from Api.models import accounts


class AccountsViewSet(viewsets.ModelViewSet):
    queryset = accounts.objects.all()
    serializer_class = AccountsSerializers
    permission_classes = (IsAuthenticated, IsOwnerOrDeny)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        queryset = accounts.objects.filter(user=self.request.user)
        return queryset
