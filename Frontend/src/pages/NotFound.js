import { NavLink } from "react-router-dom"

export default function NotFound() {
  return (
    <div>
      <h2>Página no encontrada!</h2>
      <p>Lo sentimos, la página que estás buscando no se encuentra disponible en este momento. Puede que haya sido eliminada o que hayas ingresado una dirección incorrecta. 😔</p>

      <p>Puedes regresar al <NavLink to="/">inicio</NavLink> para continuar navegando por nuestro sitio.</p>
      <p>O si lo deseas puedes juegar Dino T-Rex. 🦖🦖🦖 </p>
      <div className="wordle">
        <iframe
          title="Wordle"
          src="https://offline-dino-game.firebaseapp.com"
          width="100%"
          height="600px"
          frameBorder="0"
          scrolling="no"
        ></iframe>
      </div>
    </div>
  )
}
