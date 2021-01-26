from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from Api.Permission import IsOwnerOrDeny
from Api.Views.Store.Users.Serializers import UsuariosSerializers, ProfileSerializers
from Api.models import Usuarios


class UsuariosViewSet(viewsets.ModelViewSet):
    queryset = Usuarios.objects.all()
    serializer_class = UsuariosSerializers

    # permission_classes = (IsAuthenticated,)

    # def get_queryset(self):
    #     if self.request.user.is_superuser:
    #         return Usuarios.objects.all()
    #     else:
    #         return Usuarios.objects.filter(auth_token=self.request.user.auth_token)

    def create(self, request, *args, **kwargs):
        # if request.user.is_superuser:
        serializer = UsuariosSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # return Response([{'error': 'Access Denied!'}], status=status.HTTP_400_BAD_REQUEST)


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Usuarios.objects.all()
    serializer_class = ProfileSerializers
    permission_classes = (IsAuthenticated, IsOwnerOrDeny)

    def get_queryset(self):
        queryset = Usuarios.objects.filter(auth_token=self.request.user.auth_token)
        return queryset


class Logout(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        request.user.auth_token.delete()
        return Response([{'result': 'Closed!'}], status=status.HTTP_200_OK)
