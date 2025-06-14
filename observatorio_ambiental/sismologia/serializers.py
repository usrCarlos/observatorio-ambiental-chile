from rest_framework import serializers
from .models import Sismo

class SismoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sismo
        # '__all__' significa que incluiremos todos los campos del modelo
        fields = '__all__'