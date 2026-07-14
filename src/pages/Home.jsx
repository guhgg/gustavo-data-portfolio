import CrosshairCursor from '../components/portfolio/CrosshairCursor';
import ProgressConduit from '../components/portfolio/ProgressConduit';
import GridLines from '../components/portfolio/GridLines';
import NavToggle from '../components/portfolio/NavToggle';
import HeroSection from '../components/portfolio/HeroSection';
import ProjectsSection from '../components/portfolio/ProjectsSection';
import TechMarquee from '../components/portfolio/TechMarquee';
import AboutSection from '../components/portfolio/AboutSection';
import TerminalContact from '../components/portfolio/TerminalContact';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80';
const ABOUT_IMAGE = 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80';

export default function Home() {
  return (
    <div className="relative font-heading">
      <CrosshairCursor />
      <GridLines />
      <NavToggle />
      <ProgressConduit />

      <HeroSection heroImage={HERO_IMAGE} />
      <ProjectsSection />
      <TechMarquee />
      <AboutSection aboutImage={ABOUT_IMAGE} />
      <TerminalContact />

      {/* Footer micro */}
      <footer className="fixed bottom-8 left-0 right-0 pointer-events-none z-40">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex justify-between items-center">
          <span className="font-mono text-[9px] text-muted-foreground/30 tracking-widest">
            DATA.PLATFORM.PORTFOLIO // v1.0
          </span>
          <span className="font-mono text-[9px] text-muted-foreground/30 tracking-widest">
            © 2026
          </span>
        </div>
      </footer>
    </div>
  );
}
