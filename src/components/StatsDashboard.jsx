import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconRefresh } from "@tabler/icons-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function StatsDashboard({
  wpm,
  accuracy,
  charStats,
  consistency,
  time,
  history,
  onRestart,
}) {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 w-full">
      <div className="grid grid-cols-[auto_1fr] gap-12">
        {/* Left Stats */}
        <div className="flex flex-col justify-center gap-4 min-w-50">
          <div>
            <div className="text-3xl text-muted-foreground font-mono">WPM</div>
            <div className="text-8xl font-bold text-primary leading-none">
              {wpm}
            </div>
          </div>
          <div>
            <div className="text-3xl text-muted-foreground font-mono">
              Accuracy
            </div>
            <div className="text-8xl font-bold text-primary leading-none">
              {accuracy}%
            </div>
          </div>
        </div>

        {/* Graph */}
        <div className="h-75 w-full bg-card/30 rounded-xl p-4 border border-border/50">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={history}
              margin={{ top: 8, right: 16, left: 0, bottom: 4 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--border))"
                opacity={0.25}
              />
              <XAxis
                dataKey="time"
                stroke="#E05D39"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                stroke="#E05D39"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                domain={[0, "auto"]}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-popover/95 border border-border p-3 rounded-lg shadow-xl backdrop-blur-sm outline-none min-w-37.5">
                        <div className="text-sm font-mono mb-2 text-muted-foreground border-b border-border/50 pb-1">
                          Time: {label}s
                        </div>
                        <div className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 text-sm">
                          <span className="text-primary font-bold">WPM</span>
                          <span className="text-right font-mono font-bold text-primary">
                            {payload[0].value}
                          </span>

                          <span className="text-muted-foreground">Raw</span>
                          <span className="text-right font-mono text-muted-foreground">
                            {payload[1].value}
                          </span>

                          <span className="text-red-500">Errors</span>
                          <span className="text-right font-mono text-red-500">
                            {payload[0].payload.errors}
                          </span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="wpm"
                stroke="#fbbf24"
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 0, fill: "#fbbf24" }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
              <Line
                type="monotone"
                dataKey="raw"
                stroke="#6b7280"
                strokeWidth={2}
                dot={false}
                strokeDasharray="4 4"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-3 gap-4 w-full">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground font-normal">
              Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary font-mono">
              {time}s
            </div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground font-normal">
              Characters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-center gap-3 font-mono">
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  correct
                </span>
                <span className="text-2xl font-semibold text-primary">
                  {charStats.correct}
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  incorrect
                </span>
                <span className="text-2xl font-semibold text-red-500">
                  {charStats.incorrect}
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  extra
                </span>
                <span className="text-2xl font-semibold text-muted-foreground">
                  {charStats.extra}
                </span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  missed
                </span>
                <span className="text-2xl font-semibold text-muted-foreground">
                  {charStats.missed}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground font-normal">
              Consistency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary font-mono">
              {consistency}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Restart Button */}
      <div className="flex justify-center mt-8">
        <Button
          variant="secondary"
          size="lg"
          onClick={(e) => {
            e.stopPropagation();
            onRestart();
          }}
          className="gap-2 px-8 cursor-pointer"
        >
          <IconRefresh className="w-4 h-4" />
          Restart
        </Button>
      </div>
    </div>
  );
}
