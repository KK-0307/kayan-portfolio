// Matches the basePath baked in at build time (see next.config.ts) so client-side
// asset fetches (e.g. the portrait canvas) resolve correctly under GitHub Pages.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const profile = {
  name: "Kayan",
  handle: "kayan@portfolio",
  roles: ["Software Engineer.", "Technical Program Manager.", "Research Fellow."],
  bio: "I build intelligent systems that bridge research and real-world impact.",
  currentFocus: [
    "AI & Machine Learning",
    "Distributed Systems",
    "Healthcare Technology",
    "Autonomous Systems",
    "Education & Mentorship",
  ],
  // Drop your photo at public/portrait.jpg (or .png) to match this filename.
  portraitSrc: "/portrait.jpg",
  tagline: "First, solve the problem. Then, write the code.",
};

export type NavItem = {
  number: string;
  label: string;
  subtitle: string;
  // "scroll" jumps to a matching section id; "modal" opens a NavModals popup keyed by `target`.
  kind: "scroll" | "modal";
  target: string;
};

export const navigation: NavItem[] = [
  { number: "01", label: "home", subtitle: "whoami", kind: "scroll", target: "home" },
  { number: "02", label: "projects", subtitle: "things I've built", kind: "scroll", target: "projects" },
  { number: "03", label: "experience", subtitle: "work I've done", kind: "modal", target: "experience" },
  { number: "04", label: "teaching", subtitle: "mentoring & TA", kind: "modal", target: "teaching" },
  { number: "05", label: "contact", subtitle: "let's connect", kind: "modal", target: "contact" },
];

export const nowPlaying = {
  track: "lofi hip hop radio",
  source: "youtube",
  // Played via YouTube's official embeddable IFrame Player (hidden, audio-only
  // in the UI). Swap this for any other YouTube video id you'd like on loop.
  youtubeVideoId: "n61ULEU7CO0",
};

export const status = {
  location: "Philadelphia, PA",
  timezone: "EDT (UTC-4)",
  availability: "Open to Opportunities",
  focus: "Building impact through code and research",
  currently: "Technical Program Manager, Penn Engineering",
};

export const skills = [
  { name: "Python", level: 95 },
  { name: "C++", level: 90 },
  { name: "Machine Learning", level: 95 },
  { name: "Distributed Systems", level: 85 },
  { name: "SQL / Databases", level: 90 },
  { name: "Cloud (AWS)", level: 85 },
  { name: "Linux", level: 92 },
];

export const techStack = [
  "Python",
  "PyTorch",
  "Docker",
  "AWS",
  "PostgreSQL",
  "FastAPI",
  "Kafka",
  "Redis",
  "Linux",
  "Git",
];

export type ProjectStatus = "Completed" | "In Progress";

export const projects: {
  number: string;
  title: string;
  description: string;
  tags: string[];
  status: ProjectStatus;
  // Projects with a public repo link to it instead of showing the "available upon request" note.
  githubUrl?: string;
  liveUrl?: string;
}[] = [
  {
    number: "01",
    title: "Neural Debugger",
    description:
      "Full-stack RAG debugging assistant: paste a Python, PyTorch or FastAPI error and get a diagnosis grounded in the official docs, with every claim cited and checked against its source, and a refusal when the docs can't support an answer (12 of 12 out-of-scope questions declined). Hybrid BM25 + dense retrieval (NDCG@10 0.55 → 0.68 on dev); a from-scratch transformer encoder was built, evaluated and reported as a negative result. FastAPI + Next.js, deployed on Render.",
    tags: ["PyTorch", "FastAPI", "Next.js", "RAG"],
    status: "Completed",
    githubUrl: "https://github.com/KK-0307/neural-debugger",
    liveUrl: "https://neural-debugger.onrender.com",
  },
  {
    number: "02",
    title: "Payment Ledger",
    description:
      "Payment backend in Go and PostgreSQL that stays correct when the processor, network or database fails mid-request: Stripe-style idempotency, a double-entry ledger with invariants enforced by PostgreSQL, and a fault-injection benchmark. The same faults without idempotency double-charged 817 of 20,000 payments per run; with it, zero.",
    tags: ["Go", "PostgreSQL", "Stripe", "Fault Injection"],
    status: "Completed",
    githubUrl: "https://github.com/KK-0307/payment-ledger",
  },
  {
    number: "03",
    title: "Telemetry Lakehouse",
    description:
      "Integrity-gated streaming-to-Parquet pipeline: simulated device telemetry is validated, written as immutable partitioned Parquet, and published in a single SQLite transaction. DuckDB runs the analytics and independently verifies 18 invariants; crash recovery is tested with real process kills.",
    tags: ["Python", "DuckDB", "Parquet", "SQLite"],
    status: "Completed",
    githubUrl: "https://github.com/KK-0307/telemetry-lakehouse",
  },
  {
    number: "04",
    title: "Catalyst Scenario Research System",
    description:
      "Event-driven equity research platform for semiconductor catalysts: point-in-time event studies over 738 earnings and 8-K events, probabilistic bull/base/bear scenarios, options-implied move analysis, and hash-chained forecast snapshots scored for calibration, with a Streamlit dashboard. The prospective forecast record is still accumulating.",
    tags: ["Python", "Streamlit", "SQLite", "Parquet"],
    status: "In Progress",
  },
  {
    number: "05",
    title: "Grafluence",
    description:
      "Graph-based recommendation engine modeling 38K influencers and 1.6M relationships, using multimodal embeddings (FashionCLIP, SocBERT) served through FastAPI microservices on AWS Lambda/EC2 with sub-500ms latency.",
    tags: ["Python", "FastAPI", "PostgreSQL", "AWS"],
    status: "Completed",
  },
  {
    number: "06",
    title: "PennOS",
    description:
      "A custom Unix-like operating system built from scratch — priority-based process scheduler, a FAT-based file system, and a shell with job control and built-in commands.",
    tags: ["C", "Operating Systems", "Scheduling", "Filesystems"],
    status: "Completed",
  },
  {
    number: "07",
    title: "RISC-V CPU Design",
    description:
      "A RISC-V CPU built incrementally in SystemVerilog — from a single-cycle datapath through multicycle and fully pipelined designs with caching, plus custom divider and carry-lookahead adder modules.",
    tags: ["SystemVerilog", "RISC-V", "Computer Architecture"],
    status: "Completed",
  },
  {
    number: "08",
    title: "NS-3 Routing Protocols Simulation",
    description:
      "Simulates Distance Vector and Link State routing protocols alongside a Chord DHT and PennSearch distributed search layer across custom network topologies for protocol performance analysis.",
    tags: ["C++", "NS-3", "Distributed Systems", "DHT"],
    status: "Completed",
  },
  {
    number: "09",
    title: "IvyGraph: Reddit Sentiment & Graph Analysis",
    description:
      "Analyzes sentiment and interaction dynamics across Ivy League subreddits by scraping and graphing the top 1000 posts from each, comparing Penn's community engagement to peer schools.",
    tags: ["Python", "PRAW", "NLTK", "NetworkX"],
    status: "Completed",
  },
  {
    number: "10",
    title: "RecipEasy",
    description:
      "A meal-planning web app for college students offering personalized recipe recommendations based on available ingredients, time constraints, and dietary preferences.",
    tags: ["React", "Node.js", "MySQL", "AWS"],
    status: "Completed",
  },
  {
    number: "11",
    title: "PokemonMap Builder",
    description:
      "An interactive web tool for building custom Pokémon-style maps — place terrain tiles, move a character sprite, and design your own explorable world.",
    tags: ["JavaScript", "HTML5", "CSS", "Node.js"],
    status: "Completed",
  },
  {
    number: "12",
    title: "pizza-validator",
    description:
      "A lightweight TypeScript npm package (with CLI) that validates pizza objects — size, crust type, toppings — and returns detailed error messages for invalid input.",
    tags: ["TypeScript", "npm", "CLI"],
    status: "Completed",
  },
];

