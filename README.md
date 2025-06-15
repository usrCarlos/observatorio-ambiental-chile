# 🌎 Observatorio Ambiental de Chile

**Aplicación web full-stack que visualiza datos en tiempo real sobre sismos e incendios forestales en Chile.**

Este proyecto fue construido desde cero como una plataforma completa, utilizando Django para el backend, React para el frontend, y desplegado en servicios en la nube como Render y Vercel.

**[Ver la aplicación en vivo »](https://observatorio-ambiental-chile.vercel.app/)**

---


### 🚀 Stack Tecnológico

Este proyecto utiliza una arquitectura de servicios desacoplados, una práctica estándar en la industria para lograr escalabilidad y mantenibilidad.

| Área | Tecnología | Descripción |
| :--- | :--- | :--- |
| 💻 **Frontend** | **React.js** | Para construir una interfaz de usuario interactiva y dinámica. |
| | **Bootstrap** | Utilizado para un diseño limpio, profesional y responsivo. |
| | **React Paginate**| Para manejar eficientemente la visualización de grandes listas de datos. |
| | **Vercel** | Plataforma de despliegue continuo para el frontend. |
| ⚙️ **Backend** | **Django** | Framework robusto de Python para el desarrollo del servidor. |
| | **Django REST**| Para la creación de una API RESTful eficiente y bien estructurada. |
| | **PostgreSQL**| Base de datos relacional para el entorno de producción. |
| | **Render** | Plataforma de despliegue para el servicio backend y la base de datos. |
| | **Gunicorn** | Servidor WSGI de estándar industrial para producción. |
| 🛠️ **DevOps** | **Git & GitHub**| Para el control de versiones y la gestión del código fuente. |

---

### 📋 Características Principales

* **Dashboard Unificado:** Centraliza la información de sismos e incendios en una sola vista.
* **Consumo de APIs Externas:**
    * **Sismos:** Integra datos del USGS (Servicio Geológico de EE. UU.).
    * **Incendios:** Procesa y filtra datos desde una fuente CSV publicada por CONAF.
* **Actualización Automática:** El frontend busca nuevos datos cada 60 segundos sin necesidad de recargar la página (polling).
* **Paginación:** Maneja de forma eficiente la visualización de cientos de registros de incendios para una experiencia de usuario fluida.
* **Despliegue Profesional:** Arquitectura completamente desplegada en servicios en la nube, con el backend y frontend funcionando de manera independiente pero conectada.
* **Carga de Datos Automatizada:** Utiliza migraciones de datos de Django para poblar la base de datos de producción durante el despliegue inicial.

---

### ⚙️ Instalación Local

Para ejecutar este proyecto en tu máquina local, sigue estos pasos:

**1. Clona el Repositorio**
```bash
git clone [https://github.com/usrCarlos/observatorio-ambiental-chile.git](https://github.com/usrCarlos/observatorio-ambiental-chile.git)
cd observatorio-ambiental-chile

2. Configura y Ejecuta el Backend (Django)
# Navega a la carpeta del backend
cd observatorio_ambiental

# Crea y activa un entorno virtual
python -m venv venv
.\venv\Scripts\activate  # En Windows

# Instala las dependencias
pip install -r ../requirements.txt

# Aplica las migraciones y carga los datos iniciales
python manage.py migrate

# Inicia el servidor
python manage.py runserver

3. Configura y Ejecuta el Frontend (React)
# Desde la carpeta raíz (observatorio-ambiental-chile), navega al frontend
cd frontend

# Instala las dependencias
npm install

# Inicia la aplicación
npm start

📫 Contacto
¡Gracias por visitar mi proyecto! Estoy activamente buscando oportunidades para unirme a equipos innovadores.
