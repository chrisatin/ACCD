import React, { useState, useContext, useRef } from "react";
import Modal from "react-modal";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "../Estilos/Login.css";
import { AuthContext } from "./AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye, faTimes } from "@fortawesome/free-solid-svg-icons";
import FormularioRegistro, { validateEmail } from "./FormularioRegistro";
import ReCAPTCHA from "react-google-recaptcha";

// Definimos nuestro componente funcional LoginModal que recibe props
const LoginModal = ({ isOpen, onCloseModal }) => {
  // Definimos estados locales usando el hook useState
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showRegistroModal, setShowRegistroModal] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [loginError, setLoginError] = useState("");
  const [captchaValido, setCaptchaValido] = useState(null);

  // Usamos el hook useContext para acceder al contexto de autenticación
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const captcha = useRef(null);

  // Funciones para manejar cambios en el formulario
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsEmailValid(validateEmail(e.target.value));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const onCaptchaChange = () => {
    if (captcha.current.getValue()) {
      console.log("El usuario no es un robot");
      setCaptchaValido(true);
    }
  };

  // Función para realizar el inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!captcha.current.getValue()) {
      console.log("Por favor acepta el captcha");
      setCaptchaValido(false);
      return;
    }

    try {
      const baseURL = process.env.REACT_APP_API_BASE_URL;
      const URL = String(`${baseURL}/auth/login`);
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.token);
        onCloseModal();
      } else {
        const error = await response.json();
        setLoginError(error.message);
      }
    } catch (error) {
      setLoginError("Error al iniciar sesión. Por favor, inténtelo de nuevo.");
    }
  };

  // Función para cerrar el modal
  const closeModal = () => {
    onCloseModal(); // Cerramos el modal principal
    setShowRegistroModal(false); // Opcionalmente, cerramos el modal de registro si está abierto
  };

  // Función para navegar a la página principal
  const navigateToHome = () => {
    if (location.pathname === "/") {
      closeModal();
    } else {
      navigate("/");
      closeModal();
    }
  };

  // Función para abrir el modal de registro
  const handleOpenRegistroModal = () => {
    setShowRegistroModal(true);
  };

  // Renderizamos la interfaz del modal de inicio de sesión y el modal de registro
  return (
    <div className="LoginContenedor">
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Iniciar sesión"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <h2>Iniciar sesión</h2>
          <button onClick={navigateToHome} className="close-button">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <form onSubmit={handleLogin} className="modal-body">
          <input
            type="text"
            placeholder="Correo electrónico"
            value={email}
            onChange={handleEmailChange}
          />
          {!isEmailValid && (
            <span className="registro-error">
              El correo electrónico no es válido
            </span>
          )}
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={handlePasswordChange}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={toggleShowPassword}
            >
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="toggle-password-icon"
              />
            </button>
          </div>
          <div className="recaptcha">
            <ReCAPTCHA
              ref={captcha}
              sitekey="6LdLnAUqAAAAANdNxkoXLaLesHfNfk5Yf0-eNHka"
              onChange={onCaptchaChange}
            />
            {captchaValido === false && (
              <div className="error-captcha">Por favor el captcha</div>
            )}
            {loginError && <span className="login-error">{loginError}</span>}
          </div>
          <label className="RemenberMe">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={handleRememberMe}
            />
            Recordarme
          </label>
          <div className="forgot-password-link">
            <Link to="/forgot-password" onClick={closeModal}>
              Olvidé mi contraseña
            </Link>
          </div>
          <div className="modal-footer">
            <button type="button" onClick={handleOpenRegistroModal}>
              Registrarme
            </button>
            <button type="submit" disabled={!isEmailValid}>
              Iniciar sesión
            </button>
          </div>
        </form>
      </Modal>

      {showRegistroModal && (
        <Modal
          isOpen={showRegistroModal}
          onRequestClose={closeModal}
          contentLabel="Registro"
          className="modal-content"
          overlayClassName="modal-overlay"
        >
          <FormularioRegistro onCloseModal={closeModal} />
        </Modal>
      )}
    </div>
  );
};

// Exportamos el componente LoginModal para su uso en otras partes de la aplicación
export default LoginModal;