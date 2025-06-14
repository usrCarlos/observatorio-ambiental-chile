from django.db import models

# Create your models here.
class Sismo(models.Model):
    """
    Representa un evento sísmico obtenido desde la API del USGS.
    """
    id_evento = models.CharField(max_length=100, unique=True, help_text="ID único del evento proporcionado por USGS")
    magnitud = models.DecimalField(max_digits=4, decimal_places=2, help_text="Magnitud del sismo")
    lugar = models.CharField(max_length=255, help_text="Ubicación del sismo")
    fecha_hora = models.DateTimeField(help_text="Fecha y hora del sismo")
    latitud = models.FloatField(help_text="Latitud del epicentro")
    longitud = models.FloatField(help_text="Longitud del epicentro")
    profundidad = models.DecimalField(max_digits=10, decimal_places=3, help_text="Profundidad del sismo en km")

    def __str__(self):
        # Esta función define cómo se mostrará un objeto Sismo en el panel de admin.
        return f"Sismo de {self.magnitud} en {self.lugar} ({self.fecha_hora.strftime('%Y-%m-%d %H:%M')})"

    class Meta:
        # Ordenamos los sismos por fecha, del más reciente al más antiguo.
        ordering = ['-fecha_hora']
