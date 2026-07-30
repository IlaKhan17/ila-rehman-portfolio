import type { Education, SkillGroup } from "./types";

/** Taxonomy taken from the résumé. Only what the repositories actually prove. */
export const skills: SkillGroup[] = [
  {
    key: "languages",
    label: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "SQL"],
  },
  {
    key: "ai_llm",
    label: "AI & LLM",
    items: [
      "Retrieval-Augmented Generation",
      "LangChain",
      "LangGraph",
      "Multi-Agent Systems",
      "LLM-as-Judge Evaluation",
      "Prompt Engineering",
      "Structured Outputs",
      "Embeddings (sentence-transformers)",
      "Semantic Search",
      "FAISS",
      "Pinecone",
      "OpenAI GPT-4o",
      "Groq",
    ],
  },
  {
    key: "backend",
    label: "Backend & Data",
    items: [
      "FastAPI",
      "REST API Design",
      "Pydantic v2",
      "SQLModel / SQLAlchemy",
      "PostgreSQL / SQLite",
      "Supabase",
      "Redis",
      "Next.js",
    ],
  },
  {
    key: "tooling",
    label: "Tools & Deployment",
    items: [
      "Docker",
      "Git & GitHub",
      "Vercel",
      "Railway",
      "pytest",
      "OpenAPI / Swagger",
    ],
  },
  {
    key: "foundations",
    label: "Foundations",
    items: [
      "NumPy",
      "Pandas",
      "ML Evaluation Metrics",
      "Linear Algebra",
      "Statistics",
    ],
  },
];

export const education: Education[] = [
  {
    degree: "Master of Computer Applications",
    field: "Educational Technology & Data Analytics",
    institution: "Indira Gandhi National Open University, New Delhi",
    period: "2022 — 2025",
    note: "The specialisation that connects six years of teaching to the systems I now build.",
    pivotal: true,
  },
  {
    degree: "B.Sc. (Hons) Physics with Mathematics",
    field: "First Class Honours",
    institution: "Jamia Millia Islamia, New Delhi",
    period: "2017 — 2020",
    note: "Linear algebra and statistics — load-bearing for embeddings and evaluation, not decoration.",
  },
];

export const languages = [
  "English (fluent)",
  "Hindi (native)",
  "Urdu (native)",
];
