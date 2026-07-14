import { motion } from 'framer-motion';

export default function AboutSection({ aboutImage }) {
  return (
    <section id="about" className="relative py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-border">
        <div className="h-full w-24 bg-gradient-to-r from-transparent via-primary/40 to-transparent animate-pulse-line" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex items-baseline gap-4 mb-16">
          <span className="font-mono text-[10px] tracking-widest text-primary/60">03</span>
          <h2 className="font-heading font-800 text-3xl md:text-4xl tracking-tight">
            System Architect
          </h2>
          <div className="hidden md:block flex-1 h-px bg-border ml-4" />
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 relative"
          >
            <img
              src={aboutImage}
              alt="Industrial heat sink texture representing data processing hardware"
              className="w-full animate-assemble"
            />
            <div className="absolute bottom-3 left-3 font-mono text-[9px] text-muted-foreground/50 tracking-wider">
              IMG.TEXTURE // HARDWARE.REF
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:col-span-3"
          >
            <p className="text-lg leading-[1.6] mb-8 max-w-2xl">
              I'm <strong>Gustavo Anjos Souza</strong>, a Senior Data Platform Engineer with 8+ years
              building large-scale data systems. I specialize in streaming pipelines, ML infrastructure,
              and cloud-native platforms with a focus on performance, cost efficiency, and building tools
              other engineers rely on.
            </p>
            <p className="text-base text-muted-foreground leading-[1.6] mb-10 max-w-2xl">
              Hands-on across the stack: Scala and Spark for computation, Go for low-latency APIs,
              Kafka and Debezium for streaming and CDC, and AWS for infrastructure. I care about
              building platforms that are reliable, observable, and don't require a manual to operate.
            </p>

            {/* Metrics grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-border pt-8">
              {[
                { value: '8+', label: 'Years Experience' },
                { value: '5', label: 'Platforms Built' },
                { value: '200+', label: 'Spark Jobs Owned' },
                { value: '30%+', label: 'Cost Saved' },
              ].map(m => (
                <div key={m.label}>
                  <div className="font-heading font-800 text-3xl text-primary">
                    {m.value}
                  </div>
                  <div className="font-mono text-[10px] tracking-wider text-muted-foreground mt-2 uppercase">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Experience timeline */}
            <div className="mt-10 space-y-4">
              {[
                { period: '2025 — Present', role: 'Senior Data Platform Engineer', company: 'McGraw Hill' },
                { period: '2021 — 2025', role: 'Machine Learning Engineer', company: 'iFood' },
                { period: '2019 — 2021', role: 'Data Engineer', company: 'MadeiraMadeira' },
              ].map(exp => (
                <div key={exp.period} className="flex items-baseline gap-4">
                  <span className="font-mono text-[11px] text-muted-foreground/60 w-32 flex-shrink-0">
                    {exp.period}
                  </span>
                  <div>
                    <span className="font-heading font-600 text-sm">{exp.role}</span>
                    <span className="font-mono text-xs text-muted-foreground ml-2">@ {exp.company}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
