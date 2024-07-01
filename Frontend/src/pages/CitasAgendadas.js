import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Estilos/CitasAgendadas.css";

const CitasAgendadas = () => {
  const [citas, setCitas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const response = await axios.get("http://localhost:3001/user/citas", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCitas(response.data);
      } catch (error) {
        console.error("Error fetching citas:", error);
        setError("Error fetching citas");
      }
    };

    fetchCitas();
  }, []);

  const eliminarCita = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/user/citas/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCitas(citas.filter((cita) => cita.id !== id));
    } catch (error) {
      console.error("Error deleting cita:", error);
      setError("Error deleting cita");
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (citas.length === 0) {
    return <div>No hay citas agendadas.</div>;
  }

  return (
    <div className="Citas-Container">
      <h2>Citas Agendadas</h2>
      {citas.map((cita) => (
        <div key={cita.id} className="cita-card">
          <div>
          <h3>{cita.tipo_consulta}</h3>
          <p>Fecha: {new Date(cita.fecha_cita).toLocaleDateString()}</p>
          <p>Hora: {cita.hora_cita}</p>
          <p>Médico: {cita.medico}</p>
          <p>Modalidad: {cita.modalidad_consulta}</p>
          </div>
          <div className="Boton-EliminarCita">
          <button onClick={() => eliminarCita(cita.id)}>Eliminar Cita</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CitasAgendadas;