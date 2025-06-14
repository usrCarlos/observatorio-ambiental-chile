import requests
import csv
from datetime import datetime
from .models import Incendio

CONAF_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSdK1gQSl5avi_ITvHxeS7DWlkjIkK7v4e5lWn1qJJjPFY6DnxRJcyUjLEJ0UhDRWpZiWfLj4J6cX22/pub?output=csv"

def obtener_y_guardar_incendios():
    print("Iniciando la obtención y filtrado de datos de incendios (Valparaíso, 2024)...")
    incendios_procesados = 0
    try:
        response = requests.get(CONAF_CSV_URL, timeout=15)
        response.raise_for_status()
        response.encoding = 'utf-8'
        csv_reader = csv.DictReader(response.text.splitlines())

        for row in csv_reader:
            region = row.get('region', '').strip().lower()
            fecha_str = row.get('fmt_inicio', '')
            source_id_str = row.get('id', '')

            # Verificar que tenemos los datos mínimos para procesar (ID y fecha)
            if not source_id_str or not fecha_str:
                continue

            # Filtro por fecha y región
            try:
                fecha_obj = datetime.strptime(fecha_str, '%Y-%m-%d %H:%M:%S')
                if fecha_obj.year == 2024 and region == 'valparaíso':
                    # Si cumple ambas condiciones, procesamos la fila
                    pass
                else:
                    # Si no, la ignoramos y pasamos a la siguiente
                    continue
            except (ValueError, TypeError):
                continue # Ignorar filas con formato de fecha incorrecto

            # Convertir datos numéricos con manejo de errores
            try:
                source_id = int(source_id_str)
                superficie = float(row.get('sup_total', '0').replace(',', '.'))
                lat = float(row.get('lat', '0').replace(',', '.'))
                lon = float(row.get('lon', '0').replace(',', '.'))
            except (ValueError, TypeError):
                continue # Si los números no son válidos, ignorar la fila

            Incendio.objects.update_or_create(
                source_id=source_id,
                defaults={
                    'nombre': row.get('nombre', 'Sin Nombre'),
                    'estado': row.get('estado', 'Sin Estado'),
                    'comuna': row.get('comuna', ''),
                    'provincia': row.get('provincia', ''),
                    'region': row.get('region', ''),
                    'fecha_inicio': fecha_obj,
                    'superficie_total': superficie,
                    'latitud': lat,
                    'longitud': lon
                }
            )
            incendios_procesados += 1

        print(f"Proceso finalizado. Se guardaron/actualizaron {incendios_procesados} incendios para Valparaíso en 2024.")
        return True
    except Exception as e:
        print(f"Ocurrió un error inesperado al procesar los datos: {e}")
        return False