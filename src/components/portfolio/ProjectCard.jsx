import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group border border-border bg-card hover:border-primary/30 transition-all duration-500"
    >
      {/* Image / Diagram area */}
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary/50">
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-cover transition-all duration-700 ${hovered ? 'opacity-10 scale-105' : 'opacity-100'}`}
        />
        {/* Architecture diagram overlay */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
          <svg viewBox="0 0 200 120" className="w-3/4 h-3/4">
            {/* Simplified pipeline diagram */}
            {project.nodes.map((node, i) => (
              <g key={i}>
                <rect
                  x={node.x}
                  y={node.y}
                  width={node.w || 30}
                  height={node.h || 16}
                  fill="none"
                  stroke="hsl(222, 100%, 50%)"
                  strokeWidth="0.8"
                  rx="2"
                  className="transition-all duration-300"
                  style={{ transitionDelay: `${i * 50}ms` }}
                />
                <text
                  x={node.x + (node.w || 30) / 2}
                  y={node.y + (node.h || 16) / 2 + 3}
                  textAnchor="middle"
                  fill="hsl(222, 100%, 50%)"
                  fontSize="5"
                  fontFamily="monospace"
                >
                  {node.label}
                </text>
              </g>
            ))}
            {project.edges.map((edge, i) => (
              <line
                key={i}
                x1={edge.x1} y1={edge.y1}
                x2={edge.x2} y2={edge.y2}
                stroke="hsl(222, 100%, 50%)"
                strokeWidth="0.5"
                strokeDasharray="3,2"
                opacity="0.6"
              />
            ))}
          </svg>
        </div>
        {/* Project index */}
        <div className="absolute top-3 left-3 font-mono text-[10px] text-muted-foreground/60">
          PRJ.{String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Spec sheet */}
      <div className="p-5">
        <h3 className="font-heading font-700 text-lg mb-3">{project.title}</h3>
        <div className="space-y-2">
          {[
            { label: 'INPUT', value: project.input },
            { label: 'THROUGHPUT', value: project.throughput },
            { label: 'LATENCY', value: project.latency },
          ].map(spec => (
            <div key={spec.label} className="flex items-baseline justify-between">
              <span className="font-mono text-[10px] tracking-wider text-muted-foreground">
                {spec.label}
              </span>
              <span className="font-mono text-xs text-foreground">
                {spec.value}
              </span>
            </div>
          ))}
        </div>
        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.stack.map(tech => (
            <span
              key={tech}
              className="px-2 py-0.5 font-mono text-[10px] bg-primary/5 text-primary border border-primary/10"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
