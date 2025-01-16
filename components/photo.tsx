"use client";
import Image from "next/image";
import CoverParticles from "./cover-particles";

const Photo = () => {
  return (
    <div
      className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] bg-darkBg overflow-hidden"
    >
      {/* Partículas limitadas al contenedor */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <CoverParticles />
      </div>

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          Sergio Alonso Revueltas
        </h1>
        <div className="flex justify-center">
          <Image
            src="/yo.png"
            priority
            width={300}
            height={300}
            alt="Foto perfil"
            className="rounded-full z-10 object-cover w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52"
          />
        </div>
      </div>
    </div>
  );
};

export default Photo;
