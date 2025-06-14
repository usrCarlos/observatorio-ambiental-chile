from rest_framework import generics
from .models import Incendio
from .serializers import IncendioSerializer

class ListaIncendiosView(generics.ListAPIView):
    """
    Esta vista provee una lista de todos los incendios almacenados en la base de datos.
    """
    queryset = Incendio.objects.all()
    serializer_class = IncendioSerializer