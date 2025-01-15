import CoverParticles from "@/components/cover-particles";
import TransitionPage from "@/components/transition-page";
import Photo from "@/components/photo"

export default function Home() {
  return (
    <main>
      <TransitionPage />
      <div className="flex min-h-[100vh] h-full bg-norepeat bg-gradient-cover relative">
        <CoverParticles />
        <Photo />
      </div>
    </main>
  );
}
