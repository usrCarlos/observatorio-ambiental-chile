import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate'; // NUEVO: Importamos el componente de paginación
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [sismos, setSismos] = useState([]);
  const [incendios, setIncendios] = useState([]);

  // --- NUEVO: Estados para la paginación de incendios ---
  const [incendioOffset, setIncendioOffset] = useState(0); // Desde qué item empezar a mostrar
  const itemsPerPage = 10; // Cuántos items mostrar por página
  // --- FIN DE NUEVOS ESTADOS ---

  useEffect(() => {
    // ... (La lógica para buscar datos no cambia)
    const fetchData = () => {
      console.log("Buscando nuevos datos...");
      const fetchSismos = fetch('http://127.0.0.1:8000/api/sismos/').then(res => res.json());
      const fetchIncendios = fetch('http://127.0.0.1:8000/api/incendios/').then(res => res.json());
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

  // --- NUEVO: Lógica para calcular qué incendios mostrar en la página actual ---
  const endOffset = incendioOffset + itemsPerPage;
  const currentIncendios = incendios.slice(incendioOffset, endOffset);
  const pageCount = Math.ceil(incendios.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % incendios.length;
    setIncendioOffset(newOffset);
  };
  // --- FIN DE LÓGICA DE PAGINACIÓN ---


  return (
    <div className="container py-4">
      {/* ... (La cabecera y la sección de sismos no cambian) ... */}
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


      {/* Sección de Incendios Forestales MODIFICADA */}
      <div className="p-5 mb-4 bg-light rounded-3">
        <h2>Incendios Forestales Reportados 2024</h2>
        {currentIncendios.length > 0 ? ( // MODIFICADO: usamos 'currentIncendios'
          <div>
            {currentIncendios.map(incendio => ( // MODIFICADO: usamos 'currentIncendios'
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

        {/* --- NUEVO: Componente de paginación --- */}
        <ReactPaginate
          breakLabel="..."
          nextLabel="Siguiente >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< Anterior"
          renderOnZeroPageCount={null}
          // Clases de Bootstrap para darle estilo
          containerClassName="pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="active"
        />
        {/* --- FIN DE COMPONENTE DE PAGINACIÓN --- */}
      </div>
    </div>
  );
}

export default App;