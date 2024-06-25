import React, { useState } from "react";
import "../Estilos/AsignarCita.css";
import FormularioCita from "../components/FormularioCita";

export default function AsignarCita() {
  const [ setMostrarPaciente] = useState(true);

  const handleVolver = () => {
    setMostrarPaciente(true);
  };

  return (
    <div className="about">
      <h2>Ingrese los datos de su cita</h2>
      <div className="FormularioCitas">
            <FormularioCita onVolver={handleVolver} />
        </div>
    </div>
  );
}
