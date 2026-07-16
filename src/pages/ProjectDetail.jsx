import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import CrosshairCursor from '../components/portfolio/CrosshairCursor';
import GridLines from '../components/portfolio/GridLines';
import NavToggle from '../components/portfolio/NavToggle';
import { PROJECTS } from '../lib/projects';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = PROJECTS[parseInt(id)];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono text-muted-foreground">
        Project not found.
      </div>
    );
  }

  return (
    <div className="relative font-heading min-h-screen">
      <CrosshairCursor />
      <GridLines />
      <NavToggle />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={visible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-primary transition-colors mb-12"
          >
            <ArrowLeft className="w-3 h-3" />
            ← BACK TO SCHEMATICS
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[10px] text-primary/60 tracking-widest">
              PRJ.{String(parseInt(id) + 1).padStart(2, '0')}
            </span>
            <div className="h-px flex-1 bg-border max-w-16" />
          </div>
          <h1 className="font-heading font-900 text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6">
            {project.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-[1.7] max-w-3xl">
            {project.description}
          </p>
        </motion.div>

        {/* Spec row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-b border-border py-8 mb-16"
        >
          {[
            { label: 'INPUT SOURCE', value: project.input },
            { label: 'THROUGHPUT', value: project.throughput },
            { label: 'LATENCY', value: project.latency },
            { label: 'STATUS', value: project.status || 'Production' },
          ].map(s => (
            <div key={s.label}>
              <div className="font-mono text-[10px] tracking-widest text-muted-foreground/60 mb-2">
                {s.label}
              </div>
              <div className="font-heading font-700 text-xl text-primary">
                {s.value}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Main content: image + overview */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full border border-border"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h2 className="font-heading font-700 text-xl mb-3">Overview</h2>
              <p className="text-base text-muted-foreground leading-[1.7]">
                {project.overview}
              </p>
            </div>
            <div>
              <h2 className="font-heading font-700 text-xl mb-3">Challenges Solved</h2>
              <ul className="space-y-2">
                {project.challenges.map((c, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="font-mono text-primary/50 mt-0.5">→</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-baseline gap-4 mb-8">
            <h2 className="font-heading font-700 text-2xl">Architecture Diagram</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="border border-border bg-secondary/30 p-6 overflow-x-auto rounded-sm">
            <svg viewBox="0 0 800 300" className="w-full min-w-[600px]">
              <defs>
                <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="hsl(222, 100%, 65%)" opacity="0.8" />
                </marker>
              </defs>

              {/* Groups first (background) */}
              {project.diagram.groups && project.diagram.groups.map((g, i) => (
                <g key={i}>
                  <rect
                    x={g.x} y={g.y}
                    width={g.w} height={g.h}
                    fill="hsl(222, 60%, 12%)"
                    fillOpacity="0.5"
                    stroke="hsl(222, 100%, 50%)"
                    strokeWidth="0.8"
                    strokeDasharray="5,4"
                    rx="4"
                  />
                  <text
                    x={g.x + 10} y={g.y + 13}
                    fill="hsl(222, 100%, 70%)"
                    fontSize="7.5"
                    fontFamily="JetBrains Mono, monospace"
                    fontWeight="600"
                    letterSpacing="0.5"
                    opacity="0.8"
                  >
                    {g.label}
                  </text>
                </g>
              ))}

              {/* Edges */}
              {project.diagram.edges.map((edge, i) => (
                <g key={i}>
                  <line
                    x1={edge.x1} y1={edge.y1}
                    x2={edge.x2} y2={edge.y2}
                    stroke="hsl(222, 100%, 65%)"
                    strokeWidth="1.2"
                    strokeDasharray={edge.dashed ? "5,4" : "0"}
                    opacity="0.6"
                    markerEnd="url(#arrow)"
                  />
                  {edge.label && (
                    <text
                      x={(edge.x1 + edge.x2) / 2}
                      y={(edge.y1 + edge.y2) / 2 - 4}
                      textAnchor="middle"
                      fill="hsl(222, 100%, 75%)"
                      fontSize="7"
                      fontFamily="JetBrains Mono, monospace"
                      opacity="0.9"
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              ))}

              {/* Nodes (on top) */}
              {project.diagram.nodes.map((node, i) => (
                <g key={i}>
                  <rect
                    x={node.x} y={node.y}
                    width={node.w || 100} height={node.h || 40}
                    fill="hsl(222, 60%, 18%)"
                    stroke="hsl(222, 100%, 55%)"
                    strokeWidth="1"
                    rx="3"
                  />
                  <text
                    x={node.x + (node.w || 100) / 2}
                    y={node.y + (node.h || 40) / 2 - (node.sublabel ? 5 : 0)}
                    textAnchor="middle"
                    dominantBaseline={node.sublabel ? 'auto' : 'middle'}
                    fill="hsl(0, 0%, 95%)"
                    fontSize="10"
                    fontFamily="JetBrains Mono, monospace"
                    fontWeight="600"
                  >
                    {node.label}
                  </text>
                  {node.sublabel && (
                    <text
                      x={node.x + (node.w || 100) / 2}
                      y={node.y + (node.h || 40) / 2 + 9}
                      textAnchor="middle"
                      fill="hsl(222, 100%, 70%)"
                      fontSize="8"
                      fontFamily="JetBrains Mono, monospace"
                      opacity="0.9"
                    >
                      {node.sublabel}
                    </text>
                  )}
                </g>
              ))}
            </svg>
          </div>
        </motion.div>

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="flex items-baseline gap-4 mb-6">
            <h2 className="font-heading font-700 text-2xl">Tech Stack</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="flex flex-wrap gap-2">
            {project.stack.map(tech => (
              <span
                key={tech}
                className="px-4 py-2 font-mono text-xs bg-primary/5 text-primary border border-primary/15 hover:border-primary/40 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-baseline gap-4 mb-6">
            <h2 className="font-heading font-700 text-2xl">Outcomes</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {project.outcomes.map((o, i) => (
              <div key={i} className="border border-border p-5 hover:border-primary/20 transition-colors">
                <div className="font-heading font-800 text-2xl text-primary mb-1">{o.value}</div>
                <div className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">{o.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
