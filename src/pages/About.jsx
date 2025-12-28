export default function About() {
  return (
    <div className="flex-1 px-4 py-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            About Velotype
          </h1>
          <p className="text-sm text-muted-foreground">
            Velotype is a minimal, Monkeytype-inspired typing trainer focused on
            clean visuals, useful stats, and staying out of your way while you
            type.
          </p>
        </div>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            What it does
          </h2>
          <p className="text-sm text-muted-foreground">
            The main test page lets you practice typing with configurable time
            limits, word counts, and optional punctuation or numbers. While you
            type, Velotype quietly tracks your speed and accuracy in the
            background.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            After each test
          </h2>
          <p className="text-sm text-muted-foreground">
            When a run finishes, you get a detailed breakdown: words per minute,
            raw speed, accuracy, consistency, and character stats, plus a graph
            that shows how your performance changed over time.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Under the hood
          </h2>
          <p className="text-sm text-muted-foreground">
            Velotype is built with React, Vite, Tailwind CSS, shadcn/ui
            components, and Recharts for the stats visualizations. It&apos;s
            designed to be fast, keyboard-centric, and easy to extend with new
            modes or stats in the future.
          </p>
        </section>
      </div>
    </div>
  );
}
