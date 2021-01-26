from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from Api.Permission import IsOwnerOrDeny
from Api.Views.Store.Serializers import ExcercisesSerializers, UsuariosSerializers, CreateUserSerializers, \
    StoreSerializers, ProductSerializers, CategorySerializers, ProfileSerializers
from Api.models import Usuarios, private_store, product, category

from core.models import excercises


class ExcercisesViewSet(viewsets.ModelViewSet):
    queryset = excercises.objects.all()
    serializer_class = ExcercisesSerializers


class StoreViewSet(viewsets.ModelViewSet):
    queryset = private_store.objects.all()
    serializer_class = StoreSerializers
    permission_classes = (IsAuthenticated, IsOwnerOrDeny)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        queryset = private_store.objects.filter(user=self.request.user)
        return queryset


class ProductViewSet(viewsets.ModelViewSet):
    queryset = product.objects.all()
    serializer_class = ProductSerializers

    permission_classes = (IsAuthenticated, IsOwnerOrDeny)

    # def perform_create(self, serializer):
    #     serializer.save(store=self.request.user)
    #


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = category.objects.all()
    serializer_class = CategorySerializers

    # permission_classes = (IsAuthenticated,)

    # def perform_create(self, serializer):
    #     serializer.save(user=self.request.user)
    #
    # def get_queryset(self):
    #     queryset = private_store.objects.filter(user=self.request.user)
    #     return queryset


class UsuariosViewSet(viewsets.ModelViewSet):
    queryset = Usuarios.objects.all()
    serializer_class = UsuariosSerializers


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Usuarios.objects.all()
    serializer_class = ProfileSerializers
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        queryset = Usuarios.objects.filter(auth_token=self.request.user.auth_token)
        return queryset


class AddUser(APIView):
    def post(self, request):

        serializer = CreateUserSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
