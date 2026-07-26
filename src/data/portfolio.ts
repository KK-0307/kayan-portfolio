// Matches the basePath baked in at build time (see next.config.ts) so client-side
// asset fetches (e.g. the ASCII portrait canvas) resolve correctly under GitHub Pages.
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

export const navigation = [
  { number: "01", label: "home", subtitle: "whoami", href: "#home" },
  { number: "02", label: "projects", subtitle: "things I've built", href: "#projects" },
  { number: "03", label: "experience", subtitle: "work I've done", href: "#experience" },
  { number: "04", label: "teaching", subtitle: "mentoring & TA", href: "#teaching" },
  { number: "05", label: "photography", subtitle: "visual diary", href: "#photography" },
  { number: "06", label: "contact", subtitle: "let's connect", href: "#contact" },
];

export const nowPlaying = {
  track: "lofi hip hop radio",
  source: "playlist",
  // Public SomaFM "Groove Salad" stream — swap this for your own lofi playlist/stream URL.
  streamUrl: "https://ice1.somafm.com/groovesalad-128-mp3",
};

export const status = {
  location: "Philadelphia, PA",
  timezone: "EDT (UTC-4)",
  availability: "Open to Opportunities",
  focus: "Building impact through code and research",
  currently: "HUP ML Research Fellow, Penn Engineering",
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
}[] = [
  {
    number: "01",
    title: "Lymph Node Metastasis Prediction",
    description:
      "MIL framework for predicting lymph node metastasis from H&E whole slide images, trained on gigapixel pathology scans.",
    tags: ["Python", "PyTorch", "OpenSlide", "MIL"],
    status: "Completed",
  },
  {
    number: "02",
    title: "AI Portfolio Terminal Website",
    description:
      "This site — a terminal-inspired portfolio built with Next.js, styled as a retro hacker aesthetic with live data panels.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    status: "In Progress",
  },
  {
    number: "03",
    title: "Real-Time Fraud Detection Pipeline",
    description:
      "Built a real-time fraud detection pipeline serving millions of users across MENA with sub-second scoring latency.",
    tags: ["Go", "Python", "Kubernetes", "PostgreSQL"],
    status: "Completed",
  },
  {
    number: "04",
    title: "Distributed Systems Shell / PennOS",
    description:
      "A Unix-like OS kernel and shell built from scratch, implementing custom scheduling, a FAT-based filesystem, and process management.",
    tags: ["C", "Systems", "Scheduling", "Filesystems"],
    status: "Completed",
  },
  {
    number: "05",
    title: "Healthcare Research Dashboard",
    description:
      "Internal dashboard for research fellows to track cohort statistics and model performance across clinical datasets.",
    tags: ["Python", "FastAPI", "React", "PostgreSQL"],
    status: "In Progress",
  },
  {
    number: "06",
    title: "Autonomous Systems Data Platform",
    description:
      "Perception and localization data pipeline for autonomous delivery robots, handling sensor logs at fleet scale.",
    tags: ["C++", "ROS2", "Python", "AWS"],
    status: "Completed",
  },
];

export const projectNote = "Codebase available upon request.";
