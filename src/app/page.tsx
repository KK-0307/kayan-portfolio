import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import NowPlaying from "@/components/NowPlaying";
import WhoAmI from "@/components/WhoAmI";
import ProjectsSection from "@/components/ProjectsSection";
import StatusPanel from "@/components/StatusPanel";
import SkillsPanel from "@/components/SkillsPanel";
import TechStackPanel from "@/components/TechStackPanel";

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_340px] gap-6 items-start">
          <div className="flex flex-col gap-6 lg:sticky lg:top-6">
            <Sidebar />
            <NowPlaying />
          </div>

          <div className="flex flex-col gap-6">
            <WhoAmI />
            <ProjectsSection />
          </div>

          <div className="flex flex-col gap-6">
            <StatusPanel />
            <SkillsPanel />
            <TechStackPanel />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
