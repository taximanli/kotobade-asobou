const gameStateKey = 'gameState'

type StoredGameState = {
  guesses: string[]
  solution: string
}

export const saveGameStateToLocalStorage = (gameState: StoredGameState) => {
  localStorage.setItem(gameStateKey, JSON.stringify(gameState))
}

export const loadGameStateFromLocalStorage = () => {
  const state = localStorage.getItem(gameStateKey)

  return state ? (JSON.parse(state) as StoredGameState) : null
}

const gameStatKey = 'gameStats'

type StoredGameStats = {
  stats: number[]
}

export const saveStatsToLocalStorage = ( gameStats: StoredGameStats) => {
  localStorage.setItem(gameStatKey, JSON.stringify(gameStats))
}

export const loadStatsFromLocalStorage = () => {
  const stats = localStorage.getItem(gameStatKey)
  
  return /* stats ? (JSON.parse(stats) as StoredGameStats) :*/ [0,0,0,0,0,0,0,0,0]
}
