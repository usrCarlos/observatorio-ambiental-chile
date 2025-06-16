import React from 'react';
import { Link } from 'react-router-dom'; // Importamos Link para la navegación

function Home() {
  return (
    <main>
      {/* Sección de Bienvenida (Hero) */}
      <header className="p-5 mb-4 bg-light rounded-3 text-center">
        <div className="container-fluid py-5">
          <h1 className="display-4 fw-bold">Observatorio Ambiental de Chile</h1>
          <p className="fs-4">
            Tu fuente de información centralizada y actualizada sobre sismos e incendios forestales a lo largo del país.
          </p>
        </div>
      </header>

      {/* Sección de Introducción */}
      <section className="mb-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h2>¿Qué es el Observatorio?</h2>
            <p className="lead">
              Este proyecto nace de la necesidad de tener un acceso rápido y unificado a datos ambientales críticos para Chile. Usamos tecnología para recolectar, procesar y presentar información relevante de fuentes oficiales en tiempo real.
            </p>
          </div>
        </div>
      </section>

      {/* Sección de Tarjetas de Navegación */}
      <section>
        <div className="row">
          {/* Tarjeta para Sismos */}
          <div className="col-md-6 mb-4">
            <article className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h3 className="card-title">Sismos Recientes 🌎</h3>
                <p className="card-text flex-grow-1">
                  Visualiza los últimos sismos registrados por el Centro Sismológico Nacional de la Universidad de Chile. Datos actualizados cada minuto con magnitud, ubicación y fecha.
                </p>
                <Link to="/sismos" className="btn btn-primary mt-auto align-self-start">
                  Ver Sismos
                </Link>
              </div>
            </article>
          </div>

          {/* Tarjeta para Incendios */}
          <div className="col-md-6 mb-4">
            <article className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h3 className="card-title">Incendios Forestales 🔥</h3>
                <p className="card-text flex-grow-1">
                  Consulta el listado de incendios forestales activos y controlados reportados por CONAF. Incluye información sobre la región, comuna, estado y superficie afectada.
                </p>
                <Link to="/incendios" className="btn btn-danger mt-auto align-self-start">
                  Ver Incendios
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Sección de Fuentes de Datos */}
      <footer className="pt-3 mt-4 text-muted border-top">
        <h4>Fuentes de Datos</h4>
        <ul>
          <li>Sismos: Centro Sismológico (USGS ) .</li>
          <li>Incendios Forestales: Corporación Nacional Forestal (CONAF).</li>
        </ul>
      </footer>
    </main>
  );
}

export default Home;