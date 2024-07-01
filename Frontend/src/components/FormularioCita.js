import React, { useState,useEffect } from "react";
import "../Estilos/Formularios.css";
import "../Estilos/Responsive.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHospital,
  faDesktop,
  faBrain,
  faHeartPulse,
  faEye,
  faStethoscope,
  faBaby,
  faTooth,
  faEarListen,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";

export default function FormularioCita() {
  const baseURL = process.env.REACT_APP_API_BASE_URL;
  const [showModal, setShowModal] = useState(false);
  const [citaData, setCitaData] = useState({
    tipo_consulta: '',
    fecha_cita: '',
    hora_cita: '',
    medico: '',
    modalidad_consulta: ''
  });
  const [minDate, setMinDate] = useState('');

  // useEffect para establecer la fecha mínima al cargar el componente
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setMinDate(formattedDate);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCitaData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleAgendar = async (e) => {
    e.preventDefault();

      try {        
        const URL = String(`${baseURL}/citas/agendar`);
        const response = await fetch(URL,  {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(citaData),
      });

      if (response.ok) {
        setShowModal(true);
      } else {
        console.error('Error al agendar la cita');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <form onSubmit={handleAgendar}>
        <fieldset>
          <legend>Tipo de Consulta</legend>
          <div className="radio-group2">
            {[
              { value: "Medicina General", icon: faStethoscope, label: "Medicina General" },
              { value: "Pediatria", icon: faBaby, label: "Pediatria" },
              { value: "Ginecología y Obstetricia", icon: faUserDoctor, label: "Ginecología" },
              { value: "Cardiología", icon: faHeartPulse, label: "Cardiología" },
              { value: "Odontología", icon: faTooth, label: "Odontología" },
              { value: "Oftalmología", icon: faEye, label: "Oftalmología" },
              { value: "Psicología/Psiquiatría", icon: faBrain, label: "Psicología" },
              { value: "Otorrinolaringología", icon: faEarListen, label: "Otorrinolaringología" },
            ].map((option) => (
              <label key={option.value}>
                <input
                  type="radio"
                  name="tipo_consulta"
                  value={option.value}
                  onChange={handleInputChange}
                  className="radio-input"
                />
                <span className="radio-label">
                  {option.label}
                  <FontAwesomeIcon icon={option.icon} flip className="IconoFormulario" />
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>Fecha y Hora</legend>
          <label>Fecha</label>
          <input 
            type="date" 
            name="fecha_cita" 
            min={minDate}
            onChange={handleInputChange} 
            required 
          />

          <label>Hora</label>
          <input 
            type="time" 
            name="hora_cita" 
            onChange={handleInputChange} 
            required 
          />
        </fieldset>

        <fieldset>
          <legend>Médico</legend>
          <select name="medico" onChange={handleInputChange}>
            <option value="medico1">Dr. Juan Pérez</option>
            <option value="medico2">Dra. María Gómez</option>
          </select>
        </fieldset>

        <fieldset>
          <legend>Modalidad de Consulta</legend>
          <div className="radio-group2">
            {[
              { value: "Virtual", icon: faDesktop },
              { value: "Presencial", icon: faHospital },
            ].map((option) => (
              <label key={option.value}>
                <input
                  type="radio"
                  name="modalidad_consulta"
                  value={option.value}
                  onChange={handleInputChange}
                  className="radio-input"
                />
                <span className="radio-label">
                  {option.value}
                  <FontAwesomeIcon icon={option.icon} className="IconoFormulario" />
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="contenedorBotones">
          <button className="BotonAgendar" type="submit">
            Agendar cita
          </button>
        </div>
      </form>

      {showModal && (
        <div className="modal">
          <div className="modal-Formulario">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <p className="ModalCita">Su cita ha sido Agendada</p>
          </div>
        </div>
      )}
    </div>
  );
}
