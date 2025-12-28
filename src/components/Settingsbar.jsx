import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SettingsBar = ({
  isActive,
  includePunctuation,
  includeNumbers,
  wordCount,
  selectedTime,
  handleModeToggleChange,
  handleWordCountSelection,
  handleTimeSelection,
  WORD_OPTIONS = [10, 25, 50, 100],
  TIME_OPTIONS = [15, 30, 60, 120],
}) => {
  if (isActive) return null;

  return (
    <div className="flex justify-center w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div
        className="
        flex items-center gap-2 p-1.5 px-4 
        rounded-xl bg-secondary/20 backdrop-blur-sm 
        border border-border/40 text-muted-foreground
      "
      >
        {/* Section: Mode */}
        <div className="flex items-center gap-1">
          <ConfigButton
            active={includePunctuation}
            onClick={() => handleModeToggleChange("punctuation")}
          >
            @ punctuation
          </ConfigButton>
          <ConfigButton
            active={includeNumbers}
            onClick={() => handleModeToggleChange("numbers")}
          >
            # numbers
          </ConfigButton>
        </div>

        <Separator
          orientation="vertical"
          className="h-4 bg-muted-foreground/20 mx-2"
        />

        {/* Section: Words */}
        <div className="flex items-center gap-1">
          {WORD_OPTIONS.map((count) => (
            <ConfigButton
              key={count}
              active={wordCount === count}
              onClick={() => handleWordCountSelection(count)}
            >
              {count}
            </ConfigButton>
          ))}
        </div>

        <Separator
          orientation="vertical"
          className="h-4 bg-muted-foreground/20 mx-2"
        />

        {/* Section: Time */}
        <div className="flex items-center gap-1">
          {TIME_OPTIONS.map((time) => (
            <ConfigButton
              key={time}
              active={selectedTime === time}
              onClick={() => handleTimeSelection(time)}
            >
              {time}s
            </ConfigButton>
          ))}
        </div>
      </div>
    </div>
  );
};

// Internal Helper for consistent styling
const ConfigButton = ({ children, active, onClick }) => (
  <Button
    type="button"
    variant={active ? "secondary" : "ghost"}
    size="sm"
    onClick={onClick}
    className={cn(
      "px-3 py-1 text-xs font-medium transition-all duration-200 hover:text-foreground relative h-auto cursor-pointer",
      !active && "text-muted-foreground/60"
    )}
  >
    {children}
    {active && (
      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary animate-in zoom-in" />
    )}
  </Button>
);

export default SettingsBar;
