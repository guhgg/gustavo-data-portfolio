import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function HeroSection({ heroImage }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const NODES = 40;
    const nodes = Array.from({ length: NODES }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
    }));

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      nodes.forEach(n => {
        const dx = mx - n.x;
        const dy = my - n.y;
        n.x += n.vx + dx * 0.00015;
        n.y += n.vy + dy * 0.00015;
        if (n.x < 0 || n.x > 1) n.vx *= -1;
        if (n.y < 0 || n.y > 1) n.vy *= -1;
        n.x = Math.max(0, Math.min(1, n.x));
        n.y = Math.max(0, Math.min(1, n.y));
      });

      // Draw edges
      const blue = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
      for (let i = 0; i < NODES; i++) {
        for (let j = i + 1; j < NODES; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 0.18) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x * w, nodes[i].y * h);
            ctx.lineTo(nodes[j].x * w, nodes[j].y * h);
            ctx.strokeStyle = `hsla(222, 100%, 50%, ${(1 - dist / 0.18) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x * w, n.y * h, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'hsla(222, 100%, 50%, 0.4)';
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };
    canvas.addEventListener('mousemove', handleMouse);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return (
    <section id="core-engine" className="relative min-h-screen flex items-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* Pulse lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-pulse-line"
            style={{
              top: `${25 + i * 25}%`,
              width: '200px',
              animationDelay: `${i * 1.2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 w-full py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-2 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
                All systems operational
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="font-heading font-900 text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight"
            >
              Gustavo
              <br />
              <span className="text-primary">Souza</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-6 font-mono text-sm text-muted-foreground leading-relaxed max-w-md"
            >
              Senior Data Platform Engineer. Building high-throughput data pipelines,
              ML infrastructure, and cloud-native platforms at petabyte scale.
            </motion.p>

            {/* Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-10 flex gap-8"
            >
              {[
                { value: '200+', label: 'Concurrent Spark Jobs' },
                { value: '< 20ms', label: 'P99 Serving Latency' },
                { value: '30%+', label: 'Cost Saved' },
              ].map(m => (
                <div key={m.label}>
                  <div className="font-heading font-800 text-2xl md:text-3xl text-primary">
                    {m.value}
                  </div>
                  <div className="font-mono text-[10px] tracking-wider text-muted-foreground mt-1 uppercase">
                    {m.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-10 flex gap-4"
            >
              <button
                onClick={() => document.getElementById('schematics')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 bg-primary text-primary-foreground font-mono text-xs tracking-widest uppercase hover:bg-primary/90 transition-colors"
              >
                View Schematics →
              </button>
              <button
                onClick={() => document.getElementById('transmission')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 border border-border font-mono text-xs tracking-widest uppercase hover:border-primary hover:text-primary transition-colors"
              >
                Initiate Transmission
              </button>
            </motion.div>
          </div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 1 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              <img
                src={heroImage}
                alt="Abstract geometric data blocks representing scalable data architecture"
                className="w-full animate-assemble"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </div>
            {/* Overlay metadata */}
            <div className="absolute bottom-4 left-4 font-mono text-[9px] text-muted-foreground/60 tracking-wider">
              SYS.TOPOLOGY // RENDER.v3.2
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
