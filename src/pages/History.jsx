import { useMemo, useState } from "react";
import { loadRuns, saveRuns } from "@/lib/history";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconTrash } from "@tabler/icons-react";

const TIME_FILTERS = ["all", 15, 30, 60];
const WORD_FILTERS = ["all", 50, 75, 100];
const MODE_FILTERS = [
  { value: "all", label: "All modes" },
  { value: "default", label: "Default" },
  { value: "punctuation", label: "Punctuation" },
  { value: "numbers", label: "Numbers" },
  { value: "punctuation + numbers", label: "Punct + nums" },
];

function formatDateLabel(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "";
  return `${d.getMonth() + 1}/${d.getDate()} ${d
    .getHours()
    .toString()
    .padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}

function describeMode(run) {
  const parts = [];
  if (run.includePunctuation) parts.push("punctuation");
  if (run.includeNumbers) parts.push("numbers");
  if (parts.length === 0) return "default";
  return parts.join(" + ");
}

export default function History() {
  const [runs, setRuns] = useState(() => loadRuns());
  const [timeFilter, setTimeFilter] = useState("all");
  const [wordFilter, setWordFilter] = useState("all");
  const [modeFilter, setModeFilter] = useState("all");

  const filteredRuns = useMemo(() => {
    return runs.filter((run) => {
      if (timeFilter !== "all" && run.time !== timeFilter) return false;
      if (wordFilter !== "all" && run.wordCount !== wordFilter) return false;
      if (modeFilter !== "all" && describeMode(run) !== modeFilter)
        return false;
      return true;
    });
  }, [runs, timeFilter, wordFilter, modeFilter]);

  const personalBest = useMemo(() => {
    if (filteredRuns.length === 0) return null;
    return filteredRuns.reduce(
      (best, r) => (r.wpm > best.wpm ? r : best),
      filteredRuns[0]
    );
  }, [filteredRuns]);

  const hasRuns = runs.length > 0;

  return (
    <div className="flex-1 px-4 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        {/* Personal best summary */}
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              Results &amp; History
            </h1>
            <div className="flex items-center gap-2">
              {hasRuns && (
                <Badge
                  variant="secondary"
                  className="uppercase tracking-[0.18em] text-[10px]"
                >
                  {runs.length} runs
                </Badge>
              )}
              {hasRuns && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="secondary"
                      size="xs"
                      className="h-7 px-2 text-[11px] text-red-500 hover:text-red-500 hover:bg-red-500/10 cursor-pointer inline-flex items-center gap-1"
                    >
                      <IconTrash className="h-3.5 w-3.5" />
                      <span>Clear</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Clear history?</DialogTitle>
                      <DialogDescription>
                        This will permanently remove all saved runs from this
                        browser. You cannot undo this action.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        variant="ghost"
                        className="cursor-pointer"
                        asChild
                      >
                        <DialogTrigger>Cancel</DialogTrigger>
                      </Button>
                      <Button
                        variant="destructive"
                        className="cursor-pointer inline-flex items-center gap-1"
                        onClick={() => {
                          saveRuns([]);
                          setRuns([]);
                        }}
                      >
                        <IconTrash className="h-3.5 w-3.5" />
                        <span>Clear history</span>
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="uppercase tracking-[0.18em] text-[10px]">
              Filters
            </span>
            <div className="flex items-center gap-1">
              {TIME_FILTERS.map((t) => (
                <Button
                  key={t}
                  size="sm"
                  variant={timeFilter === t ? "secondary" : "ghost"}
                  className="h-7 px-3 text-[11px] cursor-pointer"
                  onClick={() => setTimeFilter(t)}
                >
                  {t === "all" ? "All times" : `${t}s`}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-1">
              {WORD_FILTERS.map((w) => (
                <Button
                  key={w}
                  size="sm"
                  variant={wordFilter === w ? "secondary" : "ghost"}
                  className="h-7 px-3 text-[11px] cursor-pointer"
                  onClick={() => setWordFilter(w)}
                >
                  {w === "all" ? "All words" : `${w} words`}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-1">
              {MODE_FILTERS.map((m) => (
                <Button
                  key={m.value}
                  size="sm"
                  variant={modeFilter === m.value ? "secondary" : "ghost"}
                  className="h-7 px-3 text-[11px] cursor-pointer"
                  onClick={() => setModeFilter(m.value)}
                >
                  {m.label}
                </Button>
              ))}
            </div>
          </div>

          <Card className="border border-border/70 bg-card/40">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Personal best</span>
                {personalBest && (
                  <span className="flex items-center gap-1 text-[11px] font-normal text-muted-foreground/80">
                    <span>
                      {personalBest.time}s / {personalBest.wordCount} words
                    </span>
                    <span className="h-1 w-1 rounded-full bg-primary" />
                    <span>{describeMode(personalBest)}</span>
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {personalBest ? (
                <div className="flex flex-wrap items-end gap-6">
                  <div className="space-y-1">
                    <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Best WPM
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-primary">
                      {personalBest.wpm}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Raw {personalBest.rawWpm} - {personalBest.accuracy}%
                      accuracy
                    </div>
                  </div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div>Run on {formatDateLabel(personalBest.date)}</div>
                    <div>Consistency {personalBest.consistency ?? 0}%</div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No finished runs yet. Complete a test to start tracking your
                  personal best.
                </p>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Full history list */}
        <section className="space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            All runs
          </h2>
          <div className="overflow-hidden rounded-xl border border-border/60 bg-card/40">
            {filteredRuns.length > 0 ? (
              <div className="max-h-105 overflow-auto text-sm">
                <Table>
                  <TableHeader className="sticky top-0 bg-background text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    <TableRow>
                      <TableHead className="px-4 py-3 font-medium">
                        Date
                      </TableHead>
                      <TableHead className="px-4 py-3 font-medium">
                        WPM
                      </TableHead>
                      <TableHead className="px-4 py-3 font-medium">
                        Raw
                      </TableHead>
                      <TableHead className="px-4 py-3 font-medium">
                        Accuracy
                      </TableHead>
                      <TableHead className="px-4 py-3 font-medium">
                        Setup
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRuns
                      .slice()
                      .sort(
                        (a, b) =>
                          new Date(b.date).getTime() -
                          new Date(a.date).getTime()
                      )
                      .map((run) => (
                        <TableRow key={run.id}>
                          <TableCell className="px-4 py-2 text-xs text-muted-foreground">
                            {formatDateLabel(run.date)}
                          </TableCell>
                          <TableCell className="px-4 py-2">
                            <span className="font-semibold text-primary">
                              {run.wpm}
                            </span>
                          </TableCell>
                          <TableCell className="px-4 py-2 text-muted-foreground">
                            {run.rawWpm}
                          </TableCell>
                          <TableCell className="px-4 py-2 text-muted-foreground">
                            {run.accuracy}%
                          </TableCell>
                          <TableCell className="px-4 py-2 text-xs text-muted-foreground">
                            <div className="flex flex-wrap items-center gap-1">
                              <span>
                                {run.time}s / {run.wordCount}w
                              </span>
                              <span className="h-1 w-1 rounded-full bg-primary" />
                              <span>{describeMode(run)}</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex items-center justify-center p-6 text-sm text-muted-foreground">
                No runs match the current filters.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
