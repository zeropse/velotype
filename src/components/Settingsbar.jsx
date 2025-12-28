import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

const SettingsBar = ({
  isActive,
  includePunctuation,
  includeNumbers,
  wordCount,
  selectedTime,
  language,
  handleModeToggleChange,
  handleWordCountSelection,
  handleTimeSelection,
  handleLanguageChange,
  WORD_OPTIONS = [10, 25, 50, 100],
  TIME_OPTIONS = [15, 30, 60, 120],
  LANGUAGE_OPTIONS = [],
}) => {
  return (
    <>
      {/* Desktop  */}
      <div className="hidden sm:flex justify-center w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div
          className="
          flex items-center gap-2 p-1.5 px-4 
          rounded-xl bg-secondary/20 backdrop-blur-sm 
          border border-border/40 text-muted-foreground
        "
        >
          {/* Section 0: Language / Asset */}
          <div className="flex items-center gap-2 mr-2">
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger
                size="sm"
                className="text-xs min-w-40 cursor-pointer"
              >
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGE_OPTIONS.map((opt) => (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    className="cursor-pointer"
                  >
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator
            orientation="vertical"
            className="h-4 w-px mx-2 shrink-0 bg-primary"
          />

          {/* Section 1: Mode */}
          <div className="flex items-center h-full">
            <ConfigButton
              active={includePunctuation}
              onClick={() => handleModeToggleChange("punctuation")}
            >
              @ punctuation
            </ConfigButton>

            <Separator
              orientation="vertical"
              className="h-4 w-px mx-2 bg-primary shrink-0 self-center"
            />

            <ConfigButton
              active={includeNumbers}
              onClick={() => handleModeToggleChange("numbers")}
            >
              # numbers
            </ConfigButton>
          </div>

          <Separator
            orientation="vertical"
            className="h-4 w-px mx-2 shrink-0 bg-primary"
          />

          {/* Section 2: Words */}
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
            className="h-4 w-px mx-2 shrink-0 bg-primary"
          />

          {/* Section 3: Time */}
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

      {/* Mobile drawer */}
      {!isActive && (
        <div className="flex justify-center w-full sm:hidden">
          <Drawer direction="top">
            <DrawerTrigger asChild>
              <Button
                variant="secondary"
                size="sm"
                className="h-8 text-xs font-medium px-4 rounded-md border shadow-sm transition-all active:scale-95"
              >
                Open Settings
              </Button>
            </DrawerTrigger>

            <DrawerContent className="px-4 pb-8 pt-2 border-b rounded-b-3xl bg-background/98 backdrop-blur-md">
              {/* Subtle handle for top-direction drawer */}
              <div className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-muted/30 mb-4" />

              <DrawerHeader className="px-0 pt-0 pb-4">
                <DrawerTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/70">
                  Configuration
                </DrawerTitle>
              </DrawerHeader>

              <div className="grid gap-6">
                {/* Language - Full Width Row */}
                <div className="flex items-center justify-between gap-4 py-1">
                  <label className="text-xs font-medium text-foreground">
                    Language
                  </label>
                  <Select value={language} onValueChange={handleLanguageChange}>
                    <SelectTrigger
                      size="sm"
                      className="h-9 text-xs w-35 bg-muted/40 border-none shadow-none"
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUAGE_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="h-px bg-border/50" />

                {/* Mode & Word Count - Grid Layout */}
                <div className="space-y-5">
                  {/* Mode Section */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Modifiers
                    </span>
                    <div className="flex items-center gap-2">
                      <ConfigButton
                        active={includePunctuation}
                        onClick={() => handleModeToggleChange("punctuation")}
                        className="flex-1 py-2 text-[11px]"
                      >
                        @ punct
                      </ConfigButton>
                      <ConfigButton
                        active={includeNumbers}
                        onClick={() => handleModeToggleChange("numbers")}
                        className="flex-1 py-2 text-[11px]"
                      >
                        # nums
                      </ConfigButton>
                    </div>
                  </div>

                  {/* Words Section */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Word Count
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {WORD_OPTIONS.map((count) => (
                        <ConfigButton
                          key={count}
                          active={wordCount === count}
                          onClick={() => handleWordCountSelection(count)}
                          className="px-4 py-1.5 text-xs min-w-12.5"
                        >
                          {count}
                        </ConfigButton>
                      ))}
                    </div>
                  </div>

                  {/* Time Section */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Time Limit
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {TIME_OPTIONS.map((time) => (
                        <ConfigButton
                          key={time}
                          active={selectedTime === time}
                          onClick={() => handleTimeSelection(time)}
                          className="px-4 py-1.5 text-xs min-w-12.5"
                        >
                          {time}s
                        </ConfigButton>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      )}
    </>
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
