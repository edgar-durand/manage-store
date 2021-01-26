from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from Api.Views.Store.Category.Serializers import CategorySerializers
from Api.models import category


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = category.objects.all()
    serializer_class = CategorySerializers
    permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        category = CategorySerializers(data=request.data)

        if request.user.is_superuser:
            if category.is_valid():
                category.save()
                return Response(category.data, status=status.HTTP_201_CREATED)
            else:
                return Response(category.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response([{'error': 'Access Denied!'}], status=status.HTTP_400_BAD_REQUEST)
