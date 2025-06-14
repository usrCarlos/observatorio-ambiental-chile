from django.core.management.base import BaseCommand
from incendios.services import obtener_y_guardar_incendios

class Command(BaseCommand):
    help = 'Obtiene los últimos datos de incendios desde la fuente de CONAF y los guarda en la base de datos.'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS('Iniciando el comando para obtener datos de incendios...'))
        success = obtener_y_guardar_incendios()
        if success:
            self.stdout.write(self.style.SUCCESS('Comando de incendios finalizado con éxito.'))
        else:
            self.stdout.write(self.style.ERROR('El comando de incendios falló.'))