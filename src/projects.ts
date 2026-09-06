export type Project = {
  id: string;
  name: string;
  category: "Products" | "AI & tools";
  discipline: string;
  summary: string;
  image: string;
  alt: string;
  stack: string[];
  repository: string;
  problem: string;
  approach: string;
  detail: string;
  live?: string;
};

// Public project READMEs, architecture docs and committed screenshots, reviewed September 2026.
export const projects: Project[] = [
  {
    id: "expenso",
    name: "Expenso",
    category: "Products",
    discipline: "Full-stack product",
    summary: "Everyday expenses. Shared, split, settled.",
    image: "/images/expenso.webp",
    alt: "Expenso dashboard showing expenses, recent transactions, and group balances using the repository demonstration account.",
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    repository: "https://github.com/Yuvrajg2107/Expensoo",
    problem:
      "Personal spending and shared expenses belong in one place. The difficult part is keeping balances and settlements consistent as people add, split, and repay expenses.",
    approach:
      "A responsive expense tracker with personal ledgers, group expenses, and UPI settlement flows. Typed API contracts connect the interface to server-side services and transactional database operations.",
    detail:
      "The repository includes browser journeys, accessibility checks, and fixes for authentication, payment handoffs, and dashboard hydration. The preview is an actual committed test screenshot.",
  },
  {
    id: "tessera",
    name: "Tessera",
    category: "AI & tools",
    discipline: "Local-first desktop AI",
    summary: "From source code to a clearer testing plan.",
    image: "/images/tessera.webp",
    alt: "The Tessera project logo, a blue geometric mosaic.",
    stack: ["Rust", "Tauri", "React", "Ollama"],
    repository: "https://github.com/Yuvrajg2107/Tessera",
    live: "https://tesseraide.vercel.app/",
    problem:
      "Understanding a codebase and writing useful QA documents takes context. A single file rarely tells the whole story, and uploading private code is not always an option.",
    approach:
      "A desktop IDE that combines Tree-sitter parsing, retrieval over a local index, and schema-validated AI output to produce reviewable test plans, cases, and defect reports.",
    detail:
      "The default Ollama setup keeps source local. Optional cloud providers are explicit choices. The project also includes opt-in sandboxed test execution and component interaction tests.",
  },
  {
    id: "detector",
    name: "AI Content Detector",
    category: "AI & tools",
    discipline: "Applied machine learning",
    summary: "Looking beyond a single model’s verdict.",
    image: "/images/detector.webp",
    alt: "AI Content Detector interface with text, code, image, video, and document analysis modes.",
    stack: ["Python", "PyTorch", "FastAPI", "React"],
    repository: "https://github.com/Yuvrajg2107/ai-content-detector",
    problem:
      "AI-generated content takes many forms. Text, imagery, and video need different signals, and language-specific patterns matter.",
    approach:
      "A multimodal analysis interface combining transformer outputs with statistical features. English and Marathi text have separate pipelines, alongside image, video, code, and document analysis.",
    detail:
      "The interface exposes model breakdowns and exports reports. Detection scores are probabilistic signals; they are not proof of authorship. This is a team project documented in the repository.",
  },
];

export const otherWork = [
  {
    name: "Railway operations",
    type: "Workflow automation",
    text: "B-Form and Terminal Position Sheet workflows during industrial training at DRM Office, Solapur.",
    url: "https://github.com/Yuvrajg2107/railways-bform",
  },
  {
    name: "GPS College",
    type: "Web & mobile",
    text: "Role-based access to academic records, attendance, notices, and student services.",
    url: "https://github.com/Yuvrajg2107/GPSolapur-App",
  },
  {
    name: "MSBTE Results",
    type: "Desktop tooling",
    text: "A desktop workflow for collecting academic results, exploring records, and exporting reports.",
    url: "https://github.com/Yuvrajg2107/msbte-result-scraper",
  },
];
