import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    document.title = "About | Velotype";
  }, []);

  return (
    <div className="flex-1 px-4 py-10">
      <div className="mx-auto max-w-3xl space-y-8">
        {/* Intro */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight">
              About Velotype
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Velotype is a minimal, Monkeytype-inspired typing trainer focused
              on staying out of your way while you build real typing speed and
              consistency.
            </p>
          </div>

          <div className="rounded-xl border border-border/60 bg-card/40 p-4 space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Why it exists
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The goal of Velotype is to give you a focused practice space with
              just the pieces that matter: a clean text area, a handful of
              settings, and honest stats after every run.
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <section className="space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Features
            </h2>
            <ul className="list-disc space-y-1 pl-4 text-sm text-muted-foreground">
              <li>Configurable time tests and word counts.</li>
              <li>Optional punctuation and numbers for harder practice.</li>
              <li>Multiple English word lists and language assets.</li>
              <li>Live WPM, raw speed, accuracy, and consistency tracking.</li>
              <li>Per run statistics and personal best tracking.</li>
              <li>Extensive history and progress visualization.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              How to use it
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Pick your preferred time and word settings, then simply start
              typing. The timer begins on your first keystroke, and the settings
              bar hides so you can stay locked on the text. When the run ends,
              check the stats, hit Reset, and try to beat your last result.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Built for the web
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Velotype is built with React, Vite, Tailwind CSS, shadcn/ui, and
              Recharts. It&apos;s open source and designed to be easy to extend
              with new modes, layouts, and stats.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
