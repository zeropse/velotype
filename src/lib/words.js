import commonWordsData from "@/data/commonWords.json";

export const commonWords = commonWordsData;

const endPunctuation = [".", ",", "!", "?", ";", ":"];

export const generateWords = (count = 50, options = {}) => {
  const { punctuation = false, numbers = false, wordList } = options;
  let result = [];

  const sourceWords =
    Array.isArray(wordList) && wordList.length > 0 ? wordList : commonWords;

  for (let i = 0; i < count; i++) {
    // 1. Pick a random word
    let word = sourceWords[Math.floor(Math.random() * sourceWords.length)];

    // 2. Handle Numbers (approx 10% chance if enabled)
    if (numbers && Math.random() < 0.1) {
      word = Math.floor(Math.random() * 1000).toString();
    }

    // 3. Handle Punctuation (approx 25% chance if enabled)
    if (punctuation && !/^\d+$/.test(word)) {
      // Don't punctuate standalone numbers
      const rand = Math.random();

      if (rand < 0.05) {
        // Quote wrap (5% chance)
        word = `"${word}"`;
      } else if (rand < 0.15) {
        // Capitalize (10% chance)
        word = word.charAt(0).toUpperCase() + word.slice(1);
        // Add end punctuation
        word +=
          endPunctuation[Math.floor(Math.random() * endPunctuation.length)];
      } else if (rand < 0.2) {
        // Just Capitalize
        word = word.charAt(0).toUpperCase() + word.slice(1);
      }
    }

    result.push(word);
  }

  return result.join(" ");
};
