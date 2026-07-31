import type { ConsoleTurn } from "./types";

/**
 * ILA — the portfolio's agent console.
 *
 * Every answer below is static content written by Ila. There is no model call
 * at runtime: no API key, no cost, no rate limiting, and no possibility of the
 * assistant inventing something about her in front of a recruiter.
 *
 * The information boundary is simply *which questions exist here*. Anything
 * outside this set gets the fallback below, which offers email rather than a
 * guess. To widen what ILA will discuss, add a turn — that is the only way.
 *
 * The thinking indicators and tool-call lines are presentation, driven by a
 * local state machine. They correspond to real content lookups in `content/`,
 * and the site never claims to be running live inference.
 */

export const consoleFallback =
  "That's outside what I know about Ila. Email her directly and she'll answer it properly.";

export const consoleTurns: ConsoleTurn[] = [
  {
    id: "hire",
    prompt: "Why should I hire Ila?",
    steps: [
      { type: "thought", text: "Retrieving profile context", detail: "3 sources" },
      {
        type: "tool",
        call: "search_projects(featured=true)",
        result: "2 results · Davis, AdaptQuiz API",
      },
      {
        type: "say",
        text: "Because she has already shipped the thing most junior candidates only describe. AdaptQuiz is a production RAG API with retrieval grounding, structured outputs and an LLM-as-judge evaluation layer. Davis is a multi-tenant AI sales agent where every score cites its evidence, sending is approval-gated, and tenant isolation is enforced by row-level security across 45 Postgres tables. Both are deployed, both are open source, and the code is legible.",
      },
      {
        type: "say",
        text: "The detail worth noticing: she builds the boring parts. Deterministic scoring instead of asking a model for a number. An idempotency key so a retry cannot send twice. Rubric grading with per-criterion feedback instead of string matching. That is the difference between a demo and something you can put in front of users.",
      },
      {
        type: "say",
        text: "And it is not only side projects. She currently builds distributed, event-driven microservices on AWS with LLMs integrated into the production pipelines — guardrails, deterministic fallbacks, exactly-once semantics, the reliability work that side projects never force you to learn. First Class Physics honours underneath that, and years teaching maths and code across the US, UK and Canada: the evaluation work in AdaptQuiz is what happens when someone who has actually graded thousands of answers builds a grader.",
      },
      { type: "projects", slugs: ["davis", "adaptquiz"] },
    ],
  },
  {
    id: "who",
    prompt: "Who is Ila?",
    steps: [
      { type: "thought", text: "Loading profile" },
      { type: "tool", call: "get_profile()", result: "ok" },
      {
        type: "say",
        text: "Ila Rehman — an AI Engineer in Delhi, working remotely. She builds LLM-powered applications and the distributed systems they run on: event-driven microservices on AWS, retrieval pipelines, agentic workflows, and the evaluation layers that tell you whether any of it actually works.",
      },
      {
        type: "say",
        text: "Physics first, then years of teaching, then an MCA, and now shipping production systems as a software engineer. Each step fed the next.",
      },
      { type: "education" },
    ],
  },
  {
    id: "built",
    prompt: "What has she built?",
    steps: [
      { type: "thought", text: "Querying project index" },
      {
        type: "tool",
        call: "search_projects()",
        result: "3 results",
      },
      {
        type: "say",
        text: "Three shipped projects, in order of depth:",
      },
      { type: "projects", slugs: ["davis", "adaptquiz", "focus-flow"] },
    ],
  },
  {
    id: "davis",
    prompt: "Tell me about Davis",
    steps: [
      { type: "thought", text: "Loading case study", detail: "davis" },
      {
        type: "tool",
        call: "get_project('davis')",
        result: "ok · 5 decisions · 13 technologies",
      },
      {
        type: "say",
        text: "Davis is an evidence-grounded AI sales development agent. It finds prospects, researches them, and drafts personalised outreach — and every prospect score cites a source URL, a snippet and an observed-at timestamp, so a salesperson can check what the agent actually saw instead of trusting a bare number.",
      },
      {
        type: "say",
        text: "The engineering she would want you to ask about: scoring is split into an LLM signal-extraction stage and a deterministic Python scorer, so identical inputs always give identical, unit-testable scores. Sending is approval-first — pending, approved, sent — behind a six-rule policy guard, with a unique idempotency key that makes duplicate sends impossible. Tenant isolation is row-level security over 45 Postgres tables plus per-workspace Pinecone namespaces, not a WHERE clause someone has to remember.",
      },
      {
        type: "say",
        text: "Next.js on Vercel, FastAPI on Railway, LangGraph for the multi-stage workflow, Groq for inference, Supabase for auth and Postgres, and Braintrust tracing over the whole pipeline.",
      },
      { type: "projects", slugs: ["davis"] },
    ],
  },
  {
    id: "adaptquiz",
    prompt: "Tell me about AdaptQuiz",
    steps: [
      { type: "thought", text: "Loading case study", detail: "adaptquiz" },
      {
        type: "tool",
        call: "get_project('adaptquiz')",
        result: "ok · 6 endpoints",
      },
      {
        type: "say",
        text: "AdaptQuiz turns any PDF into an adaptive quiz session grounded entirely in that document. It chunks and embeds the source locally, generates questions from retrieved context so nothing can be hallucinated, then grades free-text answers with GPT-4o against a three-criterion rubric — accuracy, completeness, terminology — awarding partial credit and tagging the specific knowledge gap behind each wrong answer.",
      },
      {
        type: "say",
        text: "The evaluation layer is the interesting part. String-matching a student's answer marks correct reasoning wrong because the wording differed. A rubric produces a defensible score and the feedback that makes the score useful — the same technique used in reward modelling.",
      },
      { type: "projects", slugs: ["adaptquiz"] },
    ],
  },
  {
    id: "ai-experience",
    prompt: "What's her AI/ML experience?",
    steps: [
      { type: "thought", text: "Aggregating from projects and résumé" },
      { type: "tool", call: "get_skills()", result: "5 groups" },
      {
        type: "say",
        text: "Applied, and shipped rather than studied. RAG end to end — chunking, local sentence-transformer embeddings, FAISS and Pinecone vector stores, retrieval strategy. Structured outputs with enforced JSON schemas. Tool calling and agent orchestration with LangGraph. Tracing and evaluation with Braintrust. And LLM-as-judge rubric scoring, which is the part most portfolios skip entirely.",
      },
      { type: "skills" },
    ],
  },
  {
    id: "internship",
    prompt: "What does she do in production?",
    steps: [
      { type: "thought", text: "Retrieving experience records" },
      { type: "tool", call: "get_experience()", result: "2 records · current role" },
      {
        type: "say",
        text: "She is a software engineer intern at Manrke, and it is real production work: distributed, event-driven microservices on AWS — Lambda, ECS, Step Functions, SQS/SNS, DynamoDB, RDS — behind an end-to-end document-automation platform. She owns systems across the whole lifecycle, from architecture through containerised deploys to ECR and Lambda across multiple AWS accounts, to live production debugging.",
      },
      {
        type: "say",
        text: "The part that matters for an AI role: she integrates LLMs into those pipelines for extraction, classification and generation — with guardrails, deterministic fallbacks when the model misbehaves, and explicit cost and latency controls. Plus the unglamorous reliability work that makes async systems trustworthy: idempotent processing, exactly-once semantics, distributed state coordination, and correlation-ID tracing through CloudWatch.",
      },
      { type: "experience" },
    ],
  },
  {
    id: "teaching",
    prompt: "She taught for years — what has that got to do with engineering?",
    steps: [
      { type: "thought", text: "Retrieving experience record" },
      { type: "tool", call: "get_experience(kind='freelance')", result: "1 record · 6+ years" },
      {
        type: "say",
        text: "Everything, in her case. Years spent teaching maths and coding to students in the US, UK and Canada means years watching precisely how people fail at things — which wrong answers signal a real misconception and which are a slip, and what feedback actually changes the next attempt.",
      },
      {
        type: "say",
        text: "That is the entire design brief for AdaptQuiz's grader. The rubric, the partial credit, the knowledge-gap tagging — those are not features she found in a tutorial. They are what she already knew good assessment requires. It also means she can explain a hard system clearly to someone who does not already understand it, which turns out to matter a lot on an engineering team.",
      },
      { type: "experience" },
    ],
  },
  {
    id: "switch",
    prompt: "Why did she move from physics to AI?",
    steps: [
      { type: "thought", text: "Retrieving background" },
      { type: "tool", call: "get_education()", result: "2 records" },
      {
        type: "say",
        // TODO(ila): replace with 2–3 sentences in Ila's own voice.
        text: "It reads as a switch, but it is closer to a straight line: physics for the quantitative foundation, years of teaching to fund a deliberate move and sharpen how she explains hard things, an MCA covering software engineering, data science, cloud computing and machine learning for the engineering itself, and now production systems that use all three.",
      },
      { type: "education" },
    ],
  },
  {
    id: "learning",
    prompt: "What is she working on now?",
    steps: [
      { type: "thought", text: "Checking recent activity" },
      { type: "tool", call: "get_current_focus()", result: "ok" },
      {
        type: "say",
        // TODO(ila): keep this current — a stale answer here is worse than none.
        text: "Deepening the agent side of the work: evaluation harnesses for multi-step agents, retrieval quality measurement, and getting Davis's outreach pipeline reliable enough to judge honestly rather than demo well.",
      },
    ],
  },
  {
    id: "contact",
    prompt: "How do I get in touch?",
    steps: [
      { type: "thought", text: "Fetching contact details" },
      { type: "tool", call: "get_contact()", result: "ok" },
      {
        type: "say",
        text: "Email is best, and she is open to full-time remote AI Engineer roles.",
      },
      { type: "links" },
    ],
  },
];
