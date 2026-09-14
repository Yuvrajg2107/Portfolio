import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import {
  ArrowDownRightIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  XIcon,
  PlusIcon,
  MinusIcon,
  ArrowCounterClockwiseIcon,
} from "@phosphor-icons/react";
import { projects } from "./projects";
import type { Project } from "./projects";

const ease = [0.22, 1, 0.36, 1] as const;
const resume = "/documents/yuvraj-gandhmal-resume.pdf";
const email = "yuvrajgandhmal@gmail.com";

function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, ease }}
    >
      {children}
    </motion.div>
  );
}

function Intro({ onComplete }: { onComplete: () => void }) {
  const [word, setWord] = useState(0);
  const skip = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    skip.current?.focus({ preventScroll: true });
    const timers = [
      setTimeout(() => setWord(1), 650),
      setTimeout(() => setWord(2), 1250),
      setTimeout(onComplete, 2350),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);
  return (
    <motion.div
      className="intro"
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio introduction"
      initial={{ opacity: 1 }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.8, ease }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onComplete();
        if (e.key === "Tab") {
          e.preventDefault();
          skip.current?.focus();
        }
      }}
    >
      <div className="intro-brand">
        Yuvraj Gandhmal<span>Software engineer & builder</span>
      </div>
      <div className="intro-type" aria-hidden="true">
        <AnimatePresence mode="wait">
          <motion.span
            key={word}
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            exit={{ y: "-110%" }}
            transition={{ duration: 0.35, ease }}
          >
            {["Understand.", "Build.", "Ship."][word]}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="intro-line">
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2.2, ease: "linear" }}
        />
      </div>
      <button ref={skip} className="intro-skip text-link" onClick={onComplete}>
        Skip introduction <ArrowRightIcon size={18} />
      </button>
    </motion.div>
  );
}

