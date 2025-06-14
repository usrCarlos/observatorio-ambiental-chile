from rest_framework import generics
from .models import Sismo
from .serializers import SismoSerializer

class ListaSismosView(generics.ListAPIView):
    """
    Esta vista provee una lista de todos los sismos almacenados en la base de datos,
    ordenados por fecha y hora (el más reciente primero).
    """
    queryset = Sismo.objects.all()
    serializer_class = SismoSerializer
