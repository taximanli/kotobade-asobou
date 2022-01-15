const gameStateKey = "gameState";

type StoredGameState = {
  guesses: string[];
};

export const saveGameStateToLocalStorage = (guesses: string[]) => {
  const gameState = {
    guesses,
  };
  localStorage.setItem(gameStateKey, JSON.stringify(gameState));
};

export const loadGameStateFromLocalStorage = () => {
  const state = localStorage.getItem(gameStateKey);

  return state ? (JSON.parse(state) as StoredGameState) : null;
};
