# ilarehman.com

Portfolio for **Ila Rehman, AI Engineer**. Next.js 16 (App Router), TypeScript,
Tailwind v4. Dark-first, no photograph, fully static.

The homepage hero is **ILA**, an agent console: a recruiter picks a curated
prompt chip and watches a scripted agent run: thinking states, tool-call
traces, streamed output, rich answer blocks. Every answer is static content
written by Ila. There is no model call at runtime, so no API key, no cost, and
no chance of the assistant inventing something in front of a recruiter. The
console is an enhancement only: everything it can say is also in the sections
below it, server-rendered and indexable.

> This repo is the portfolio site only. Davis and AdaptQuiz live in their own
> repositories. This site links to them, it does not contain them.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build; also typechecks
npm run lint
```

## Editing content

**Never edit JSX to change what the site says.** All content is typed data in
`content/`:

| File | What it drives |
|---|---|
| `profile.ts` | Name, role, pitch, links, About paragraphs, nav sections, `siteUrl` |
| `experience.ts` | Experience entries, in display order |
| `projects.ts` | Project cards *and* their case-study pages at `/projects/<slug>` |
| `skills.ts` | Skill groups, education, languages |
| `agent-qa.ts` | Every question ILA will answer, and its scripted steps |

Two conventions worth knowing:

- **Anything whose value starts with `TODO` is hidden from visitors.**
  Placeholder bullets never reach production; a draft entry degrades to the
  fields that are real. `experienceIsDraft` shows a warning banner in dev only.
- **ILA's information boundary is simply which questions exist in
  `agent-qa.ts`.** Adding a turn is the only way to widen what she will discuss.
  Anything outside the set gets `consoleFallback`, which offers email rather
  than a guess.

Adding a project to `projects.ts` automatically creates its case-study page, its
sitemap entry and its JSON-LD record.

## Deploy

Vercel Hobby, one project, auto-deploy on push to `main`. DNS stays at
Namecheap, so the existing `adaptquiz` and `davis` subdomain records are
untouched.

| Host | Points at |
|---|---|
| `ilarehman.com` | this repo's Vercel project |
| `www.ilarehman.com` | redirect to apex |
| `adaptquiz.ilarehman.com` | AdaptQuiz API, its own deployment |
| `davis.ilarehman.com` | Davis, its own Vercel project |

`davis.ilarehman.com` must be added as a domain **inside Davis's own Vercel
project**, not this one. Two projects, two domains, no shared config.

- `/resume.pdf` is served from `public/resume.pdf`. Replace that file to update
  the résumé; the filename is linked from `profile.ts` and should not change.
- The share card is generated at build time by `app/opengraph-image.tsx` from
  `profile.ts`, and is reused for both OpenGraph and Twitter.
