import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export function TypingArea({
  words,
  userInput,
  isActive,
  onInputChange,
  inputRef,
  containerRef,
}) {
  const [isMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    const userAgent = navigator.userAgent || "";
    const mobileRegex =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return mobileRegex.test(userAgent);
  });

  const renderText = () => {
    return words.split("").map((char, index) => {
      let color = "text-muted-foreground";
      let bg = "transparent";

      if (index < userInput.length) {
        if (userInput[index] === char) {
          color = "text-primary";
        } else {
          color = "text-red-500";
          bg = "bg-red-500/10";
        }
      }

      const isCursor = index === userInput.length;

      return (
        <span
          key={index}
          className={`relative ${color} ${bg} text-2xl font-mono leading-relaxed transition-colors duration-75`}
        >
          {isCursor && isActive && (
            <span className="absolute left-0 -top-1 h-8 w-0.5 bg-primary animate-pulse"></span>
          )}
          {char}
        </span>
      );
    });
  };

  return (
    <Card
      ref={containerRef}
      className="relative min-h-50 p-8 shadow-sm backdrop-blur-sm"
    >
      <Textarea
        ref={inputRef}
        value={userInput}
        onChange={onInputChange}
        className="absolute inset-0 opacity-0 cursor-default z-10"
        autoFocus={!isMobile}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />

      <div className="wrap-break-word select-none pointer-events-none">
        {renderText()}
      </div>
    </Card>
  );
}
