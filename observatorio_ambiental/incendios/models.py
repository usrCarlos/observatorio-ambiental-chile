from django.db import models

class Incendio(models.Model):
    # Usamos el 'id' del CSV como un identificador único de la fuente
    source_id = models.IntegerField(unique=True)
    nombre = models.CharField(max_length=255)
    estado = models.CharField(max_length=100)
    comuna = models.CharField(max_length=100)
    provincia = models.CharField(max_length=100)
    region = models.CharField(max_length=100)
    # Guardaremos la fecha de inicio que viene en 'fmt_inicio'
    fecha_inicio = models.DateTimeField(null=True, blank=True)
    superficie_total = models.FloatField(default=0.0, help_text="Superficie total afectada en hectáreas")
    latitud = models.FloatField(null=True, blank=True)
    longitud = models.FloatField(null=True, blank=True)

    def __str__(self):
        return self.nombre

    class Meta:
        ordering = ['-fecha_inicio']
        verbose_name = "Incendio Forestal"
        verbose_name_plural = "Incendios Forestales"