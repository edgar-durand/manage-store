from rest_framework import serializers
from Api.models import accounts, movements_account

class MovementSerializers(serializers.ModelSerializer):
    class Meta:
        model = movements_account
        fields = '__all__'


class AccountsSerializers(serializers.ModelSerializer):
    movement=MovementSerializers(many=True, read_only=True)
    class Meta:
        model = accounts
        fields = ('name','description','a_amount', 'movement')



