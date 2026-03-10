import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#121212] text-white selection:bg-white selection:text-black">
      {/* Scroll-driven Hero Section */}
      <div className="relative w-full">
        <ScrollyCanvas />
        <Overlay />
      </div>

      {/* Projects Grid Section */}
      <Projects />
    </main>
  );
}
