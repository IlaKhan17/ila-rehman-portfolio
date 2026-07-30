/**
 * Shared content types.
 *
 * Everything the site displays lives in `content/*.ts` and is typed here.
 * Edit the data files — never the components.
 */

export type Profile = {
  name: string;
  monogram: string;
  role: string;
  /** One line. The whole positioning of the site compresses into this. */
  pitch: string;
  location: string;
  availability: string;
  email: string;
  links: { label: string; href: string }[];
  /** Focus areas shown as chips under the hero. */
  focus: string[];
};

export type ProjectLink = {
  label: string;
  href: string;
  /** Live demos get visual priority over source links. */
  kind: "demo" | "source";
};

/** One real engineering decision and the reasoning behind it. */
export type Decision = {
  choice: string;
  insteadOf: string;
  because: string;
};

export type Project = {
  slug: string;
  name: string;
  /** Six words or fewer — used on cards and in console output. */
  blurb: string;
  /** Featured projects get a full case-study page and a large card. */
  featured: boolean;
  year: string;
  problem: string;
  built: string;
  /** Plain-text architecture sketch, rendered in mono. */
  architecture: string[];
  highlights: string[];
  decisions: Decision[];
  tech: string[];
  links: ProjectLink[];
};

export type Experience = {
  role: string;
  org: string;
  kind: string;
  period: string;
  location: string;
  summary: string;
  points: string[];
  tags: string[];
};

export type SkillGroup = {
  label: string;
  key: string;
  items: string[];
};

export type Education = {
  degree: string;
  field: string;
  institution: string;
  period: string;
  note: string;
  /** Marks the credential that carries the site's narrative. */
  pivotal?: boolean;
};

/** A step in a scripted console run. */
export type ConsoleStep =
  | { type: "thought"; text: string; detail?: string }
  | { type: "tool"; call: string; result: string }
  | { type: "say"; text: string }
  | { type: "projects"; slugs: string[] }
  | { type: "experience" }
  | { type: "skills" }
  | { type: "education" }
  | { type: "links" };

export type ConsoleTurn = {
  id: string;
  /** Label on the clickable chip. */
  prompt: string;
  steps: ConsoleStep[];
};
