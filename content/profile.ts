import type { Profile } from "./types";

export const profile: Profile = {
  name: "Ila Rehman",
  monogram: "IR",
  role: "AI Engineer",
  pitch:
    "Six years teaching maths and code to students across the US, UK and Canada — now building the AI systems that do the teaching.",
  location: "Delhi, India",
  availability: "Open to full-time remote AI Engineer roles",
  email: "ila.rehman.khan@gmail.com",
  links: [
    { label: "GitHub", href: "https://github.com/IlaKhan17" },
    { label: "LinkedIn", href: "https://linkedin.com/in/ila-rehman" },
    { label: "Résumé", href: "/resume.pdf" },
  ],
  focus: [
    "RAG",
    "Multi-Agent Systems",
    "LLM Evaluation",
    "FastAPI",
    "Vector Search",
  ],
};

export const siteUrl = "https://ilarehman.com";

/**
 * The About section. Short paragraphs, no hedging.
 *
 * TODO(ila): rewrite the second and third paragraphs in your own voice —
 * this section should sound like you, not like a written-for-you bio.
 */
export const about = [
  "I build LLM applications: retrieval pipelines, multi-agent systems, and the evaluation layers that tell you whether any of it actually works.",
  "It looks like a career change, but it runs in a straight line. Physics with mathematics gave me the quantitative foundation — linear algebra and statistics are load-bearing when you work with embeddings and evaluation, not decoration. Six years teaching maths and coding to students across the US, UK and Canada funded the move and taught me exactly how people fail at hard things. My MCA specialised in Educational Technology & Data Analytics, which is where those two threads met.",
  "Then I built AdaptQuiz: a RAG API that generates questions grounded in your own study material and grades free-text answers against a rubric, tagging the specific gap behind every wrong answer. The grader is the part I care about most — it exists because I spent six years marking answers that were right in the wrong words.",
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
