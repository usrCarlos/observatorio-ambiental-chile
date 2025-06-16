import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import graficoIncendios from './grafico_incendios_valparaiso_2024.png';

const API_URL = process.env.REACT_APP_API_URL;

function Incendios() {
    const [incendios, setIncendios] = useState([]);
    const [loading, setLoading] = useState(true);

    // Paginación
    const [offset, setOffset] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchIncendios = () => {
            console.log("Buscando datos de incendios desde:", API_URL);
            fetch(`${API_URL}/api/incendios/`)
                .then(res => res.json())
                .then(data => {
                    setIncendios(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Hubo un error al obtener los incendios:", error);
                    setLoading(false);
                });
        };
        fetchIncendios();
    }, []);

    // Lógica de paginación
    const currentIncendios = incendios.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(incendios.length / itemsPerPage);
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % incendios.length;
        setOffset(newOffset);
    };

    return (
        <div className="p-5 mb-4 bg-light rounded-3">
            <h2>Incendios Forestales Reportados 🔥</h2>
            {loading ? (
                <div className="alert alert-info">Cargando incendios...</div>
            ) : currentIncendios.length > 0 ? (
                <>
                    {/* Gráfico */}
                    <div className="text-center my-4 p-3 bg-white rounded shadow-sm">
                        <h4 className="mb-3">Análisis de Incidentes por Comuna</h4>
                        <img 
                            src={graficoIncendios} 
                            alt="Gráfico de incendios por comuna en Valparaíso" 
                            className="img-fluid rounded" 
                        />
                        <small className="d-block text-muted mt-2">Gráfico generado con Python a partir de los datos.</small>
                    </div>

                    {/* Lista de Incendios */}
                    {currentIncendios.map(incendio => (
                        <div className="card mb-2" key={incendio.source_id}>
                            <div className="card-body">
                                <h5 className="card-title">{incendio.nombre} ({incendio.comuna})</h5>
                                <p className="mb-1"><strong>Estado:</strong> {incendio.estado}</p>
                                <p className="mb-1"><strong>Superficie:</strong> {incendio.superficie_total.toLocaleString('es-CL')} ha.</p>
                                <small className="text-muted"><strong>Inicio:</strong> {new Date(incendio.fecha_inicio).toLocaleString('es-CL')}</small>
                            </div>
                        </div>
                    ))}
                    
                    {/* Paginador */}
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="Siguiente >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={pageCount}
                        previousLabel="< Anterior"
                        renderOnZeroPageCount={null}
                        containerClassName="pagination justify-content-center mt-4"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        activeClassName="active"
                    />
                </>
            ) : (
                <div className="alert alert-warning">No hay incendios para mostrar en este momento.</div>
            )}
        </div>
    );
}

export default Incendios;