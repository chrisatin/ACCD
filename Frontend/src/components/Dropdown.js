import React, { useContext, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext"; // Importa el contexto de autenticación
import "../Estilos/Dropdown.css"; // Importa los estilos CSS para el Dropdown
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const CustomDropdown = () => {
  const { logout } = useContext(AuthContext); // Obtiene la función de cierre de sesión desde el contexto
  const [isOpen, setIsOpen] = React.useState(false); // Estado para controlar la visibilidad del menú desplegable
  const navigate = useNavigate(); // Hook para navegación programática
  const dropdownRef = useRef(null); // Referencia al elemento del menú desplegable

  const handleLogout = () => {
    logout(); // Llama a la función de cierre de sesión desde el contexto
    navigate("/"); // Navega a la página principal después de cerrar sesión
    window.location.reload();
    setIsOpen(false); // Cierra el menú después de cerrar sesión
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Cambia el estado para mostrar u ocultar el menú desplegable
  };

  const handleClickOutside = (event) => {
    // Cierra el menú si se hace clic fuera de él
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleMenuItemClick = () => {
    setIsOpen(false); // Cierra el menú cuando se hace clic en un elemento del submenú
  };

  useEffect(() => {
    // Agrega un event listener para cerrar el menú al hacer clic fuera de él
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Remueve el event listener al desmontar el componente
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="dropdown-toggle">
        <FontAwesomeIcon icon={faUser} className="UserIcono" />{" "}
        {/* Ícono de usuario */}
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {/* Elementos del menú desplegable */}
          <li className="dropdown-item">
            <NavLink
              className="subMenu"
              to="Perfil"
              onClick={handleMenuItemClick}
            >
              Perfil
            </NavLink>
          </li>
          <li className="dropdown-item">
            <NavLink
              className="subMenu"
              to="CitasAgendadas"
              onClick={handleMenuItemClick}
            >
              Citas Asignadas
            </NavLink>
          </li>
          <li className="dropdown-item">
            <button className="Log-out-button" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
