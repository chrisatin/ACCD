import React, { useState } from 'react';
import '../../Estilos/Ayuda/Faq.css'; // Importa el CSS de Bootstrap u otros estilos necesarios

export default function Faq() {
  // Utilizamos el estado para controlar qué pregunta está abierta
  const [openIndex, setOpenIndex] = useState(null);

  // Función para manejar el clic en una pregunta
  const handleQuestionClick = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Alternar el índice abierto
  };

  return (
    <div className="faq">
      <h3>Preguntas Frecuentes</h3>

      {/* Mapeamos las preguntas y respuestas */}
      {preguntas.map((pregunta, index) => (
        <div className="question" key={index}>
          {/* Al hacer clic en la pregunta, se muestra o oculta la respuesta */}
          <div className="question-header" onClick={() => handleQuestionClick(index)}>
            <strong>{pregunta.pregunta}</strong>
            {/* Icono de flecha hacia abajo */}
            <i className={`fas fa-chevron-down ${openIndex === index ? 'rotate-icon' : ''}`}></i>
          </div>
          {/* Mostrar la respuesta si la pregunta está abierta */}
          {openIndex === index && (
            <p>{pregunta.respuesta}</p>
          )}
        </div>
      ))}
    </div>
  );
}

// Array de preguntas y respuestas
const preguntas = [
  {
    pregunta: '¿Cómo puedo agendar una cita médica?',
    respuesta:
      'Puedes agendar una cita médica a través de nuestra plataforma en línea. Inicia sesión en tu cuenta, selecciona la especialidad y el médico que deseas consultar, y elige una fecha y hora disponible.',
  },
  {
    pregunta: '¿Qué documentos debo llevar a mi cita?',
    respuesta:
      'Para tu cita médica, asegúrate de llevar tu documento de identidad, tarjeta de seguro médico y cualquier informe médico relevante. Esto ayudará al médico a brindarte la mejor atención posible.',
  },
  {
    pregunta: '¿Puedo cancelar o reprogramar mi cita?',
    respuesta:
      'Sí, puedes cancelar o reprogramar tu cita médica en cualquier momento antes de la fecha programada. Accede a tu cuenta en línea y sigue las instrucciones para hacerlo.',
  },
  {
    pregunta: '¿Cómo puedo obtener una receta médica?',
    respuesta:
      'Después de tu consulta médica, el médico puede proporcionarte una receta médica y llevarla a la farmacia para obtener tus medicamentos.',
  },
  {
    pregunta: '¿Qué debo hacer si llego tarde a mi cita?',
    respuesta:
      'Si llegas tarde a tu cita, comunícalo al personal de recepción. Haremos todo lo posible para reorganizar tu horario o encontrar una solución adecuada.',
  },
];
