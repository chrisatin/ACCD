import { NavLink, Outlet } from "react-router-dom";
import '../Estilos/HelpLayout/HelpLayout.css'

export default function HelpLayout() {
  return (
    <div className="help-layout">
      <h2>¿Necesitas Ayuda?</h2>
      <p>
        ¿Tienes alguna duda sobre cómo agendar una cita? ¿Necesitas ayuda con tu
        cuenta o información sobre servicios médicos? Explora nuestras preguntas
        frecuentes o ponte en contacto con nuestro equipo de soporte. Estaremos
        encantados de ayudarte en todo lo que necesites.
      </p>

      <nav>
        <NavLink to="FAQ">Preguntas Frecuentes</NavLink>
        <NavLink to="Contactenos">Contactenos</NavLink>
      </nav>

      <Outlet />
    </div>
  );
}
