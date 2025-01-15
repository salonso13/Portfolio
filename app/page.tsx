import CoverParticles from "@/components/cover-particles";
import TransitionPage from "@/components/transition-page";
import Photo from "@/components/photo"
import AboutMe from "@/components/about-me";

export default function Home() {
  return (
    <main>
      <TransitionPage />
      <div className="flex min-h-[30vh] bg-norepeat bg-gradient-cover">
        <CoverParticles />
        <Photo />
      </div>

      <div id="about-me" className="min-h-[100vh] bg-white ">
        <AboutMe/>
      </div>

      <div id="contactame" className="min-h-[100vh] bg-secondary">
        <h2>Contáctame</h2>
        <p>Contenido de contacto...</p>
      </div>
    </main>    
  );
}
