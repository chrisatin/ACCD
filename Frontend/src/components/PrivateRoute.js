// Importamos las librerías y componentes necesarios desde React y React Router
import React, { useContext } from "react";
// import { useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext"; // Importamos el contexto de autenticación
import LoginModal from "./Login"; // Importamos el componente de inicio de sesión

// Definimos nuestro componente PrivateRoute que recibe children como props
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext); // Obtenemos el estado de autenticación del contexto

  // const location = useLocation(); De momento no se está usando

  // Verificamos si el usuario está autenticado, de lo contrario mostramos el modal de inicio de sesión
  if (!isAuthenticated) {
    return <LoginModal isOpen={true} />;
  }

  // Si el usuario está autenticado, mostramos los componentes hijos
  return children;
};

// Exportamos el componente PrivateRoute para su uso en otras partes de la aplicación
export default PrivateRoute;
