import type { Experience } from "./types";

/**
 * Order matters: the internship leads, the teaching sits under it as real
 * freelance experience and the origin story behind AdaptQuiz.
 *
 * Anything still marked TODO is hidden from visitors automatically — see
 * `components/sections/experience.tsx`. Fill these in and the section grows.
 */

export const experienceIsDraft = true;

export const experience: Experience[] = [
  {
    role: "Software Engineer Intern",
    org: "Manrke",
    kind: "Internship · Remote",
    // TODO(ila): replace with exact months, e.g. "Feb 2026 — Jun 2026".
    period: "2026",
    location: "Remote",
    summary:
      "Built multi-tenant backend systems — per-tenant data isolation and a persistent conversation-memory layer — serving every client from a single deployment.",
    points: [
      "Built a scalable multi-tenant backend that isolates each client's data in its own workspace using row-level security and per-tenant scoping, serving every tenant from a single deployment.",
      "Designed a production-ready memory system that persists conversation context across sessions using embeddings in a vector store, so the agent recalls prior turns instead of restarting cold.",
      // TODO(ila): one accomplishment with a number — tenants served, latency, tests written, or reliability improved.
      "TODO — a real accomplishment with a metric: time saved, scale handled, tests written, or reliability improved.",
    ],
    tags: [
      "Multi-Tenant Architecture",
      "Row-Level Security",
      "Vector Memory",
      "Backend",
    ],
  },
  {
    role: "Mathematics & Coding Tutor",
    org: "Freelance",
    kind: "Freelance · Remote",
    period: "6+ years",
    location: "Students in the US, UK and Canada",
    summary:
      "Years teaching mathematics and coding to international students — the work that funded a deliberate move into engineering, and the domain knowledge behind AdaptQuiz's rubric grader.",
    points: [
      "Taught mathematics and programming one-to-one to students across three countries and several curricula, adapting explanations to where each student's understanding actually broke.",
      "Marking thousands of free-text answers is where AdaptQuiz's grader comes from: partial credit, per-criterion feedback and knowledge-gap tagging are what good assessment requires, not features found in a tutorial.",
      // TODO(ila): the specifics turn this from good to undeniable.
      "TODO — roughly how many students, over what period, and which age range?",
      "TODO — the exact certification name and its issuing body, if you want it named.",
      "TODO — anything measurable: ratings, retention, repeat clients, exam results.",
    ],
    tags: [
      "Mathematics",
      "Programming",
      "Curriculum Design",
      "Remote / International",
    ],
  },
];
