import TransitionPage from "@/components/transition-page";
import Photo from "@/components/photo";
import AboutMe from "@/components/about-me";
import ContactMe from "@/components/contac";
import Proyectos from "@/components/proyectos";

export default function Home() {
  return (
    <div>
      {/* Sección de Foto */}
      <div id="inicio">
        <TransitionPage />
        <Photo />
      </div>

      {/* Sección "Sobre Mi" */}
      <div id="about-me">
        <AboutMe />
      </div>

      {/* Sección "Proyectos" */}
      <div id="proyectos">
        <Proyectos />
      </div>

      {/* Sección "Contáctame" */}
      <div id="contactame">
        <ContactMe/>
      </div>
      <div className="h-[5vh]"></div>
    </div>
  );
}
