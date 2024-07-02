import React, { useState } from "react";
import { Form } from "react-router-dom";
import '../../Estilos/Ayuda/Contactenos.css';

export default function Contactenos() {
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const email = formData.get('email');
    const message = formData.get('message');

    try {
      const response = await fetch('http://localhost:3001/user/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, message }),
      });

      const result = await response.json();

      if (result.error) {
        console.error(result.error);
      } else {
        setConfirmationMessage("Solicitud enviada!");
        form.reset(); // Limpiar los campos del formulario
        setTimeout(() => {
          setConfirmationMessage("");
        }, 4000);
      }
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }
  };

  return (
    <div className="contactenos">
      <h3>Contactenos</h3>
      <Form method="post" onSubmit={handleSubmit}>
        <label>
          <span>Correo electronico:</span>
          <input type="email" name="email" required />
        </label>
        <label>
          <span>Mensaje:</span>
          <textarea name="message" required></textarea>
        </label>
        <button type="submit">Enviar</button>
      </Form>
      {confirmationMessage && <p>{confirmationMessage}</p>}
    </div>
  );
}