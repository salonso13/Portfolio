"use client";

const AboutMe = () => {
  return (
    <div className="w-full pt-16 md:pt-20 z-20">
      <div className="flex justify-center pt-5">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4 z-10">
          Sobre mí
        </h1>
      </div>
      <div className="flex flex-col md:flex-row items-start px-4 md:px-16 py-6 md:py-10 z-10">
        {/* Columna Izquierda */}
        <div className="w-full md:w-1/2 px-2 md:px-5 z-10">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold">Fecha de nacimiento:</h1>
          <p className="text-sm sm:text-base pt-2">4 de octubre de 2003.</p>

          <h1 className="text-lg sm:text-xl md:text-2xl font-bold pt-5">Educación:</h1>
          <ul className="list-disc list-inside text-sm sm:text-base pt-2">
            <li>Curso de premonitor (Sept 2019 - Oct 2019)</li>
            <li>Educación Secundaria Obligatoria (Sept 2014 - Jun 2021)</li>
            <li>Técnico en sistemas microinformáticos y redes (Sept 2021 - Jun 2023)</li>
            <li>Técnico Superior en desarrollo de aplicaciones web (Sept 2023 - Actualidad)</li>
          </ul>

          <h1 className="text-lg sm:text-xl md:text-2xl font-bold pt-5">Experiencia:</h1>
          <ul className="list-disc list-inside text-sm sm:text-base pt-2">
            <li>Técnico Informático en Ortoalresa (Mar 2023 - Jun 2023)</li>
            <li>Ayudante de camarero en Cafetería RENE (Jun 2022 - Sept 2022) (May 2024 - Sept 2024)</li>
          </ul>
        </div>

        {/* Columna Derecha */}
        <div className="w-full md:w-1/2 px-2 md:px-5 z-10">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold">Acerca de:</h1>
          <p className="text-sm sm:text-base pt-2">
            A pesar de mi falta de experiencia laboral, he adquirido habilidades
            valiosas a través de mis prácticas del ciclo formativo. Estas
            experiencias me han permitido desarrollar una mentalidad proactiva,
            capacidad de resolución de problemas y habilidades de trabajo en
            equipo.
          </p>
          <p className="text-sm sm:text-base pt-5">
            Estoy ansioso por aprender y crecer profesionalmente. Soy una
            persona altamente motivada, dedicada y comprometida con la
            excelencia. Tengo una gran capacidad de adaptación y una actitud
            positiva hacia el aprendizaje continuo.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
