export type Project = {
  id: string;
  name: string;
  category: "Products" | "AI & tools";
  discipline: string;
  summary: string;
  image: string;
  alt: string;
  stack: string[];
  repository?: string;
  gallery?: { src: string; caption: string }[];
  highlights?: string[];
  problem: string;
  approach: string;
  detail: string;
  live?: string;
};

// Public project READMEs, architecture docs and committed screenshots, reviewed September 2026.
const originalProjects: Project[] = [
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

const image = (name: string, caption: string) => ({
  src: "/images/" + name + ".webp",
  caption,
});
const aicd = originalProjects.find((p) => p.id === "detector")!;
const tessera = originalProjects.find((p) => p.id === "tessera")!;
const expenso = originalProjects.find((p) => p.id === "expenso")!;
export const projects: Project[] = [
  {
    ...aicd,
    name: "AICD",
    summary:
      "AI Content Detector — multimodal analysis, with the evidence in view.",
    highlights: [
      "English & Marathi detection",
      "Text, code, image, video & documents",
      "Model breakdowns & PDF reports",
    ],
    gallery: [
      image("detector", "Multimodal analysis workspace"),
      image("aicd-english", "English text analysis pipeline"),
      image("aicd-marathi", "Marathi language analysis"),
      image("aicd-video", "Video analysis pipeline"),
    ],
  },
  {
    ...tessera,
    image: "/images/tessera-workspace.webp",
    alt: "Tessera public project website introducing its local-first AI testing IDE.",
    highlights: [
      "Local code indexing with Tree-sitter",
      "Reviewable, versioned QA artifacts",
      "Ollama by default; cloud providers optional",
    ],
    gallery: [
      image("tessera-workspace", "Tessera · public project website"),
      image(
        "tessera-settings",
        "Interactive playground · cached demonstration",
      ),
    ],
  },
  {
    ...expenso,
    highlights: [
      "Personal ledgers & group expenses",
      "Shared splits & balance tracking",
      "UPI settlement workflows",
    ],
    gallery: [
      image("expenso", "Dashboard · repository demonstration account"),
      image(
        "expenso-ledger",
        "Personal expense ledger · demonstration account",
      ),
      image("expenso-splits", "Shared expense splits · demonstration account"),
    ],
  },
  {
    id: "msbte",
    name: "MSBTE-Scrapper",
    category: "Products",
    discipline: "Desktop automation & analytics",
    summary:
      "From scattered academic results to a searchable, exportable workspace.",
    image: "/images/msbte-start.webp",
    alt: "MSBTE Result Scraper session setup screen from the project repository.",
    stack: ["Tauri", "React", "FastAPI", "SQLite", "Playwright"],
    repository: "https://github.com/Yuvrajg2107/msbte-result-scraper",
    problem:
      "Reviewing academic results one record at a time makes it difficult to compare performance, revisit a session, or prepare a consistent report.",
    approach:
      "A desktop workflow brings session setup, concurrent result collection, live progress, and searchable result tables into one interface. A FastAPI backend stores sessions in SQLite for later review.",
    detail:
      "Excel exports include subject statistics, class classifications, pass rates, and rankings. Saved sessions can be renamed and re-exported, keeping collection and analysis connected.",
    highlights: [
      "Live collection progress",
      "Searchable results & saved sessions",
      "Excel reports with subject-level analysis",
    ],
    gallery: [
      image("msbte-start", "Configure a result collection session"),
      image("msbte-results", "Live progress and results table"),
    ],
  },
  {
    id: "railnova",
    name: "Railnova",
    category: "Products",
    discipline: "Railway operations software",
    summary:
      "A focused workspace for railway reporting and operational records.",
    image: "/images/railnova-signin.webp",
    alt: "Railnova railway operations sign-in interface captured from the local frontend.",
    stack: ["React", "TypeScript", "Express", "MySQL"],
    repository: "https://github.com/Yuvrajg2107/railways-bform",
    problem:
      "Railway reporting involves structured records, repeated data entry, and summaries that need to stay accessible across operational workflows.",
    approach:
      "Built around B-Form reporting, summaries, charts, and role-based access, the application pairs a React interface with an Express API and database-backed records.",
    detail:
      "The project includes Excel import, user management, and analytical views. Developed in the context of industrial training at the DRM Office in Solapur, it connects interface work with a practical reporting process.",
    highlights: [
      "B-Form reporting & summaries",
      "Excel import & analytical charts",
      "User management & protected access",
    ],
    gallery: [
      image("railnova-signin", "Railway operations · sign-in screen"),
      image(
        "railnova-form",
        "B-Form workspace · local preview with no operational data",
      ),
    ],
  },
  {
    id: "gps-website",
    name: "GPS Website",
    category: "Products",
    discipline: "College website",
    summary: "A public-facing introduction to Government Polytechnic Solapur.",
    image: "/images/gps-website-home.webp",
    alt: "GPS Website homepage captured from the local college website prototype.",
    stack: ["React", "Vite", "Tailwind CSS", "Glide.js"],
    problem:
      "A college website needs to introduce the institution and make campus information easy to browse for prospective students and visitors.",
    approach:
      "A React website prototype organizes the college identity, homepage carousel, welcome section, and campus-life content into a public-facing experience.",
    detail:
      "The local project uses reusable header, homepage, and footer components with Glide.js carousels. These previews show the current prototype, including placeholder copy and imagery; they do not imply an official college deployment.",
    highlights: [
      "Institutional homepage & navigation",
      "Image carousels & campus-life sections",
      "Reusable React components",
    ],
    gallery: [
      image("gps-website-home", "Homepage · website prototype"),
      image("gps-website-campus", "College introduction · website prototype"),
    ],
  },
  {
    id: "gps-app",
    name: "GPS APP",
    category: "Products",
    discipline: "College management · web & Android",
    summary:
      "Academic work, student services, and campus communication in one system.",
    image: "/images/gps-app-login.webp",
    alt: "GPS College Management application with staff, student, and parent sign-in options.",
    stack: ["React", "Capacitor", "Android", "Axios"],
    repository: "https://github.com/Yuvrajg2107/GPSolapur-App",
    problem:
      "Students, staff, parents, and office teams need different views of the same academic processes, from attendance and marks to notices and certificate requests.",
    approach:
      "Role-specific interfaces bring attendance, timetables, study materials, marks, leave applications, and administrative requests into a shared college management system.",
    detail:
      "The repository includes a React web frontend and Capacitor Android integration, with mobile push notification support. Office, HOD, staff, student, clerk, and parent roles each have dedicated workflows.",
    highlights: [
      "Six role-specific workflows",
      "Attendance, marks & timetables",
      "Notices, leave & certificate requests",
    ],
    gallery: [
      image("gps-app-login", "Staff access · web frontend"),
      image("gps-app-student", "Student access · mobile viewport"),
      image("gps-app-parent", "Parent access · mobile viewport"),
    ],
  },
];
