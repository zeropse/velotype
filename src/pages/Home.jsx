import { useState, useEffect, useRef, useCallback } from "react";
import { generateWords } from "@/lib/words";
import { Button } from "@/components/ui/button";
import { IconRefresh } from "@tabler/icons-react";
import { TypingArea } from "@/components/TypingArea";
import { StatsDashboard } from "@/components/StatsDashboard";

const TIME_OPTIONS = [15, 30, 60];

export default function Home() {
  const [selectedTime, setSelectedTime] = useState(30);
  const [words, setWords] = useState("");
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Stats
  const [wpm, setWpm] = useState(0);
  const [rawWpm, setRawWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [consistency, setConsistency] = useState(0);
  const [charStats, setCharStats] = useState({
    correct: 0,
    incorrect: 0,
    extra: 0,
    missed: 0,
  });
  const [history, setHistory] = useState([]);

  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const userInputRef = useRef(""); // Ref to access current input in interval
  const wordsRef = useRef(""); // Ref to access current words in interval

  // Initialize game
  const resetGame = useCallback(
    (time = selectedTime) => {
      const newWords = generateWords(50);
      setWords(newWords);
      wordsRef.current = newWords;

      setUserInput("");
      userInputRef.current = "";

      setTimeLeft(time);
      setIsActive(false);
      setIsFinished(false);
      setWpm(0);
      setRawWpm(0);
      setAccuracy(0);
      setConsistency(0);
      setCharStats({ correct: 0, incorrect: 0, extra: 0, missed: 0 });
      setHistory([]);

      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
    [selectedTime]
  );

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  const calculateResults = useCallback(() => {
    const currentInput = userInputRef.current;
    const currentWords = wordsRef.current;
    const timeElapsed = selectedTime - timeLeft;
    const durationInMinutes =
      (timeElapsed === 0 ? selectedTime : selectedTime) / 60;

    let correctChars = 0;
    let incorrectChars = 0;
    // Simple char counting
    for (let i = 0; i < currentInput.length; i++) {
      if (currentInput[i] === currentWords[i]) {
        correctChars++;
      } else {
        incorrectChars++;
      }
    }

    const calculatedWpm = Math.round(correctChars / 5 / durationInMinutes);
    const calculatedRawWpm = Math.round(
      currentInput.length / 5 / durationInMinutes
    );
    const calculatedAccuracy =
      Math.round((correctChars / currentInput.length) * 100) || 0;

    // Consistency: Coefficient of Variation of WPM samples
    const wpmValues = history.map((h) => h.wpm);
    let cons = 0;
    if (wpmValues.length > 0) {
      const mean = wpmValues.reduce((a, b) => a + b, 0) / wpmValues.length;
      const variance =
        wpmValues.reduce((a, b) => a + Math.pow(b - mean, 2), 0) /
        wpmValues.length;
      const stdDev = Math.sqrt(variance);
      if (mean > 0) {
        const cv = (stdDev / mean) * 100;
        cons = Math.max(0, 100 - cv); // Clamp to 0
      }
    }
    setConsistency(Math.round(cons));

    setWpm(calculatedWpm);
    setRawWpm(calculatedRawWpm);
    setAccuracy(calculatedAccuracy);
    setCharStats({
      correct: correctChars,
      incorrect: incorrectChars,
      extra: 0, // Not implementing extra chars logic yet
      missed: 0, // Not implementing missed chars logic yet
    });
  }, [selectedTime, timeLeft, history]);

  const finishGame = useCallback(() => {
    setIsActive(false);
    setIsFinished(true);
    calculateResults();
  }, [calculateResults]);

  // Timer and Stats logic
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          return newTime;
        });

        // Record stats
        const currentInput = userInputRef.current;
        const currentWords = wordsRef.current;

        const durationInMinutes = (selectedTime - timeLeft + 1) / 60;

        let correctChars = 0;
        let errorChars = 0;
        for (let i = 0; i < currentInput.length; i++) {
          if (currentInput[i] === currentWords[i]) {
            correctChars++;
          } else {
            errorChars++;
          }
        }

        const currentWpm =
          Math.round(correctChars / 5 / durationInMinutes) || 0;
        const currentRawWpm =
          Math.round(currentInput.length / 5 / durationInMinutes) || 0;

        setHistory((prev) => [
          ...prev,
          {
            time: selectedTime - timeLeft + 1,
            wpm: currentWpm,
            raw: currentRawWpm,
            errors: errorChars,
          },
        ]);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      finishGame();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, selectedTime, finishGame]);

  const handleInputChange = (e) => {
    const { value } = e.target;

    if (isFinished) return;

    if (!isActive && value.length === 1) {
      setIsActive(true);
    }

    setUserInput(value);
    userInputRef.current = value;

    if (value.length >= words.length) {
      finishGame();
    }
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  // Focus input when clicking anywhere in the container
  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] p-8 outline-none"
      onClick={handleContainerClick}
    >
      <div className="max-w-5xl w-full space-y-8">
        {!isFinished && (
          <div className="flex justify-between items-center animate-in fade-in slide-in-from-top-4">
            <div className="flex gap-2 bg-secondary/50 p-1 rounded-lg">
              {TIME_OPTIONS.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "ghost"}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTimeSelection(time);
                  }}
                  className="h-8 px-3"
                >
                  {time}s
                </Button>
              ))}
            </div>

            <div className="text-3xl font-bold font-mono text-yellow-500">
              {timeLeft}s
            </div>
          </div>
        )}

        {/* Stats Overlay */}
        {isFinished ? (
          <StatsDashboard
            wpm={wpm}
            accuracy={accuracy}
            rawWpm={rawWpm}
            charStats={charStats}
            consistency={consistency}
            time={selectedTime}
            history={history}
            onRestart={resetGame}
          />
        ) : (
          /* Typing Area */
          <TypingArea
            words={words}
            userInput={userInput}
            isActive={isActive}
            onInputChange={handleInputChange}
            inputRef={inputRef}
            containerRef={containerRef}
          />
        )}

        {!isFinished && (
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="lg"
              onClick={(e) => {
                e.stopPropagation();
                resetGame();
              }}
              className="gap-2 px-8 text-muted-foreground hover:text-primary cursor-pointer"
            >
              <IconRefresh className="w-4 h-4" />
              Restart
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
