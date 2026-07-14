import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TECH = [
  { name: 'Apache Spark', deployments: ['Feature Store — 200+ concurrent jobs', 'CDC Pipeline — near real-time processing', 'Batch ETL — up to 4 GB per trigger'] },
  { name: 'Apache Kafka', deployments: ['Feature Store — streaming data source', 'CDC Pipeline — change event transport', 'Real-time feature inference'] },
  { name: 'Databricks', deployments: ['Feature Store — 200+ Spark jobs', 'Cluster Autopilot — 300+ jobs optimized', 'Spark Performance Agent — weekly analysis'] },
  { name: 'Delta Lake', deployments: ['Feature Store — historical time-series', 'CDC Pipeline — Hudi upsert tables', 'Autopilot — metrics storage per job'] },
  { name: 'Scala', deployments: ['Feature Store computation engine', 'CDC streaming transformations', 'MadeiraMadeira ETL pipelines'] },
  { name: 'Python', deployments: ['Feature Store SDK + control plane', 'Spark Performance Agent', 'DAG Factory — YAML to Airflow DAGs'] },
  { name: 'Go', deployments: ['Feature Store online API — <20ms p99', 'Horizontally scalable to 800 pods'] },
  { name: 'Redis', deployments: ['Feature Store — online serving <20ms p99', 'Real-time feature materialization'] },
  { name: 'AWS ECS Fargate', deployments: ['Airflow re-architecture — 60% cost reduction', 'Ephemeral per-DAG-run containers'] },
  { name: 'Apache Airflow', deployments: ['MadeiraMadeira — rebuilt on ECS Fargate', 'DAG factory — YAML-driven pipeline creation'] },
  { name: 'Debezium', deployments: ['CDC — MySQL/PostgreSQL binlog capture', 'CDC — MongoDB change streams'] },
  { name: 'Apache Hudi', deployments: ['CDC data lake — upsert + time-travel', 'Replacing nightly batch with near real-time'] },
  { name: 'Terraform', deployments: ['Airflow on ECS Fargate IaC', 'AWS infrastructure — EMR, ECS, Glue'] },
  { name: 'Kubernetes', deployments: ['Feature Store — online API HPA to 800 pods', 'Control plane — EKS deployment'] },
  { name: 'PostgreSQL', deployments: ['Feature Store control plane metadata DB', 'JSONB document model for schema flexibility'] },
  { name: 'Datadog', deployments: ['Feature Store — 12 monitors + APM', 'Spark job health tracking at scale'] },
  { name: 'AWS', deployments: ['EMR, Glue, MSK, Lambda, ECS, EKS, S3', 'Feature Store — primary cloud infrastructure'] },
  { name: 'LLM', deployments: ['Spark Performance Agent — code-level recs', 'Query plan analysis + narrative generation'] },
];

export default function TechMarquee() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="tech-stack" className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-border">
        <div className="h-full w-24 bg-gradient-to-r from-transparent via-primary/40 to-transparent animate-pulse-line" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-12">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-[10px] tracking-widest text-primary/60">02</span>
          <h2 className="font-heading font-800 text-3xl md:text-4xl tracking-tight">
            Tech Stack Monolith
          </h2>
          <div className="hidden md:block flex-1 h-px bg-border ml-4" />
          <span className="hidden md:inline font-mono text-[10px] text-muted-foreground tracking-wider">
            {TECH.length} TECHNOLOGIES
          </span>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...TECH, ...TECH].map((tech, i) => (
            <button
              key={i}
              onClick={() => setSelected(selected?.name === tech.name ? null : tech)}
              className={`flex-shrink-0 mx-3 px-5 py-3 border transition-all duration-300 ${
                selected?.name === tech.name
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground'
              }`}
            >
              <span className="font-mono text-sm tracking-wider">{tech.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Deployment panel */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-8">
              <div className="border border-primary/20 bg-primary/[0.02] p-6">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="font-mono text-[10px] text-primary/60 tracking-wider">DEPLOYMENTS</span>
                  <span className="font-heading font-700 text-lg">{selected.name}</span>
                </div>
                <div className="space-y-2">
                  {selected.deployments.map((dep, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-1 h-1 rounded-full bg-primary/40" />
                      <span className="font-mono text-sm text-muted-foreground">{dep}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
