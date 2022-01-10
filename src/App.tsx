import { useState, useEffect } from "react";
import { Grid } from "./components/grid/Grid";
import { Keyboard } from "./components/keyboard/Keyboard";
import { WinModal } from "./components/win-modal/WinModal";
import { getGuessStatuses } from "./lib/statuses";
import { solution, isWordInWordList, isWinningWord } from "./lib/words";

function App() {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameWon, setIsGameWon] = useState(false);
  const [isWinModalOpen, setIsWinModalOpen] = useState(false);

  useEffect(() => {
    if (isGameWon) {
      setIsWinModalOpen(true);
    }
  }, [isGameWon]);

  const onChar = (value: string) => {
    if (currentGuess.length < 5 && guesses.length < 6) {
      setCurrentGuess(`${currentGuess}${value}`);
    }
  };

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const onEnter = () => {
    if (!isWordInWordList(currentGuess)) {
      return console.error("not in word list");
      // TODO add messaging for user
    }
    if (currentGuess.length === 5 && guesses.length < 6 && !isGameWon) {
      if (isWinningWord(currentGuess)) {
        setIsGameWon(true);
      }
      setGuesses([...guesses, currentGuess]);
      setCurrentGuess("");
    }
  };

  return (
    <div>
      <Grid guesses={guesses} currentGuess={currentGuess} />
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
      />
      <WinModal
        isOpen={isWinModalOpen}
        handleClose={() => setIsWinModalOpen(false)}
      />
    </div>
  );
}

export default App;
