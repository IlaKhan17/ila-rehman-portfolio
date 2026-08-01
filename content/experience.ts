import type { Experience } from "./types";

/**
 * Order matters: the internship leads, the teaching sits under it as real
 * freelance experience and the origin story behind AdaptQuiz.
 *
 * Anything still marked TODO is hidden from visitors automatically. See
 * `components/sections/experience.tsx`. Fill these in and the section grows.
 */

export const experienceIsDraft = true;

export const experience: Experience[] = [
  {
    role: "Software Engineer Intern",
    org: "Manrke",
    kind: "Internship · Remote",
    period: "April 2026 – Present",
    location: "Remote",
    summary:
      "Building distributed, event-driven microservices on AWS behind an end-to-end document-automation platform, with LLMs integrated into the production pipelines rather than bolted on beside them.",
    points: [
      "Design and build distributed, event-driven microservices on AWS (Lambda, ECS, Step Functions, SQS/SNS, S3, DynamoDB and RDS) for an end-to-end document-automation platform, deployed to ECR and Lambda across multiple AWS accounts.",
      "Integrate LLMs into production pipelines for extraction, classification and natural-language generation, with guardrails, deterministic fallbacks, and cost and latency controls.",
      "Built a multi-tenant WhatsApp travel-booking agent: Twilio into FastAPI, a LangChain tool loop against live flight inventory, PostgreSQL row-level security per tenant, and a deterministic conversation-memory layer that recalls context without fabricating data.",
      "Diagnosed a 56% LLM tool-call failure rate from Braintrust traces and eliminated it with a provider-fallback chain and date-grounding fixes, hardening the system to 274 automated tests with mypy --strict across 120+ files.",
      "Engineer for reliability and observability: idempotent processing, exactly-once semantics, distributed state coordination, structured logging, and correlation-ID tracing through CloudWatch.",
      // TODO(ila): one number would make this section undeniable. Documents processed
      // per day, latency, error rate before and after, or accounts and services owned.
      "TODO: one accomplishment with a metric, such as throughput handled, latency, error rate improved, or scale owned.",
    ],
    tags: [
      "AWS",
      "Event-Driven Microservices",
      "LLMs in Production",
      "Agent Tool Loops",
      "Distributed Systems",
      "Observability",
    ],
  },
  {
    role: "Mathematics & Coding Tutor",
    org: "Freelance",
    kind: "Freelance · Remote",
    period: "6+ years",
    location: "Students in the US, UK and Canada",
    summary:
      "Years teaching mathematics and coding to international students. It funded a deliberate move into engineering, and it is the reason AdaptQuiz grades against a rubric instead of matching strings.",
    points: [
      "Taught mathematics and programming one-to-one to students across three countries and several curricula, adapting explanations to where each student's understanding actually broke.",
      "Marking thousands of free-text answers is where AdaptQuiz's grader comes from. Partial credit, per-criterion feedback and knowledge-gap tagging are what good assessment requires, not features found in a tutorial.",
      // TODO(ila): the specifics turn this from good to undeniable.
      "TODO: roughly how many students, over what period, and which age range?",
      "TODO: the exact certification name and its issuing body, if you want it named.",
      "TODO: anything measurable, such as ratings, retention, repeat clients or exam results.",
    ],
    tags: [
      "Mathematics",
      "Programming",
      "Curriculum Design",
      "Remote / International",
    ],
  },
];
