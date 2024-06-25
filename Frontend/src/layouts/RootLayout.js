import React, { useState, useContext } from "react";
import { Outlet, NavLink, ScrollRestoration } from "react-router-dom";
import MigaDePan from "../components/MigaDePan";
import TransicionFade from "../components/TransicionFade";
import MySplideComponent from "../components/Slide";
import LoginModal from "../components/Login";
import "../Estilos/SocialFooter.css";
import "../Estilos/FadeFooter.css";
import "../Estilos/Responsive.css";
import { AuthContext } from "../components/AuthContext";
import CustomDropdown from "../components/Dropdown";

export default function RootLayout() {
  const [showContent, setShowContent] = useState(false);
  const { isAuthenticated} = useContext(AuthContext);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleOpenLoginModal = () => {
    setIsLoginOpen(true);
  };
  
  return (
    <div className="root-layout">
      <ScrollRestoration />
      <header>
        <nav>
          <div className="logo">
            <img src="./Icono.png" alt="Icono" />
          </div>
          <h1>ACCD</h1>
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="AsignarCita">Agenda tu Cita</NavLink>
          <NavLink to="Ayuda">Ayuda</NavLink>

          {isAuthenticated ? (
            <CustomDropdown /> // Usa el componente CustomDropdown
          ) : (
            <button className="Login" onClick={handleOpenLoginModal}>
              Iniciar Sesión
            </button>
          )}
        </nav>
      </header>
      <MigaDePan />
      <div className="content">
        <main>
          <Outlet />
        </main>
      </div>
      <div className="footer">
        <footer>
          {/* Botón Fade Contactenos */}
          <button
            className="Contactenos"
            onClick={() => setShowContent(!showContent)}
          >
            {showContent ? "Contactenos" : "Contactenos"}
          </button>
          <TransicionFade show={showContent}>
            <MySplideComponent />
          </TransicionFade>
          {/* Referencia a redes sociales */}
          <div className="social-links">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://www.twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </footer>
      </div>
      <LoginModal
        isOpen={isLoginOpen}
        onCloseModal={() => setIsLoginOpen(false)}
      />
    </div>
  );
}