function HeroArt({ ready, paused }: { ready: boolean; paused: boolean }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const rotateY = useSpring(useTransform(x, [-1, 1], [-6, 6]), {
    stiffness: 70,
    damping: 25,
  });
  const rotateX = useSpring(useTransform(y, [-1, 1], [5, -5]), {
    stiffness: 70,
    damping: 25,
  });
  return (
    <div
      className="hero-art"
      onPointerMove={(e) => {
        if (reduced || paused || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set(((e.clientX - r.left) / r.width) * 2 - 1);
        y.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.div
        className="sculpture"
        style={reduced || paused ? undefined : { rotateX, rotateY }}
      >
        <img
          src="/images/sculpture.webp"
          alt="An original sculptural Y assembled from folded silver metal, with a small orange joint."
          width="1254"
          height="1254"
          fetchPriority="high"
        />
        {!reduced && (
          <div className="art-shutters" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                initial={{ scaleY: 1 }}
                animate={{ scaleY: ready ? 0 : 1 }}
                transition={{ duration: 1.1, delay: i * 0.13, ease }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

function ProjectDialog({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (!project) return;
    const dialog = ref.current!;
    const previous = document.activeElement as HTMLElement | null;
    dialog.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      previous?.focus({ preventScroll: true });
    };
  }, [project]);
  return (
    <dialog
      ref={ref}
      className="project-dialog"
      aria-labelledby="project-title"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {project && (
        <div className="dialog-inner">
          <div className="dialog-top">
            <span className="mono">{project.discipline}</span>
            <button
              autoFocus
              className="icon-button"
              onClick={onClose}
              aria-label="Close project details"
            >
              <XIcon size={24} />
            </button>
          </div>
          <h2 id="project-title">{project.name}</h2>
          <p className="dialog-summary">{project.summary}</p>
          <div className="dialog-gallery">
            {(
              project.gallery ?? [{ src: project.image, caption: project.alt }]
            ).map((shot) => (
              <figure key={shot.src}>
                <a
                  href={shot.src}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={"Open full image: " + shot.caption}
                >
                  <img src={shot.src} alt={shot.caption} loading="lazy" />
                </a>
                <figcaption>{shot.caption}</figcaption>
              </figure>
            ))}
          </div>
          <div className="dialog-copy">
            <div>
              <h3>The problem</h3>
              <p>{project.problem}</p>
            </div>
            <div>
              <h3>The approach</h3>
              <p>{project.approach}</p>
            </div>
            <div>
              <h3>Under the surface</h3>
              <p>{project.detail}</p>
            </div>
          </div>
          <div className="dialog-links">
            {project.repository && (
              <a
                className="button"
                href={project.repository}
                target="_blank"
                rel="noreferrer"
              >
                Explore repository <GithubLogoIcon size={20} />
              </a>
            )}
            {project.live && (
              <a
                className="text-link"
                href={project.live}
                target="_blank"
                rel="noreferrer"
              >
                Project website <ArrowUpRightIcon size={20} />
              </a>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}) {
  const [shotIndex, setShotIndex] = useState(0);
  const shots = project.gallery ?? [
    { src: project.image, caption: project.alt },
  ];
  const shot = shots[shotIndex];
  return (
    <Reveal className={`project-card ${project.id}`}>
      <button
        className={`project-visual ${project.id}`}
        onClick={() => onOpen(project)}
        aria-label={`View ${project.name} project details`}
      >
        <img
          src={shot.src}
          alt={shot.caption}
          loading="lazy"
          width={1440}
          height={900}
        />
        <span className="project-open">
          <ArrowUpRightIcon size={27} />
        </span>
      </button>
      <div
        className="preview-strip"
        role="group"
        aria-label={project.name + " screenshots"}
      >
        {shots.map((s, i) => (
          <button
            key={s.src}
            aria-label={"Preview " + s.caption}
            aria-pressed={i === shotIndex}
            onClick={() => setShotIndex(i)}
          >
            <img src={s.src} alt="" loading="lazy" width="160" height="100" />
            <span>{String(i + 1).padStart(2, "0")}</span>
          </button>
        ))}
      </div>
      <div className="project-meta">
        <span className="mono">
          0{index + 1} / {project.discipline}
        </span>
        <span className="mono">{shots.length} views</span>
      </div>
      <button className="project-title" onClick={() => onOpen(project)}>
        <h3>{project.name}</h3>
        <ArrowUpRightIcon size={26} />
      </button>
      <p>{project.summary}</p>
      <ul className="project-highlights">
        {project.highlights?.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
      <div className="stack">
        {project.stack.map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
      <button
        className="text-link case-study-link"
        onClick={() => onOpen(project)}
      >
        Read project story <ArrowRightIcon size={18} />
      </button>
    </Reveal>
  );
}

function App() {
  const reduced = useReducedMotion();
  const [intro, setIntro] = useState(() => {
    try {
      return (
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
        !sessionStorage.getItem("portfolio-intro-seen") &&
        !window.location.hash
      );
    } catch {
      return false;
    }
  });
  const [filter, setFilter] = useState("All work");
  const [selected, setSelected] = useState<Project | null>(null);
  const [paused, setPaused] = useState(false);
  const main = useRef<HTMLElement>(null);
  const completeIntro = useCallback(() => {
    setIntro(false);
    try {
      sessionStorage.setItem("portfolio-intro-seen", "1");
    } catch {
      /* The site works without storage. */
    }
  }, []);
  useEffect(() => {
    if (!intro) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
    };
  }, [intro]);
  const replay = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setIntro(true);
  };
  const visibleProjects = projects.filter(
    (p) => filter === "All work" || p.category === filter,
  );
  return (
    <>
      <AnimatePresence
        onExitComplete={() => main.current?.focus({ preventScroll: true })}
      >
        {intro && <Intro onComplete={completeIntro} />}
      </AnimatePresence>
      <div className={paused ? "site motion-paused" : "site"} inert={intro}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <header className="header page-width">
          <a className="brand" href="#top" aria-label="Yuvraj Gandhmal, home">
            <span className="brand-mark">y.</span>
            <span>
              Yuvraj
              <br />
              Gandhmal
            </span>
          </a>
          <nav aria-label="Main navigation">
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href={resume} target="_blank" rel="noreferrer">
              Résumé
            </a>
            <a href="#contact">
              Contact <ArrowUpRightIcon size={16} />
            </a>
          </nav>
        </header>
        <main id="main" ref={main} tabIndex={-1}>
          <section
            className="hero page-width"
            id="top"
            aria-labelledby="hero-title"
          >
            <div className="hero-copy">
              <motion.p
                className="eyebrow"
                initial={false}
                animate={{ opacity: intro ? 0 : 1 }}
                transition={{ delay: 0.2 }}
              >
                Software engineer & builder
              </motion.p>
              <h1 id="hero-title">
                {["Software.", "With purpose."].map((line, i) => (
                  <span className="line" key={line}>
                    <motion.span
                      initial={reduced ? false : { y: "110%" }}
                      animate={{ y: intro ? "110%" : 0 }}
                      transition={{ duration: 1, delay: 0.12 + i * 0.12, ease }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h1>
              <motion.div
                initial={false}
                animate={{ opacity: intro ? 0 : 1 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                <p className="hero-description">
                  I’m Yuvraj. I build practical products, applied AI, and tools
                  that take the busywork out.
                </p>
                <div className="hero-actions">
                  <a
                    className="button"
                    href={resume}
                    target="_blank"
                    rel="noreferrer"
                  >
                    See my résumé <ArrowUpRightIcon size={21} />
                  </a>
                  <a
                    className="text-link"
                    href={resume}
                    download="Yuvraj-Gandhmal-Resume.pdf"
                  >
                    Download résumé <ArrowDownRightIcon size={18} />
                  </a>
                </div>
                <a className="text-link work-cta" href="#work">
                  Explore my work <ArrowDownRightIcon size={18} />
                </a>
              </motion.div>
            </div>
            <HeroArt ready={!intro} paused={paused} />
          </section>
          <section
            className="work-section page-width"
            id="work"
            aria-labelledby="work-title"
          >
            <Reveal>
              <div className="section-heading">
                <h2 id="work-title">
                  Selected work<span className="accent">.</span>
                </h2>
                <span className="work-count mono">
                  ({String(projects.length).padStart(2, "0")})
                </span>
              </div>
              <div
                className="filters"
                role="group"
                aria-label="Filter projects"
              >
                {["All work", "Products", "AI & tools"].map((f) => (
                  <button
                    key={f}
                    aria-pressed={filter === f}
                    onClick={() => setFilter(f)}
                  >
                    {f}
                    {f === filter && <span className="filter-indicator" />}
                  </button>
                ))}
              </div>
            </Reveal>
            <div
              className={`projects-grid ${filter !== "All work" ? "filtered" : ""}`}
            >
              {visibleProjects.map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  index={projects.indexOf(p)}
                  onOpen={setSelected}
                />
              ))}
            </div>
            <p className="sr-only" role="status">
              {visibleProjects.length} projects shown
            </p>
          </section>
          <section
            className="about-section page-width"
            id="about"
            aria-labelledby="about-title"
          >
            <Reveal className="about-heading">
              <span className="eyebrow">The person behind the projects</span>
              <h2 id="about-title">
                Curiosity starts it.
                <br />
                Building makes it real<span className="accent">.</span>
              </h2>
            </Reveal>
            <div className="about-grid">
              <Reveal className="about-statement">
                <p>
                  I like the part where an idea has to survive the real world.
                </p>
                <div className="signature">
                  Yuvraj Gandhmal<span>Developer. Learner. Builder.</span>
                </div>
              </Reveal>
              <Reveal className="about-body">
                <p>
                  I’m a computer science student from Solapur, India, working
                  across software engineering and applied AI.
                </p>
                <p>
                  My work has taken me from railway reporting workflows to local
                  AI tooling. I’m interested in what happens after the first
                  demo: the edge cases, the people using it, and the details
                  that make it dependable.
                </p>
                <p>
                  I learn by building, breaking things, and going back to first
                  principles. Outside code, that competitive streak follows me
                  onto the football and basketball court.
                </p>
                <a
                  className="text-link"
                  href="https://www.linkedin.com/in/yuvraj-gandhmal/"
                  target="_blank"
                  rel="noreferrer"
                >
                  More about me <LinkedinLogoIcon size={20} />
                </a>
              </Reveal>
            </div>
            <Reveal className="toolkit">
              <h3>Tools follow the problem.</h3>
              <div>
                {[
                  ["Interfaces", "React, Next.js, TypeScript, Tailwind CSS"],
                  ["Systems", "Python, Node.js, Rust, PostgreSQL, SQLite"],
                  ["Applied AI", "PyTorch, scikit-learn, Ollama, Tree-sitter"],
                ].map(([name, value]) => (
                  <details key={name}>
                    <summary>
                      <span>{name}</span>
                      <PlusIcon className="plus" size={20} />
                      <MinusIcon className="minus" size={20} />
                    </summary>
                    <p>{value}</p>
                  </details>
                ))}
              </div>
            </Reveal>
          </section>
          <section
            className="contact-section page-width"
            id="contact"
            aria-labelledby="contact-title"
          >
            <Reveal>
              <p>Have a problem worth solving?</p>
              <a className="contact-heading" href={`mailto:${email}`}>
                <h2 id="contact-title">
                  Let’s build
                  <br />
                  something useful<span className="accent">.</span>
                </h2>
                <span>
                  <ArrowUpRightIcon />
                </span>
              </a>
              <a className="email-link" href={`mailto:${email}`}>
                {email}
                <ArrowUpRightIcon size={20} />
              </a>
            </Reveal>
          </section>
        </main>
        <footer className="footer page-width">
          <span>© {new Date().getFullYear()} Yuvraj Gandhmal</span>
          <div className="footer-socials">
            <a
              href="https://github.com/Yuvrajg2107"
              target="_blank"
              rel="noreferrer"
            >
              GitHub <ArrowUpRightIcon size={15} />
            </a>
            <a
              href="https://www.linkedin.com/in/yuvraj-gandhmal/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <ArrowUpRightIcon size={15} />
            </a>
          </div>
          <div className="motion-controls">
            {!reduced && (
              <button onClick={replay}>
                <ArrowCounterClockwiseIcon size={15} /> Replay intro
              </button>
            )}
            <button aria-pressed={paused} onClick={() => setPaused(!paused)}>
              {paused ? "Enable motion" : "Pause motion"}
            </button>
          </div>
        </footer>
      </div>
      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
export default App;
