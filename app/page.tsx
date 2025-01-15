import TransitionPage from "@/components/transition-page";
import Photo from "@/components/photo";
import AboutMe from "@/components/about-me";
import ContactMe from "@/components/contac";

export default function Home() {
  return (
    <div>
      {/* Sección de Foto */}
      <div>
        <TransitionPage />
        <Photo />
      </div>

      {/* Sección "Sobre Mi" */}
      <div id="about-me">
        <AboutMe />
      </div>

      {/* Sección "Contáctame" */}
      <div id="contactame">
        <ContactMe/>
      </div>
    </div>
  );
}
