import type { Experience } from "./types";

/**
 * ⚠️ AWAITING DETAILS FROM ILA — do not publish this section as-is.
 *
 * Placeholders are marked TODO and rendered with a visible warning in
 * development so nothing unverified can reach production by accident.
 * See PLAN.md §8 for the exact list of details needed.
 */

export const experienceIsDraft = true;

export const experience: Experience[] = [
  {
    role: "AI-Certified STEM Educator",
    org: "Freelance", // TODO(ila): platforms or agencies — Preply, Wyzant, direct clients?
    kind: "Freelance · Remote",
    period: "TODO — start year · 6+ years", // TODO(ila): confirm start year
    location: "Students in the US, UK and Canada",
    summary:
      "Six-plus years teaching mathematics and coding to international students — the work that funded a deliberate move into engineering, and the domain knowledge behind AdaptQuiz.",
    points: [
      // TODO(ila): replace with real, specific, ideally quantified achievements.
      "TODO — roughly how many students taught, and over what period?",
      "TODO — which subjects and which age range? Which maths, which programming languages?",
      "TODO — the exact certification name and its issuing body.",
      "TODO — anything measurable: ratings, retention, repeat clients, exam results.",
    ],
    tags: ["Mathematics", "Programming", "Curriculum Design", "Remote / International"],
  },
];
