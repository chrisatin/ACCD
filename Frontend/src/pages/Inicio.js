import React from 'react';
import VideoCarousel from '../components/VideoCarousel';
import '../Estilos/Inicio.css';

export default function Inicio() {

  return (
    <div className="home">
      <h2>Bienvenido</h2>
      <p>Cuidamos tu salud, cita a cita</p>
      
      <div className="Video">
        <VideoCarousel />
      </div>

      <div className='comoAgendar'>
      <h3>¿Cómo agendar una cita?</h3>
      <ul>
        <li>Ve al apartado "Agenda tu Cita"</li>
        <li>Completa tus datos</li>
        <li>Elige la fecha y hora.</li>
        <li>Selecciona el médico</li>
        <li>Revisa tu información</li>
      </ul>
      </div>

    </div>
  );
}