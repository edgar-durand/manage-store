from rest_framework import serializers

from Api.models import  purchases


class PurchasesSerializers(serializers.ModelSerializer):
    class Meta:
        model = purchases
        fields = '__all__'



