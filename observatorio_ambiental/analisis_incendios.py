# analisis_incendios.py

import os
import django
import pandas as pd
import matplotlib.pyplot as plt

# --- Configuración para conectar con Django ---
# Esto es crucial. Le dice al script cómo encontrar la configuración de tu proyecto.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'observatorio_core.settings')
django.setup()
# --- Fin de la Configuración ---

# Una vez configurado, ya podemos importar nuestros modelos de Django.
from incendios.models import Incendio

def generar_analisis_incendios():
    """
    Esta función lee los datos de incendios de la base de datos de Django,
    realiza un análisis estadístico con pandas y genera un gráfico.
    """
    print("Iniciando análisis de datos de incendios (Valparaíso 2024)...")

    # 1. Cargar los datos en un DataFrame de pandas
    # Hacemos una consulta a la base de datos para obtener todos los incendios.
    queryset = Incendio.objects.all()
    # Convertimos el resultado de la consulta a un formato que pandas entiende (DataFrame).
    df = pd.DataFrame(list(queryset.values()))

    # Verificamos si hay datos para analizar.
    if df.empty:
        print("La base de datos no contiene datos de incendios para analizar.")
        return

    print("\n--- ANÁLISIS ESTADÍSTICO ---")

    # 2. Resumen estadístico de la superficie afectada
    print("\nEstadísticas de la superficie afectada (en hectáreas):")
    # El método .describe() es una herramienta poderosa de pandas para obtener estadísticas rápidas.
    print(df['superficie_total'].describe())

    # 3. Contar incendios por comuna
    print("\nConteo de incendios por comuna:")
    conteo_comunas = df['comuna'].value_counts()
    print(conteo_comunas)

    # 4. Generar el Gráfico
    print("\nGenerando gráfico de incendios por comuna...")

    # Configuramos el tamaño del gráfico para que sea más grande y legible.
    plt.figure(figsize=(12, 8))

    # Creamos un gráfico de barras horizontales con las 15 comunas con más incendios.
    # El orden ascendente (ascending=True) hace que la comuna con más incendios quede arriba.
    conteo_comunas.head(15).sort_values(ascending=True).plot(kind='barh', color='orangered')

    # Añadimos títulos y etiquetas para que el gráfico se entienda bien.
    plt.title('Top 15 Comunas por Número de Incendios Registrados (Valparaíso 2024)', fontsize=16)
    plt.xlabel('Número de Incendios', fontsize=12)
    plt.ylabel('Comuna', fontsize=12)

    # Ajustamos el layout para asegurar que las etiquetas no se corten.
    plt.tight_layout()

    # Guardamos el gráfico como un archivo de imagen PNG en la misma carpeta.
    ruta_grafico = 'grafico_incendios_valparaiso_2024.png'
    plt.savefig(ruta_grafico)

    print(f"\n¡Análisis completado! Gráfico guardado exitosamente como: '{ruta_grafico}'")

# --- Punto de entrada para ejecutar nuestro script ---
if __name__ == '__main__':
    generar_analisis_incendios()