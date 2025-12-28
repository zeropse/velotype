import { useState, useEffect, useRef, useCallback } from "react";
import { generateWords } from "@/lib/words";
import { LANGUAGE_OPTIONS } from "@/lib/languages";
import { Button } from "@/components/ui/button";
import { IconRefresh } from "@tabler/icons-react";
import { TypingArea } from "@/components/TypingArea";
import { StatsDashboard } from "@/components/StatsDashboard";
import { Badge } from "@/components/ui/badge";
import SettingsBar from "@/components/Settingsbar";
import { saveRunAndCheckPB } from "@/lib/history";

const TIME_OPTIONS = [15, 30, 60];
const WORD_OPTIONS = [50, 75, 100];

export default function Home() {
  const [selectedTime, setSelectedTime] = useState(30);
  const [words, setWords] = useState("");
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [wordCount, setWordCount] = useState(50);
  const [includePunctuation, setIncludePunctuation] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [language, setLanguage] = useState("english");
  const [wordList, setWordList] = useState(null);

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
  const userInputRef = useRef("");
  const wordsRef = useRef("");
  const loadedLanguagesRef = useRef(new Set());

  // Initialize game
  const resetGame = useCallback(
    (options = {}) => {
      const time = options.time ?? selectedTime;
      const count = options.wordCount ?? wordCount;
      const punctuation = options.includePunctuation ?? includePunctuation;
      const numbers = options.includeNumbers ?? includeNumbers;
      const list = options.wordList ?? wordList;

      const newWords = generateWords(count, {
        punctuation,
        numbers,
        wordList: list,
      });
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
    [selectedTime, wordCount, includePunctuation, includeNumbers, wordList]
  );

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  // Load words for the selected language asset
  useEffect(() => {
    const selected = LANGUAGE_OPTIONS.find((opt) => opt.value === language);
    if (!selected) return;

    let cancelled = false;

    const load = async () => {
      try {
        // If we've already loaded this language once in this session,just reset the game without fetching the asset again.
        if (loadedLanguagesRef.current.has(selected.value)) {
          if (!cancelled) {
            resetGame();
          }
          return;
        }

        const res = await fetch(selected.asset);
        const parsed = await res.json();

        if (!cancelled && Array.isArray(parsed) && parsed.length > 0) {
          loadedLanguagesRef.current.add(selected.value);
          setWordList(parsed);
          resetGame({ wordList: parsed });
        }
      } catch {
        // If asset fails to load, fall back to built-in words.js list
        if (!cancelled) {
          setWordList(null);
          resetGame({ wordList: null });
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [language, resetGame]);

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
        cons = Math.max(0, 100 - cv);
      }
    }
    const finalConsistency = Math.round(cons);

    const finalCharStats = {
      correct: correctChars,
      incorrect: incorrectChars,
      extra: 0, // Not implementing extra chars logic yet
      missed: 0, // Not implementing missed chars logic yet
    };

    setConsistency(finalConsistency);
    setWpm(calculatedWpm);
    setRawWpm(calculatedRawWpm);
    setAccuracy(calculatedAccuracy);
    setCharStats(finalCharStats);

    return {
      wpm: calculatedWpm,
      rawWpm: calculatedRawWpm,
      accuracy: calculatedAccuracy,
      consistency: finalConsistency,
      charStats: finalCharStats,
    };
  }, [selectedTime, timeLeft, history]);

  const finishGame = useCallback(() => {
    setIsActive(false);
    setIsFinished(true);

    const result = calculateResults();

    try {
      saveRunAndCheckPB({
        time: selectedTime,
        wordCount,
        includePunctuation,
        includeNumbers,
        language,
        wpm: result.wpm,
        rawWpm: result.rawWpm,
        accuracy: result.accuracy,
        consistency: result.consistency,
        charStats: result.charStats,
      });
    } catch {
      // ignore
    }
  }, [
    calculateResults,
    selectedTime,
    wordCount,
    includePunctuation,
    includeNumbers,
    language,
  ]);

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
    resetGame({ time });
  };

  const handleWordCountSelection = (count) => {
    setWordCount(count);
    resetGame({ wordCount: count });
  };

  const handleModeToggleChange = (mode) => {
    if (mode === "punctuation") {
      const newPunctuation = !includePunctuation;
      setIncludePunctuation(newPunctuation);
      resetGame({
        includePunctuation: newPunctuation,
        includeNumbers,
      });
    }

    if (mode === "numbers") {
      const newNumbers = !includeNumbers;
      setIncludeNumbers(newNumbers);
      resetGame({
        includePunctuation: includePunctuation,
        includeNumbers: newNumbers,
      });
    }
  };

  const handleLanguageChange = (value) => {
    setLanguage(value);
  };

  // Focus input when clicking anywhere in the container
  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    document.title = "Velotype | Minimal, focused typing test to boost speed.";
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] p-8 outline-none"
      onClick={handleContainerClick}
    >
      <div className="max-w-5xl w-full space-y-8">
        {!isFinished && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-4">
            {/* Timer */}
            <div className="flex justify-center">
              <Badge
                variant="secondary"
                className="px-5 py-2 rounded-full border border-border/60 shadow-sm flex items-center justify-center"
              >
                <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground mr-3">
                  Time left
                </span>
                <span className="text-3xl font-bold font-mono text-primary">
                  {timeLeft}s
                </span>
              </Badge>
            </div>

            <SettingsBar
              isActive={isActive}
              includePunctuation={includePunctuation}
              includeNumbers={includeNumbers}
              wordCount={wordCount}
              selectedTime={selectedTime}
              language={language}
              handleModeToggleChange={handleModeToggleChange}
              handleWordCountSelection={handleWordCountSelection}
              handleTimeSelection={handleTimeSelection}
              WORD_OPTIONS={WORD_OPTIONS}
              TIME_OPTIONS={TIME_OPTIONS}
              LANGUAGE_OPTIONS={LANGUAGE_OPTIONS}
              handleLanguageChange={handleLanguageChange}
            />
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
                setSelectedTime(30);
                setWordCount(50);
                setIncludePunctuation(false);
                setIncludeNumbers(false);
                setLanguage("english");
                setWordList(null);
                loadedLanguagesRef.current.clear();
                resetGame({
                  time: 30,
                  wordCount: 50,
                  includePunctuation: false,
                  includeNumbers: false,
                  wordList: null,
                });
              }}
              className="gap-2 px-8 text-muted-foreground hover:text-primary cursor-pointer"
            >
              <IconRefresh className="w-4 h-4" />
              Reset
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
