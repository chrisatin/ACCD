// Importamos las librerías y estilos necesarios
import { Link, useLocation } from "react-router-dom";
import "animate.css/animate.min.css"; // Importamos una librería de animaciones CSS
import "../Estilos/MigaDePan.css"; // Importamos estilos específicos para el componente

// Definimos nuestro componente funcional MigaDePan
export default function MigaDePan() {
  const location = useLocation(); // Obtenemos la ubicación actual usando useLocation()

  let currentLink = ''; // Inicializamos una variable para mantener la ruta actual

  // Generamos las migas de pan a partir de la ruta actual
  const crumbs = location.pathname.split('/')
    .filter(crumb => crumb !== '') // Filtramos los elementos vacíos (raíz)
    .map(crumb => {
      currentLink += `/${crumb}`; // Actualizamos la ruta actual

      return (
        <div className="crumb" key={crumb}>
          <Link to={currentLink}>{crumb}</Link> {/* Creamos un enlace para cada crumb */}
        </div>
      );
    });

  // Renderizamos las migas de pan
  return (
    <div className="MigaDePan">
      {crumbs} {/* Mostramos las migas de pan generadas */}
    </div>
  );
}
