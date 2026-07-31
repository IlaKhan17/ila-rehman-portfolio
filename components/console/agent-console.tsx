"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { consoleTurns } from "@/content/agent-qa";
import { profile } from "@/content/profile";
import type { ConsoleStep, ConsoleTurn } from "@/content/types";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";

import { ConsoleBlock } from "./console-blocks";

/** How long each step type dwells before the next one appears. */
const DWELL: Record<ConsoleStep["type"], number> = {
  thought: 620,
  tool: 480,
  say: 240,
  projects: 220,
  experience: 220,
  skills: 220,
  education: 220,
  links: 220,
};

const CHARS_PER_TICK = 3;
const TICK_MS = 14;

type Run = {
  turn: ConsoleTurn;
  /** Steps fully revealed so far. */
  revealed: number;
  /** Characters streamed of the step at `revealed`, when it is prose. */
  chars: number;
};

const OPENING_TURN = consoleTurns[0];

export function AgentConsole() {
  const reducedMotion = usePrefersReducedMotion();
  const [runs, setRuns] = useState<Run[]>([
    { turn: OPENING_TURN, revealed: 0, chars: 0 },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const active = runs[runs.length - 1];
  const isStreaming =
    !reducedMotion && active.revealed < active.turn.steps.length;

  // Reduced motion is applied as a derived view rather than by rewriting state,
  // so the preference can flip mid-session without stranding a half-run.
  const view = reducedMotion
    ? runs.map((run) => ({ ...run, revealed: run.turn.steps.length, chars: 0 }))
    : runs;

  /** Reveal everything at once, for reduced motion and the skip control. */
  const finishRun = useCallback(() => {
    setRuns((current) => {
      const next = [...current];
      const last = next[next.length - 1];
      next[next.length - 1] = {
        ...last,
        revealed: last.turn.steps.length,
        chars: 0,
      };
      return next;
    });
  }, []);

  // Drive the run forward one beat at a time.
  useEffect(() => {
    if (reducedMotion || !isStreaming) return;

    const step = active.turn.steps[active.revealed];

    if (step.type === "say" && active.chars < step.text.length) {
      const timer = window.setTimeout(() => {
        setRuns((current) => {
          const next = [...current];
          const last = next[next.length - 1];
          next[next.length - 1] = {
            ...last,
            chars: Math.min(last.chars + CHARS_PER_TICK, step.text.length),
          };
          return next;
        });
      }, TICK_MS);
      return () => window.clearTimeout(timer);
    }

    const timer = window.setTimeout(() => {
      setRuns((current) => {
        const next = [...current];
        const last = next[next.length - 1];
        next[next.length - 1] = {
          ...last,
          revealed: last.revealed + 1,
          chars: 0,
        };
        return next;
      });
    }, DWELL[step.type]);

    return () => window.clearTimeout(timer);
  }, [active, isStreaming, reducedMotion]);

  // Keep the newest output in view without yanking the whole page around.
  useEffect(() => {
    const node = scrollRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [runs]);

  const ask = (turn: ConsoleTurn) => {
    if (isStreaming) finishRun();
    setRuns((current) => [
      ...current,
      { turn, revealed: reducedMotion ? turn.steps.length : 0, chars: 0 },
    ]);
  };

  const askedIds = new Set(runs.map((run) => run.turn.id));

  return (
    <div className="overflow-hidden rounded-card border border-line bg-surface/80 shadow-2xl shadow-black/40 backdrop-blur">
      <ConsoleChrome />

      <div
        ref={scrollRef}
        className="max-h-[26rem] overflow-y-auto px-4 py-4 sm:px-5"
      >
        <div
          className="space-y-6"
          aria-live="polite"
          aria-atomic="false"
          aria-busy={isStreaming}
        >
          {view.map((run, runIndex) => (
            <RunView
              key={`${run.turn.id}-${runIndex}`}
              run={run}
              showCaret={runIndex === view.length - 1 && isStreaming}
            />
          ))}
        </div>
      </div>

      <div className="border-t border-line bg-base/40 px-4 py-3 sm:px-5">
        <div className="mb-2 flex items-center justify-between">
          <p className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-faint">
            Ask ILA
          </p>
          {isStreaming && (
            <button
              type="button"
              onClick={finishRun}
              className="font-mono text-[0.7rem] text-ink-faint transition-colors hover:text-accent-bright"
            >
              skip ⏎
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {consoleTurns.map((turn) => (
            <button
              key={turn.id}
              type="button"
              onClick={() => ask(turn)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-left text-xs transition-colors",
                askedIds.has(turn.id)
                  ? "border-line text-ink-faint hover:border-line-strong hover:text-ink-muted"
                  : "border-line-strong text-ink-muted hover:border-accent-dim hover:bg-accent/10 hover:text-accent-bright",
              )}
            >
              {turn.prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ConsoleChrome() {
  return (
    <div className="flex items-center gap-3 border-b border-line bg-base/60 px-4 py-2.5 sm:px-5">
      <span className="grid size-7 place-items-center rounded-md border border-accent-dim bg-accent/15 font-mono text-[0.65rem] font-semibold tracking-tight text-accent-bright">
        {profile.monogram}
      </span>
      <span className="font-mono text-xs text-ink-muted">
        ILA <span className="text-ink-faint">· ask me about Ila Rehman</span>
      </span>
      <span className="ml-auto flex items-center gap-1.5">
        <span className="size-1.5 rounded-full bg-signal animate-pulse-dot" />
        <span className="font-mono text-[0.7rem] text-ink-faint">online</span>
      </span>
    </div>
  );
}

function RunView({ run, showCaret }: { run: Run; showCaret: boolean }) {
  return (
    <div className="space-y-2.5">
      <p className="font-mono text-sm text-ink">
        <span className="mr-2 text-accent">›</span>
        {run.turn.prompt}
      </p>

      {run.turn.steps.map((step, index) => {
        if (index > run.revealed) return null;

        const isCurrent = index === run.revealed;
        // Only prose renders while it is still the current step; other step
        // types wait their turn so the reveal stays paced.
        if (isCurrent && step.type !== "say") return null;

        const caret = showCaret && isCurrent;

        return (
          <StepView
            key={index}
            step={step}
            chars={isCurrent ? run.chars : undefined}
            caret={caret}
          />
        );
      })}
    </div>
  );
}

function StepView({
  step,
  chars,
  caret,
}: {
  step: ConsoleStep;
  chars?: number;
  caret: boolean;
}) {
  if (step.type === "thought") {
    return (
      <p className="animate-rise font-mono text-xs text-ink-faint">
        <span className="mr-2 text-accent-dim">●</span>
        {step.text}
        {step.detail && <span className="ml-2 opacity-70">└ {step.detail}</span>}
      </p>
    );
  }

  if (step.type === "tool") {
    return (
      <p className="animate-rise font-mono text-xs">
        <span className="mr-2 text-accent-dim">●</span>
        <span className="text-accent-bright">{step.call}</span>
        <span className="ml-2 text-ink-faint">→ {step.result}</span>
      </p>
    );
  }

  if (step.type === "say") {
    const text = chars === undefined ? step.text : step.text.slice(0, chars);
    return (
      <p className="text-[0.95rem] leading-relaxed text-ink-muted">
        {text}
        {caret && (
          <span className="ml-0.5 inline-block h-[1.05em] w-[0.5ch] translate-y-[0.15em] bg-accent-bright animate-caret" />
        )}
      </p>
    );
  }

  return (
    <div className="animate-rise">
      <ConsoleBlock step={step} />
    </div>
  );
}
