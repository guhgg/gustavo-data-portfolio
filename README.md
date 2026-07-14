# Gustavo Anjos Souza — Data Platform Portfolio

Personal portfolio website showcasing data platform engineering projects built across iFood, MadeiraMadeira, and McGraw Hill.

## Projects

- **ML Feature Store Platform** (iFood) — Company-wide feature store serving 17+ ML squads, 200+ concurrent Spark jobs, petabytes processed daily, online serving at <20ms p99
- **Scalable Airflow on ECS Fargate** (MadeiraMadeira) — Re-architected Airflow from a single EC2 to isolated ECS Fargate containers, 60%+ cost reduction, YAML-driven DAG factory cutting pipeline creation from 7 days to 3
- **CDC Streaming Pipeline** (MadeiraMadeira) — Real-time change data capture from MySQL, PostgreSQL, and MongoDB into a unified S3 data lake using Debezium, Kafka, and Apache Hudi
- **Cluster Autopilot** (McGraw Hill) — Automated Databricks cluster optimization system saving 30%+ costs across 300+ jobs
- **Spark Performance Agent** (McGraw Hill) — AI-powered weekly analysis agent that identifies the worst-performing Spark jobs and delivers code-level optimization reports via LLM

## Tech Stack

React 18 · Vite · Tailwind CSS · Framer Motion · React Router

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Building for production

```bash
npm run build
```

Output goes to `dist/` — deploy to Netlify, Vercel, or GitHub Pages.

## Deployment

Hosted on Netlify with automatic deploys on push to `main`.
