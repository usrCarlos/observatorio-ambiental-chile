import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/css/bootstrap.min.css';

// La URL base de la API se lee de las variables de entorno.
// En local, usará el valor de .env.local. En Vercel, usará la variable que configures en el panel.
const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [sismos, setSismos] = useState([]);
  const [incendios, setIncendios] = useState([]);

  // Estados para la paginación de incendios
  const [incendioOffset, setIncendioOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = () => {
      console.log("Buscando nuevos datos desde:", API_URL); // Log para verificar la URL
      
      // --- LÍNEAS MODIFICADAS ---
      // Ahora construimos la URL completa usando la variable API_URL
      const fetchSismos = fetch(`${API_URL}/api/sismos/`).then(res => res.json());
      const fetchIncendios = fetch(`${API_URL}/api/incendios/`).then(res => res.json());
      // --- FIN DE LÍNEAS MODIFICADAS ---

      Promise.all([fetchSismos, fetchIncendios])
        .then(([sismosData, incendiosData]) => {
          setSismos(sismosData);
          setIncendios(incendiosData);
        })
        .catch(error => console.error("Hubo un error al obtener los datos:", error));
    };
    
    fetchData();
    const intervalId = setInterval(fetchData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  // Lógica para calcular qué incendios mostrar en la página actual
  const endOffset = incendioOffset + itemsPerPage;
  const currentIncendios = incendios.slice(incendioOffset, endOffset);
  const pageCount = Math.ceil(incendios.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % incendios.length;
    setIncendioOffset(newOffset);
  };

  return (
    <div className="container py-4">
      <header className="pb-3 mb-4 border-bottom">
        <h1 className="display-4">Observatorio Ambiental de Chile</h1>
      </header>
      
      <div className="p-5 mb-4 bg-light rounded-3">
        <h2>Últimos Sismos Registrados</h2>
        {sismos.length > 0 ? (
          <div>
            {sismos.map(sismo => (
              <div className="card mb-2" key={sismo.id_evento}>
                <div className="card-body">
                  <strong>{sismo.magnitud} Mww</strong> - {sismo.lugar}
                  <small className="d-block text-muted">{new Date(sismo.fecha_hora).toLocaleString()}</small>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="alert alert-info">No hay sismos para mostrar en este momento.</div>
        )}
      </div>

      <div className="p-5 mb-4 bg-light rounded-3">
        <h2>Incendios Forestales Reportados 2024</h2>
        {currentIncendios.length > 0 ? (
          <div>
            {currentIncendios.map(incendio => (
              <div className="card mb-2" key={incendio.source_id}>
                <div className="card-body">
                  <h5 className="card-title">{incendio.nombre} ({incendio.comuna})</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{incendio.region}</h6>
                  <p className="card-text mb-1"><strong>Estado:</strong> {incendio.estado}</p>
                  <p className="card-text mb-1"><strong>Superficie Afectada:</strong> {incendio.superficie_total.toLocaleString('es-CL')} ha.</p>
                  <p className="card-text"><strong>Fecha de Inicio:</strong> {new Date(incendio.fecha_inicio).toLocaleString('es-CL')}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="alert alert-info">No hay incendios para mostrar en este momento.</div>
        )}

        <ReactPaginate
          breakLabel="..."
          nextLabel="Siguiente >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< Anterior"
          renderOnZeroPageCount={null}
          containerClassName="pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="active"
        />
      </div>
    </div>
  );
}

export default App;