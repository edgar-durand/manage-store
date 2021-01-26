from rest_framework import serializers

from Api.models import category


class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = category
        fields = '__all__'