export const projectNote = "Codebase available upon request.";

export const experience = [
  {
    role: "Technical Program Manager, Engineering Operations",
    org: "University of Pennsylvania School of Engineering & Applied Sciences",
    location: "Philadelphia, PA",
    dates: "Sep 2025 – Present",
    bullets: [
      "Developed internal tooling (Python, SQL, Apps Script, REST APIs, Slack API, Google Workspace APIs) to automate program operations, reducing manual workflows by 70%.",
      "Architected ETL pipelines and BI dashboards (Looker Studio, Tableau, Power BI) for real-time operational analytics and executive KPI reporting.",
      "Built scalable workflow orchestration for onboarding, approvals, and resource allocation across 10+ concurrent engineering programs.",
      "Led cross-functional delivery across 15+ engineering, research, and academic teams.",
    ],
  },
  {
    role: "Machine Learning Research Fellow",
    org: "Hospital of the University of Pennsylvania",
    location: "Philadelphia, PA",
    dates: "Aug 2025 – Feb 2026",
    bullets: [
      "Built GPU-enabled preprocessing pipelines for 2TB+ of whole-slide pathology images (Python, OpenSlide, PyTorch), cutting data prep time by 50%.",
      "Automated multimodal data ingestion and validation, reducing manual preprocessing by 60%.",
      "Developed tooling supporting transformer-based pathology models, integrating histology images with clinical metadata.",
      "Benchmarked computer vision models with clinicians and ML researchers, accelerating experiment turnaround by 30%.",
    ],
  },
  {
    role: "Software Engineer Intern",
    org: "Tabby (Fintech Startup)",
    location: "Dubai, UAE",
    dates: "May 2024 – Aug 2024",
    bullets: [
      "Built high-throughput Go microservices and gRPC/REST APIs for BNPL payment processing, cutting inter-service latency by 25%.",
      "Built FastAPI/PostgreSQL services for real-time fraud detection and LLM-assisted tooling that raised automated test coverage to 92%.",
      "Deployed containerized microservices on AWS EKS with Terraform and Jenkins CI/CD, maintaining 99.99% uptime through 5x traffic spikes.",
      "Implemented OAuth 2.0, JWT, and PSD2-compliant auth flows, supporting SOC 2 compliance.",
    ],
  },
  {
    role: "Software Engineer Intern",
    org: "Abu Dhabi Investment Authority (ADIA)",
    location: "Abu Dhabi, UAE",
    dates: "May 2023 – Aug 2023",
    bullets: [
      "Built fault-tolerant streaming pipelines (Kafka, Spark) for real-time market data, increasing ETL throughput by 40%.",
      "Optimized low-latency C++/Python trading systems using OpenMP and cache-aware data structures, cutting execution latency by 20%.",
      "Accelerated CUDA-based Monte Carlo pricing simulations, reducing computation time by 50%.",
      "Built SQL analytics dashboards, eliminating 10+ hours/week of manual reporting.",
    ],
  },
];

export const teaching = [
  { course: "CIS 3200", title: "Advanced Algorithms & Discrete Mathematics", dates: "Jan 2024 – May 2025" },
  { course: "NETS 4200", title: "Algorithmic Game Theory", dates: "Jan 2025 – May 2025" },
  { course: "ESE 4500 & ESE 4510", title: "Senior Design", dates: "Aug 2025 – May 2026" },
];

export const contact = {
  email: "kayan@alumni.upenn.edu",
  linkedin: "https://www.linkedin.com/in/kayan-mohamed/",
};
