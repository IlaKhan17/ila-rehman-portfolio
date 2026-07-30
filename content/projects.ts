import type { Project } from "./types";

/**
 * Every claim here is traceable to the repositories or the résumé.
 * Nothing is inflated — recruiters open the code.
 *
 * TODO(ila): confirm the two live URLs below before launch.
 */

export const projects: Project[] = [
  {
    slug: "davis",
    name: "Davis",
    blurb: "Multi-agent AI sales development representative",
    featured: true,
    year: "2026",
    problem:
      "Outbound sales is hours of manual research per prospect — finding the right people, reading their posts, working out what they actually care about, then writing an email that does not sound automated. Most tooling automates the sending and skips the thinking.",
    built:
      "An end-to-end pipeline of cooperating agents. It discovers prospects matching an ideal customer profile, researches each one across LinkedIn, Reddit and the open web, drafts a genuinely personalised email from what it found, tracks replies and their sentiment, then joins the meeting it booked — transcribing it and extracting action items into a searchable knowledge base.",
    architecture: [
      "Next.js 16 · dashboard, prospects, email editor, meeting viewer",
      "        ↓",
      "FastAPI · orchestration, auth, knowledge base",
      "  ├── LangGraph  multi-stage outreach workflow",
      "  ├── Groq       LLM inference",
      "  ├── Pinecone   vector memory + semantic recall",
      "  └── research microservice (Docker) · Playwright scraping, Redis cache",
      "        ↓",
      "Supabase (PostgreSQL) · Redis · Railway + Vercel",
    ],
    highlights: [
      "Prospect discovery that matches an ICP across multiple platforms, not a single scraped list.",
      "Research agent isolated as its own containerised service with its own cache and driver layer, so scraping failures cannot take down the API.",
      "Multi-stage LangGraph workflow turns raw research into personalised outreach rather than one prompt doing everything.",
      "Reply tracking with sentiment analysis, feeding automatic follow-up generation.",
      "Meeting intelligence: bots join calls, transcribe, extract action items, and index them into a vector-backed knowledge base.",
    ],
    decisions: [
      {
        choice: "Split the scraper into a separate containerised microservice",
        insteadOf: "Running Playwright inside the main FastAPI process",
        because:
          "Browser automation is memory-heavy and fails often. Isolating it means a hung browser or a blocked scrape degrades one capability instead of crashing the API serving every other request — and it can be scaled or restarted on its own.",
      },
      {
        choice: "LangGraph for the outreach workflow",
        insteadOf: "A single large prompt, or ad-hoc chained calls",
        because:
          "Personalised outreach is genuinely multi-stage — research, then signal extraction, then drafting. An explicit graph makes each stage inspectable and independently fixable, which matters when output quality is the product.",
      },
      {
        choice: "Groq for inference",
        insteadOf: "A frontier model on every call",
        because:
          "The pipeline makes many calls per prospect. Latency and cost per prospect are the binding constraints on whether the system is usable at all, and most stages do not need frontier-level reasoning.",
      },
    ],
    tech: [
      "Next.js 16",
      "TypeScript",
      "FastAPI",
      "LangChain",
      "LangGraph",
      "Groq",
      "Pinecone",
      "Supabase",
      "Redis",
      "Docker",
      "Playwright",
      "Tailwind",
      "shadcn/ui",
    ],
    links: [
      {
        label: "Live demo",
        href: "https://ai-sales-development-representative-theta.vercel.app",
        kind: "demo",
      },
      {
        label: "Source",
        href: "https://github.com/IlaKhan17/AI-Sales-Development-Representative",
        kind: "source",
      },
    ],
  },
  {
    slug: "adaptquiz",
    name: "AdaptQuiz API",
    blurb: "RAG quiz generation with LLM-as-judge grading",
    featured: true,
    year: "2026",
    problem:
      "Studying from a document is passive. Turning it into practice questions is the part that actually builds recall — and it is the part nobody has time for. Auto-generated questions usually hallucinate content that was never in the source, and grading a free-text answer by string-matching marks a correct answer wrong because the wording differed.",
    built:
      "A production REST API that ingests a PDF or text file and turns it into an adaptive quiz session grounded entirely in that document. It generates questions, grades free-text answers against a three-criterion rubric with partial credit, tags the specific knowledge gaps behind each wrong answer, and aggregates a session into a report with a grade and a targeted study recommendation.",
    architecture: [
      "POST /ingest    pypdf → 800-char chunks (100 overlap)",
      "                → all-MiniLM-L6-v2 (384-dim) → FAISS",
      "POST /quiz      retrieve by document ID → GPT-4o",
      "                → structured JSON questions",
      "POST /eval      GPT-4o as judge → 3-criterion rubric",
      "                → partial credit + knowledge-gap tags",
      "GET  /report    aggregate → grade + ranked gaps",
      "",
      "FastAPI · Pydantic v2 · Docker · React/Vite frontend",
    ],
    highlights: [
      "Every question is grounded in retrieved source chunks, so the model cannot invent material the document never contained.",
      "Retrieval is scoped by document ID rather than top-k similarity — full coverage of the source regardless of how large the index grows.",
      "Local sentence-transformer embeddings: zero embedding-API cost, and the pipeline runs offline.",
      "Rubric grading across accuracy, completeness and terminology, with partial credit and per-criterion feedback.",
      "Knowledge-gap tags aggregate across a session into ranked weak areas and a study recommendation.",
      "Six documented REST endpoints with auto-generated OpenAPI docs and Pydantic v2 validation.",
    ],
    decisions: [
      {
        choice: "Local all-MiniLM-L6-v2 embeddings",
        insteadOf: "A hosted embeddings API",
        because:
          "Ingestion embeds every chunk of every uploaded document — the highest-volume operation in the system. Running a small model on CPU takes embedding cost to zero and removes a network dependency from the slowest path, at a quality level that is more than sufficient for retrieving within a single document.",
      },
      {
        choice: "Retrieve all chunks for a document ID",
        insteadOf: "Top-k nearest-neighbour search",
        because:
          "Top-k answers 'what is most similar to this query'. Quiz generation needs 'cover this whole document'. With similarity search, a quiz would silently over-sample whatever the query happened to resemble and never ask about the rest of the material.",
      },
      {
        choice: "LLM-as-judge with an explicit rubric",
        insteadOf: "String or keyword matching against a reference answer",
        because:
          "A student can be right in words the reference never used, or half-right in a way that deserves partial credit. A rubric across accuracy, completeness and terminology produces a defensible score plus the diagnostic feedback that makes the grade useful — the same technique used in reward modelling and model evaluation.",
      },
      {
        choice: "Structured outputs with an enforced JSON schema",
        insteadOf: "Parsing prose responses",
        because:
          "Every generation and grading call feeds directly into typed application code. JSON mode with an explicit schema plus Pydantic validation means a malformed response fails loudly at the boundary instead of corrupting a quiz halfway through a session.",
      },
    ],
    tech: [
      "Python",
      "FastAPI",
      "LangChain",
      "FAISS",
      "GPT-4o",
      "sentence-transformers",
      "Pydantic v2",
      "SQLAlchemy",
      "Docker",
      "React",
      "Vite",
      "TypeScript",
    ],
    links: [
      // TODO(ila): confirm the canonical HTTPS URL, and make it agree with the résumé.
      { label: "Live demo", href: "https://adaptquiz.ilarehman.com", kind: "demo" },
      {
        label: "Source",
        href: "https://github.com/IlaKhan17/adaptquiz-api",
        kind: "source",
      },
    ],
  },
  {
    slug: "focus-flow",
    name: "Focus Flow",
    blurb: "Full-stack deep-work assistant",
    featured: false,
    year: "2026",
    problem:
      "A vague task is the reason deep work never starts. 'Write the report' has no obvious first move, so the session gets postponed.",
    built:
      "A full-stack productivity app that breaks a vague task into concrete steps with rough time estimates, then tracks focus sessions against them and reports on recent focus time.",
    architecture: [
      "Next.js + TypeScript frontend",
      "        ↓",
      "FastAPI · task breakdown, sessions, stats",
      "        ↓",
      "SQLModel + SQLite",
    ],
    highlights: [
      "REST endpoints for task decomposition, focus-session tracking and usage statistics.",
      "SQLModel over SQLite — typed models shared between the ORM layer and request validation.",
    ],
    decisions: [
      {
        choice: "SQLModel over SQLite",
        insteadOf: "Separate SQLAlchemy models and Pydantic schemas",
        because:
          "At this size, one set of typed models serving both persistence and validation removed a whole class of drift between the database and the API contract.",
      },
    ],
    tech: [
      "Python",
      "FastAPI",
      "SQLModel",
      "SQLite",
      "Next.js",
      "TypeScript",
    ],
    links: [
      {
        label: "Source",
        href: "https://github.com/IlaKhan17/Focus-flow",
        kind: "source",
      },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
