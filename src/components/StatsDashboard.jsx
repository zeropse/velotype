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
  rawWpm,
  charStats,
  consistency,
  time,
  history,
  onRestart,
}) {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 w-full max-w-6xl mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="flex flex-row lg:flex-col justify-between lg:justify-center gap-6 lg:gap-8">
          <div className="flex flex-col gap-2">
            <div className="text-xl md:text-3xl text-muted-foreground">WPM</div>
            <div className="text-6xl md:text-8xl font-bold text-primary leading-none">
              {wpm}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">
              Raw: {rawWpm}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-xl md:text-3xl text-muted-foreground">
              Accuracy
            </div>
            <div className="text-6xl md:text-8xl font-bold text-primary leading-none">
              {accuracy}%
            </div>
          </div>
        </div>

        {/* Graph Container */}
        <div className="h-64 md:h-80 w-full bg-card/30 rounded-xl p-2 md:p-4 border border-border/50">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={history}
              margin={{ top: 8, right: 10, left: -20, bottom: 4 }}
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
                        <div className="text-sm mb-2 text-muted-foreground border-b border-border/50 pb-1">
                          Time: {label}s
                        </div>
                        <div className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 text-sm">
                          <span className="text-primary font-bold">WPM</span>
                          <span className="text-right font-bold text-primary">
                            {payload[0].value}
                          </span>
                          <span className="text-muted-foreground">Raw</span>
                          <span className="text-right text-muted-foreground">
                            {payload[1].value}
                          </span>
                          <span className="text-red-500">Errors</span>
                          <span className="text-right text-red-500">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-normal">
              Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl md:text-4xl font-bold text-primary">
              {time}s
            </div>
          </CardContent>
        </Card>

        <Card className="text-center order-first md:order-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-normal">
              Characters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-end justify-center gap-3">
              {[
                {
                  label: "correct",
                  val: charStats.correct,
                  color: "text-primary",
                },
                {
                  label: "incorrect",
                  val: charStats.incorrect,
                  color: "text-red-500",
                },
                {
                  label: "extra",
                  val: charStats.extra,
                  color: "text-muted-foreground",
                },
                {
                  label: "missed",
                  val: charStats.missed,
                  color: "text-muted-foreground",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-1"
                >
                  <span className="text-[10px] uppercase tracking-tighter text-muted-foreground">
                    {stat.label}
                  </span>
                  <span
                    className={`text-xl md:text-2xl font-semibold ${stat.color}`}
                  >
                    {stat.val}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground font-normal">
              Consistency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl md:text-4xl font-bold text-primary">
              {consistency}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Restart Button */}
      <div className="flex justify-center mt-4 md:mt-8">
        <Button
          variant="secondary"
          size="lg"
          onClick={(e) => {
            e.stopPropagation();
            onRestart();
          }}
          className="gap-2 px-8 w-full md:w-auto cursor-pointer"
        >
          <IconRefresh className="w-4 h-4" />
          Restart
        </Button>
      </div>
    </div>
  );
}
