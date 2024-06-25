// Importamos React y los componentes necesarios de Splide y sus estilos CSS
import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide'; // Importamos el componente Splide y SplideSlide
import '@splidejs/splide/dist/css/splide.min.css'; // Importamos los estilos CSS de Splide

// Creamos y exportamos nuestro componente funcional MySplideComponent
export default function MySplideComponent() {
  return (
    // Utilizamos el componente Splide para crear un carrusel de imágenes
    <Splide
      options={{
        direction: 'ttb', // Dirección del carrusel (top to bottom - de arriba abajo)
        height: '10rem', // Altura del carrusel
        wheel: true, // Habilitar el control del carrusel con la rueda del mouse
      }}
    >
      {/* Cada SplideSlide representa una diapositiva en el carrusel */}
      <SplideSlide>
        <img
          src="./Angela.png" // Ruta de la imagen 1
          alt="Imagen 1"
          style={{ maxWidth: '100%', height: '100%' }} // Estilos para ajustar la imagen al tamaño del contenedor
        />
      </SplideSlide>
      <SplideSlide>
        <img
          src="./Camilo.png" // Ruta de la imagen 2
          alt="Imagen 2"
          style={{ maxWidth: '100%', height: '100%' }} // Estilos para ajustar la imagen al tamaño del contenedor
        />
      </SplideSlide>
      <SplideSlide>
        <img
          src="./Cristian.png" // Ruta de la imagen 3
          alt="Imagen 3"
          style={{ maxWidth: '100%', height: '100%' }} // Estilos para ajustar la imagen al tamaño del contenedor
        />
      </SplideSlide>
      <SplideSlide>
        <img
          src="./Convers.png" // Ruta de la imagen 4
          alt="Imagen 4"
          style={{ maxWidth: '100%', height: '100%' }} // Estilos para ajustar la imagen al tamaño del contenedor
        />
      </SplideSlide>
    </Splide>
  );
}
