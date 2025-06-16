import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sismos from './Sismos';      // Importa el nuevo componente
import Incendios from './Incendios';  // Importa el nuevo componente

function App() {
  return (
    <Router>
      <div className="container py-4">
        {/* Encabezado y Menú de Navegación */}
        <header className="pb-3 mb-4 border-bottom">
          <nav className="navbar navbar-expand-lg navbar-light bg-light rounded">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">
                <strong>Observatorio Ambiental Chile</strong>
              </Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/sismos">Sismos</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/incendios">Incendios</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>

        {/* Contenido dinámico según la ruta */}
        <main>
          <Routes>
            <Route path="/sismos" element={<Sismos />} />
            <Route path="/incendios" element={<Incendios />} />
            {/* Redirige la ruta raíz a la página de sismos por defecto */}
            <Route path="/" element={<Navigate replace to="/sismos" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// Asegúrate de que tu `index.js` tenga Bootstrap JS si quieres que el menú hamburguesa funcione en móviles
// Si no lo tienes, el menú se verá bien en escritorio pero no se desplegará en pantallas pequeñas.
// Para habilitarlo, añade a tu `index.js`: import 'bootstrap/dist/js/bootstrap.bundle.min';

export default App;