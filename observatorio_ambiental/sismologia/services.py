import requests
# La única importación de tiempo que necesitamos es de la biblioteca estándar de Python
from datetime import datetime, timezone 
from .models import Sismo

# Cambiamos _day por _week para obtener los sismos de los últimos 7 días
USGS_API_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson"

def obtener_y_guardar_sismos():
    """
    Obtiene los últimos sismos desde la API del USGS y los guarda en la base de datos.
    Evita duplicados revisando el id_evento.
    """
    print("Iniciando la obtención de datos sísmicos desde USGS...")

    try:
        response = requests.get(USGS_API_URL, timeout=15)
        response.raise_for_status()
        data = response.json()
        sismos_procesados = 0

        for feature in data.get('features', []):
            id_evento = feature.get('id')
            if not id_evento or Sismo.objects.filter(id_evento=id_evento).exists():
                continue

            properties = feature.get('properties', {})
            if 'chile' not in (properties.get('place') or '').lower():
                continue

            geometry = feature.get('geometry', {})
            coords = geometry.get('coordinates', [None, None, None])

            if all([
                properties.get('mag') is not None,
                properties.get('place'),
                properties.get('time') is not None,
                coords[0] is not None,
                coords[1] is not None,
                coords[2] is not None
            ]):
                timestamp = properties['time'] / 1000
                # Aquí usamos timezone.utc que viene de la biblioteca datetime
                fecha_hora_utc = datetime.fromtimestamp(timestamp, tz=timezone.utc)

                Sismo.objects.create(
                    id_evento=id_evento,
                    magnitud=properties['mag'],
                    lugar=properties['place'],
                    fecha_hora=fecha_hora_utc,
                    longitud=coords[0],
                    latitud=coords[1],
                    profundidad=coords[2],
                )
                sismos_procesados += 1

        print(f"Proceso finalizado. Se guardaron {sismos_procesados} nuevos sismos.")
        return sismos_procesados

    except requests.exceptions.RequestException as e:
        print(f"Error al conectar con la API de USGS: {e}")
        return None
    except Exception as e:
        print(f"Ocurrió un error inesperado: {e}")
        return None