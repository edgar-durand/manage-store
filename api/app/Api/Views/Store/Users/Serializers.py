from rest_framework import serializers

from Api.Views.Store.Products.Serializers import ProductSerializers
from Api.models import Usuarios


class UsuariosSerializers(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    address = serializers.SerializerMethodField('Address')
    socialNet = serializers.SerializerMethodField('SocialNet')

    class Meta:
        model = Usuarios
        fields = ('id', 'first_name', 'last_name', 'birth_date', 'photo', 'email', 'is_superuser', 'username', 'phone',
                  'status_message', 'address', 'socialNet','password')

    def create(self, validated_data):
        user = Usuarios()
        user.first_name = validated_data.get('first_name')
        user.last_name = validated_data.get('last_name')
        user.birth_date = validated_data.get('birth_date')
        user.photo = validated_data.get('photo')
        user.email = validated_data.get('email')
        user.username = validated_data.get('username')
        user.is_superuser = validated_data.get('is_superuser')
        user.phone = validated_data.get('phone')
        user.status_message = validated_data.get('status_message')
        user.street = validated_data.get('street')
        user.number = validated_data.get('number')
        user.between = validated_data.get('between')
        user.municipality = validated_data.get('municipality')
        user.province = validated_data.get('province')
        user.facebook = validated_data.get('facebook')
        user.instagram = validated_data.get('instagram')
        user.twitter = validated_data.get('twitter')
        user.set_password(validated_data.get('password'))
        user.save()
        return user

    def validate_username(self, data):

        users = Usuarios.objects.filter(username=data)
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

    def Address(self, obj):
        address = [{
            'street': obj.street,
            'number': obj.number,
            'between': obj.between,
            'municipality': obj.municipality,
            'province': obj.province
        }]
        return address

    def SocialNet(self, obj):
        socialnet = [{
            'facebook': obj.facebook,
            'instagram': obj.instagram,
            'twitter': obj.twitter,
        }]
        return socialnet


class ProfileSerializers(serializers.ModelSerializer):
    prod_user = ProductSerializers(many=True)
    address = serializers.SerializerMethodField('Address')
    socialNet = serializers.SerializerMethodField('SocialNet')

    class Meta:
        model = Usuarios
        fields = ('id', 'first_name', 'last_name', 'birth_date', 'photo', 'email', 'is_superuser', 'username', 'phone',
                  'status_message', 'address', 'socialNet', 'prod_user')

    def Address(self, obj):
        address = [{
            'street': obj.street,
            'number': obj.number,
            'between': obj.between,
            'municipality': obj.municipality,
            'province': obj.province
        }]
        return address

    def SocialNet(self, obj):
        socialnet = [{
            'facebook': obj.facebook,
            'instagram': obj.instagram,
            'twitter': obj.twitter,
        }]
        return socialnet
