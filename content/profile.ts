import type { Profile } from "./types";

export const profile: Profile = {
  name: "Ila Rehman",
  monogram: "IR",
  role: "AI Engineer",
  pitch:
    "I ship LLM-powered applications and the distributed systems they run on: event-driven microservices on AWS, grounded retrieval, and the evaluation layers that tell you whether any of it actually works.",
  location: "Delhi, India",
  availability: "Open to full-time remote AI Engineer roles",
  email: "ila.rehman.khan@gmail.com",
  links: [
    { label: "GitHub", href: "https://github.com/IlaKhan17" },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/ila-rehman-9198b4367",
    },
    { label: "Résumé", href: "/resume.pdf" },
  ],
  focus: [
    "RAG",
    "Agentic Systems",
    "LLM Evaluation",
    "Event-Driven AWS",
    "FastAPI",
  ],
};

export const siteUrl = "https://ilarehman.com";

/**
 * The About section. Short paragraphs, no hedging.
 *
 * TODO(ila): rewrite the middle paragraphs in your own voice, so this section
 * sounds like you rather than written for you.
 */
export const about = [
  "I build LLM-powered applications and the infrastructure underneath them: agentic pipelines, retrieval grounded in real sources, and the evaluation layers that separate a demo from something you can put in front of users.",
  "Day to day I work on distributed, event-driven microservices on AWS behind a document-automation platform, built from Lambda, ECS, Step Functions and queues, with LLMs integrated into the production pipelines for extraction, classification and generation. I also built a multi-tenant AI travel agent there, running over WhatsApp against live flight inventory, where tracing showed a 56% tool-call failure rate that no log had surfaced. That work taught me the interesting problems are rarely the prompt. They are idempotent processing, exactly-once semantics, deterministic fallbacks for when a model misbehaves, and being able to trace one document through a dozen asynchronous services at 2am.",
  "It looks like a career change, but it runs in a straight line. Physics with mathematics gave me the quantitative foundation, and linear algebra and statistics are load-bearing when you work with embeddings and evaluation rather than decoration. Years of teaching maths and coding to students across the US, UK and Canada funded a deliberate move into engineering, and an MCA covering software engineering, data science, cloud computing and machine learning is where that move actually happened.",
  "Alongside that I have shipped two systems of my own. Davis is an evidence-grounded AI sales agent where every prospect score cites a source URL, a snippet and a timestamp, isolated across organisations by row-level security. AdaptQuiz is a RAG API that generates questions grounded in your own study material and grades free-text answers against a rubric, tagging the specific gap behind every wrong answer. The grader is the part I care about most. It exists because I spent years marking answers that were right in the wrong words.",
];

/** Section anchors, in page order. Drives the nav. */
export const sections = [
  { id: "about", label: "about" },
  { id: "experience", label: "experience" },
  { id: "projects", label: "projects" },
  { id: "skills", label: "skills" },
  { id: "education", label: "education" },
  { id: "contact", label: "contact" },
];
