from rest_framework import serializers
from Api.models import  sales

class SalesSerializers(serializers.ModelSerializer):
    class Meta:
        model = sales
        fields = '__all__'



