from rest_framework import serializers, status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response

from Api.models import Usuarios, private_store, product, category
from core.models import excercises


class UsuariosSerializers(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = '__all__'


class ProfileSerializers(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = ('id','username','email')


class StoreSerializers(serializers.ModelSerializer):
    class Meta:
        model = private_store
        fields = ('store_name', 'image', 'description', 'user')


class ProductSerializers(serializers.ModelSerializer):
    class Meta:
        model = product
        fields = '__all__'


class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = category
        fields = '__all__'


class CreateUserSerializers(serializers.Serializer):
    id = serializers.ReadOnlyField()
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField()

    def create(self, validated_data):
        user = Usuarios()
        user.username = validated_data.get('username')
        user.email = validated_data.get('email')
        user.set_password(validated_data.get('password'))
        user.save()
        return user

    def validate_username(self, data):

        users = Usuarios.objects.filter(username=data)
        print(users)
        if len(users) != 0:
            raise serializers.ValidationError("Usuario existente en la base de Datos")
        else:
            return data

    # Solo el nombre de la funcion recibe en data el parametro del nomre de la funcion
    def validate_email(self, data):
        email = Usuarios.objects.filter(email=data)

        if len(email) != 0:
            raise serializers.ValidationError("Email existente en la base de datos")
        else:
            return data


class ExcercisesSerializers(serializers.ModelSerializer):
    colores = serializers.SerializerMethodField('get_colores')

    class Meta:
        model = excercises
        fields = ('id', 'title', 'colores')

    def get_colores(self, obj):
        colores = [{
            'left': obj.leftColor,
            'right': obj.rightColor
        }]
        return colores
