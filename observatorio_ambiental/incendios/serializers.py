from rest_framework import serializers
from .models import Incendio

class IncendioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Incendio
        # Incluimos todos los campos de nuestro modelo Incendio
        fields = '__all__'