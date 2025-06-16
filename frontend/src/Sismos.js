import React, { useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_API_URL;

function Sismos() {
    const [sismos, setSismos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSismos = () => {
            console.log("Buscando datos de sismos desde:", API_URL);
            fetch(`${API_URL}/api/sismos/`)
                .then(res => res.json())
                .then(data => {
                    setSismos(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Hubo un error al obtener los sismos:", error);
                    setLoading(false);
                });
        };

        fetchSismos();
        const intervalId = setInterval(fetchSismos, 60000); // Actualiza cada 1 minuto
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="p-5 mb-4 bg-light rounded-3">
            <h2>Últimos Sismos Registrados </h2>
            {loading ? (
                <div className="alert alert-info">Cargando sismos...</div>
            ) : sismos.length > 0 ? (
                sismos.map(sismo => (
                    <div className="card mb-2" key={sismo.id_evento}>
                        <div className="card-body">
                            <strong>{sismo.magnitud} Mww</strong> - {sismo.lugar}
                            <small className="d-block text-muted">{new Date(sismo.fecha_hora).toLocaleString()}</small>
                        </div>
                    </div>
                ))
            ) : (
                <div className="alert alert-warning">No hay sismos para mostrar en este momento.</div>
            )}
        </div>
    );
}

export default Sismos;