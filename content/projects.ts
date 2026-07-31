import type { Project } from "./types";

/**
 * Every claim here is traceable to the repositories or the résumé.
 * Nothing is inflated — recruiters open the code.
 */

export const projects: Project[] = [
  {
    slug: "davis",
    name: "Davis",
    blurb: "Evidence-grounded AI sales development agent",
    featured: true,
    year: "2026",
    problem:
      "Outbound sales is hours of manual research per prospect — finding the right people, reading what they have posted, working out what they actually care about, then writing an email that does not sound automated. Most tooling automates the sending and skips the thinking. The tools that do score prospects hand you a number with nothing behind it, so nobody trusts it, and an agent that can send email on your behalf is one bad generation away from embarrassing you in front of a customer.",
    built:
      "A multi-tenant AI sales development agent that finds prospects, researches them, and drafts personalised outreach — where every prospect score cites a source URL, a snippet and an observed-at timestamp, so a human can check the evidence behind any number. Sending is approval-first: nothing leaves the system until a person approves it, and a policy guard makes duplicate sends impossible.",
    architecture: [
      "Next.js · dashboard, prospects, email editor, approvals queue",
      "        ↓",
      "FastAPI · orchestration, auth, scoring, send pipeline",
      "  ├── LangGraph   multi-stage research → signal extraction → draft",
      "  ├── Groq        LLM inference",
      "  ├── Pinecone    per-workspace namespaces, vector memory",
      "  ├── Python      deterministic ICP scorer (weighted, unit-tested)",
      "  └── Braintrust  tracing over the whole pipeline",
      "        ↓",
      "Supabase · Postgres + auth · 45 tables under RLS policies",
      "Redis · cache & queues",
      "        ↓",
      "Vercel (frontend) · Railway (backend)",
    ],
    highlights: [
      "Every prospect score cites its evidence — source URL, snippet and observed-at timestamp — so a number can always be audited back to what the agent actually saw.",
      "Scoring splits into an LLM signal-extraction stage and a deterministic Python scorer with weighted ICP criteria, so identical inputs always produce identical, unit-testable scores.",
      "Approval-first send pipeline (pending → approved → sent) with a six-rule policy guard, and a unique idempotency key that makes duplicate sends impossible.",
      "Multi-tenant isolation across organisations and workspaces, enforced by row-level-security policies over 45 Postgres tables with Supabase auth.",
      "Per-workspace Pinecone namespaces, so one tenant's vector memory can never surface in another tenant's retrieval.",
      "Braintrust tracing across the pipeline — every stage of a run is inspectable after the fact, not guessed at from logs.",
    ],
    decisions: [
      {
        choice:
          "Split scoring into LLM signal extraction plus a deterministic Python scorer",
        insteadOf: "Asking the model for the score directly",
        because:
          "A number straight out of an LLM is not reproducible, not unit-testable, and cannot be explained to the salesperson relying on it. Letting the model do only what it is good at — pulling signals out of messy text — and handing the arithmetic to weighted Python criteria means identical inputs always give identical scores, the weights are visible and tunable, and the scorer has real tests.",
      },
      {
        choice: "Approval-first sending with a unique idempotency key",
        insteadOf: "Letting the agent send autonomously",
        because:
          "An agent with unsupervised send access is one bad generation away from damaging a real customer relationship, and a retry after a timeout is one duplicate away from doing it twice. An explicit pending → approved → sent state machine keeps a human in the loop, and a unique key on the send makes duplicates impossible at the database level rather than 'unlikely' at the application level.",
      },
      {
        choice: "Row-level security in Postgres for tenant isolation",
        insteadOf: "Filtering by tenant ID in application code",
        because:
          "With 45 tables, application-level filtering means every future query is a chance to leak another organisation's pipeline — the worst possible bug in a sales tool. Pushing isolation into RLS policies makes the database refuse cross-tenant reads regardless of what the application asks for, so correctness does not depend on remembering a WHERE clause.",
      },
      {
        choice: "Evidence attached to every score, not just a number",
        insteadOf: "Surfacing a bare confidence score",
        because:
          "Salespeople ignore scores they cannot interrogate. Storing the URL, the snippet and the observed-at timestamp behind each signal makes the score checkable, makes stale research visible, and turns a debugging session from 'why did it say 82?' into reading the three sources it actually used.",
      },
      {
        choice: "Groq for inference",
        insteadOf: "A frontier model on every call",
        because:
          "The pipeline makes many calls per prospect. Latency and cost per prospect are the binding constraints on whether the system is usable at all, and most stages — signal extraction from a page of text — do not need frontier-level reasoning.",
      },
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "FastAPI",
      "LangGraph",
      "Groq",
      "Supabase",
      "Postgres / RLS",
      "Pinecone",
      "Redis",
      "Braintrust",
      "Vercel",
      "Railway",
    ],
    links: [
      {
        label: "Live demo",
        href: "https://davis.ilarehman.com",
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
      "FastAPI · Pydantic v2 · LangChain",
      "Docker container → Railway · React/Vite frontend",
    ],
    highlights: [
      "Every question is grounded in retrieved source chunks, so the model cannot invent material the document never contained.",
      "Retrieval is scoped by document ID rather than top-k similarity — full coverage of the source regardless of how large the index grows.",
      "Local sentence-transformer embeddings: zero embedding-API cost, and the pipeline runs offline.",
      "Rubric grading across accuracy, completeness and terminology, with partial credit and per-criterion feedback.",
      "Knowledge-gap tags aggregate across a session into ranked weak areas and a study recommendation.",
      "Six documented REST endpoints with auto-generated OpenAPI docs and Pydantic v2 validation.",
      "Containerised with Docker and deployed on Railway, built up over 26 incremental commits including real production debugging.",
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
      "Docker",
      "Railway",
      "React",
      "Vite",
      "TypeScript",
    ],
    links: [
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
