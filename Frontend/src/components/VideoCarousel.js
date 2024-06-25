import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide'; // Importamos Splide y SplideSlide desde @splidejs/react-splide
import '@splidejs/splide/dist/css/splide.min.css'; // Importamos los estilos CSS de Splide

// Definimos nuestro componente funcional VideoCarousel
export default function VideoCarousel() {
  return (
    // Utilizamos el componente Splide para crear un carrusel de videos
    <Splide
      options={{
        video: {
          loop: true, // Reproducir en bucle
          mute: true, // Silenciar el video
          playerOptions: {
            youtube: {
              width: '100%', // Ancho del reproductor de YouTube
              height: '400px', // Altura del reproductor de YouTube
            },
          },
        },
      }}
    >
      {/* Cada SplideSlide representa un video en el carrusel */}
      <SplideSlide>
        {/* Primer video */}
        <iframe
          title="Video 1"
          width="100%"
          height="400"
          src="https://docs.google.com/file/d/1lqd1MmgDXIVBaSQz97kIWbuyihzRITde/preview"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
      </SplideSlide>
      <SplideSlide>
        {/* Segundo video */}
        <iframe
          title="Video 2"
          width="100%"
          height="400"
          src="https://docs.google.com/file/d/12b23AAJTVU1Hmwc0BsOCqyNxU1Pr7e_P/preview"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
      </SplideSlide>
      <SplideSlide>
        {/* Tercer video */}
        <iframe
          title="Video 3"
          width="100%"
          height="400"
          src="https://docs.google.com/file/d/10IBNrGIBPnoEy_flDtFhjIbhkW4eIMhV/preview"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
      </SplideSlide>
    </Splide>
  );
}
