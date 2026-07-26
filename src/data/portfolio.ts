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

// Overrides the generic projectNote below when a project has a different
// access story (e.g. group coursework under academic integrity rules).
const ACADEMIC_NOTE =
  "Group coursework project — codebase isn't shared publicly per academic integrity policy, but happy to walk through the design and implementation.";

export const projects: {
  number: string;
  title: string;
  description: string;
  tags: string[];
  status: ProjectStatus;
  note?: string;
}[] = [
  {
    number: "01",
    title: "Grafluence",
    description:
      "Graph-based recommendation engine modeling 38K influencers and 1.6M relationships, using multimodal embeddings (FashionCLIP, SocBERT) served through FastAPI microservices on AWS Lambda/EC2 with sub-500ms latency.",
    tags: ["Python", "FastAPI", "PostgreSQL", "AWS"],
    status: "Completed",
    note: ACADEMIC_NOTE,
  },
  {
    number: "02",
    title: "PennOS",
    description:
      "A custom Unix-like operating system built from scratch — priority-based process scheduler, a FAT-based file system, and a shell with job control and built-in commands.",
    tags: ["C", "Operating Systems", "Scheduling", "Filesystems"],
    status: "Completed",
    note: ACADEMIC_NOTE,
  },
  {
    number: "03",
    title: "RISC-V CPU Design",
    description:
      "A RISC-V CPU built incrementally in SystemVerilog — from a single-cycle datapath through multicycle and fully pipelined designs with caching, plus custom divider and carry-lookahead adder modules.",
    tags: ["SystemVerilog", "RISC-V", "Computer Architecture"],
    status: "Completed",
    note: ACADEMIC_NOTE,
  },
  {
    number: "04",
    title: "NS-3 Routing Protocols Simulation",
    description:
      "Simulates Distance Vector and Link State routing protocols alongside a Chord DHT and PennSearch distributed search layer across custom network topologies for protocol performance analysis.",
    tags: ["C++", "NS-3", "Distributed Systems", "DHT"],
    status: "Completed",
    note: ACADEMIC_NOTE,
  },
  {
    number: "05",
    title: "IvyGraph: Reddit Sentiment & Graph Analysis",
    description:
      "Analyzes sentiment and interaction dynamics across Ivy League subreddits by scraping and graphing the top 1000 posts from each, comparing Penn's community engagement to peer schools.",
    tags: ["Python", "PRAW", "NLTK", "NetworkX"],
    status: "Completed",
    note: ACADEMIC_NOTE,
  },
  {
    number: "06",
    title: "RecipEasy",
    description:
      "A meal-planning web app for college students offering personalized recipe recommendations based on available ingredients, time constraints, and dietary preferences.",
    tags: ["React", "Node.js", "MySQL", "AWS"],
    status: "Completed",
    note: ACADEMIC_NOTE,
  },
  {
    number: "07",
    title: "PokemonMap Builder",
    description:
      "An interactive web tool for building custom Pokémon-style maps — place terrain tiles, move a character sprite, and design your own explorable world.",
    tags: ["JavaScript", "HTML5", "CSS", "Node.js"],
    status: "Completed",
  },
  {
    number: "08",
    title: "pizza-validator",
    description:
      "A lightweight TypeScript npm package (with CLI) that validates pizza objects — size, crust type, toppings — and returns detailed error messages for invalid input.",
    tags: ["TypeScript", "npm", "CLI"],
    status: "Completed",
  },
];

export const projectNote = "Codebase available upon request.";
