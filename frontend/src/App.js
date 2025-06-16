import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Quitamos Navigate que ya no es necesario aquí
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';          // <-- 1. IMPORTA el nuevo componente Home
import Sismos from './Sismos';
import Incendios from './Incendios';

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
                  {/* Nuevo enlace a Home, puedes agregarlo o dejar que el logo sea el único enlace a Home */}
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Inicio</Link>
                  </li>
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
            <Route path="/" element={<Home />} /> {/* <-- 2. CAMBIA la ruta raíz */}
            <Route path="/sismos" element={<Sismos />} />
            <Route path="/incendios" element={<Incendios />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;