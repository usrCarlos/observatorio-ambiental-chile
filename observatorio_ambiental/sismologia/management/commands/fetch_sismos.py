from django.core.management.base import BaseCommand
from sismologia.services import obtener_y_guardar_sismos

class Command(BaseCommand):
    # Ayuda que aparecerá cuando ejecutes: python manage.py help fetch_sismos
    help = 'Obtienes los últimos datos de sismos desde la API de USGS y los guarda en la base de datos.'

    def handle(self, *args, **kwargs):
        # Escribe un mensaje en la consola para indicar que el comando inició.
        self.stdout.write(self.style.SUCCESS('Iniciando el comando para obtener sismos...'))

        # Llama a nuestra función de servicio.
        nuevos_sismos = obtener_y_guardar_sismos()

        if nuevos_sismos is not None:
            # Escribe un mensaje de éxito con la cantidad de nuevos sismos.
            self.stdout.write(self.style.SUCCESS(f'¡Comando finalizado con éxito! Se guardaron {nuevos_sismos} nuevos sismos.'))
        else:
            # Escribe un mensaje de error si el servicio falló.
            self.stdout.write(self.style.ERROR('El comando falló. Revisa los logs del servicio para más detalles.'))