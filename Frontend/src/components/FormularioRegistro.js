import React, { useState } from "react";
import "../Estilos/Formularios.css";
import "../Estilos/Modal.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const validateEmail = (email) => {
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const FormularioRegistro = ({ onCloseModal }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [numDocumento, setNumDocumento] = useState("");
  const [genero, setGenero] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const closeModal = () => {onCloseModal();
    };

  const navigateToHome = () => {
    if (location.pathname === "/") {
      closeModal();
    } else {
      navigate("/");
      closeModal();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const baseURL = process.env.REACT_APP_API_BASE_URL;
    const URL = String(`${baseURL}/auth/register`);
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        apellido,
        tipoDocumento,
        numDocumento,
        genero,
        email,
        telefono,
        password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error registering user");
        }
        return response.text();
      })
      .then((data) => {
        console.log(data);
        closeModal();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="registro-form-container">
      <div className="modal-close-button">
        <button onClick={navigateToHome} className="close-button">
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="registro-form">
        <fieldset className="registro-fieldset">
          <legend className="registro-legend">Datos Personales</legend>
          <label className="registro-label">
            Nombre:
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="registro-input"
            />
          </label>
          <label className="registro-label">
            Apellido:
            <input
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
              className="registro-input"
            />
          </label>
          <label className="registro-label">
            Tipo de documento:
            <select
              value={tipoDocumento}
              onChange={(e) => setTipoDocumento(e.target.value)}
              required
              className="registro-select"
            >
              <option value="">Seleccione una opción</option>
              <option value="cedula">Cédula de Ciudadanía</option>
              <option value="tarjeta">Tarjeta de Identidad</option>
              <option value="pasaporte">Pasaporte</option>
            </select>
          </label>
          <label className="registro-label">
            Número de documento:
            <input
              type="number"
              value={numDocumento}
              onChange={(e) => setNumDocumento(e.target.value)}
              max={9999999999}
              required
              className="registro-input"
            />
          </label>
          <label className="registro-label">
            Género:
            <select
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              required
              className="registro-select"
            >
              <option value="">Seleccione una opción</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
          </label>
        </fieldset>
        <fieldset className="registro-fieldset">
          <legend className="registro-legend">Contacto</legend>
          <label className="registro-label">
            Correo electrónico:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="registro-input"
            />
            {email && !validateEmail(email) && (
              <span className="registro-error">El correo electrónico no es válido</span>
            )}
          </label>
          <label className="registro-label">
            Teléfono:
            <input
              type="number"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              max={9999999999}
              required
              className="registro-input"
            />
          </label>
          <label className="registro-label">
            Contraseña:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="registro-input"
            />
            {password && !validatePassword(password) && (
              <span className="registro-error">
                La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo especial
              </span>
            )}
          </label>
        </fieldset>
        <div className="registro-submit">
          <button type="submit" className="registro-btn">
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioRegistro;
export { validateEmail, validatePassword };
