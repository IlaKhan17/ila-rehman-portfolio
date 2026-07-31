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
      "AI Agents",
      "LangChain",
      "LangGraph",
      "LLM-as-Judge Evaluation",
      "Prompt Engineering",
      "Structured Outputs",
      "Tool / Function Calling",
      "Embeddings (sentence-transformers)",
      "Semantic Search",
      "FAISS",
      "Pinecone",
      "OpenAI GPT-4o",
      "Groq",
      "Anthropic Claude",
    ],
  },
  {
    key: "backend",
    label: "Backend",
    items: [
      "FastAPI",
      "REST API Design",
      "Pydantic",
      "SQLAlchemy / SQLModel / Alembic",
      "PostgreSQL",
      "Supabase",
      "DynamoDB",
      "Redis",
      "Event-Driven Microservices",
      "Multi-Tenant Architecture",
      "Row-Level Security",
      "Next.js",
    ],
  },
  {
    key: "cloud",
    label: "Cloud & DevOps",
    items: [
      "AWS Lambda",
      "ECS",
      "Step Functions",
      "SQS / SNS",
      "S3",
      "RDS",
      "ECR",
      "CloudWatch",
      "Docker",
      "Railway",
      "Vercel",
      "CI/CD",
      "Git & GitHub",
    ],
  },
  {
    key: "foundations",
    label: "Tools & Foundations",
    items: [
      "pytest",
      "Braintrust",
      "OpenAPI / Swagger",
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
    field:
      "Software Engineering · Data Science · Cloud Computing · AI & Machine Learning",
    institution: "Indira Gandhi National Open University, New Delhi",
    period: "2022 – 2025",
    note: "Where the physics turned into engineering, and where the AI and cloud coursework started pointing at the work I do now.",
    pivotal: true,
  },
  {
    degree: "B.Sc. (Hons) Physics with Mathematics",
    field: "First Class Honours",
    institution: "Jamia Millia Islamia, New Delhi",
    period: "2017 – 2020",
    note: "Linear algebra and statistics, load-bearing for embeddings and evaluation rather than decoration.",
  },
];

export const languages = [
  "English (fluent)",
  "Hindi (native)",
  "Urdu (native)",
];
