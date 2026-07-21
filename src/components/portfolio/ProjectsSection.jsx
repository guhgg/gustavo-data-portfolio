import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import { PROJECTS } from '../../lib/projects';

export default function ProjectsSection() {
  return (
    <section id="schematics" className="relative py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-border">
        <div className="h-full w-24 bg-gradient-to-r from-transparent via-primary/40 to-transparent animate-pulse-line" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex items-baseline gap-4 mb-16">
          <span className="font-mono text-[10px] tracking-widest text-primary/60">01</span>
          <h2 className="font-heading font-800 text-3xl md:text-4xl tracking-tight">
            Project Schematics
          </h2>
          <div className="hidden md:block flex-1 h-px bg-border ml-4" />
          <span className="hidden md:inline font-mono text-[10px] text-muted-foreground tracking-wider">
            {PROJECTS.length} DEPLOYMENTS
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <Link key={i} to={`/project/${project.slug}`} className="block group">
              <ProjectCard project={project} index={i} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
