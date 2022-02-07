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

const inheritedGameStatKey = 'statistics'
const gameStatKey = 'gameStats'

export type GameStats = {
  winDistribution: number[]
  gamesFailed: number
  currentStreak: number
  bestStreak: number
  totalGames: number
  successRate: number
}

export const saveStatsToLocalStorage = (gameStats: GameStats) => {
  localStorage.setItem(gameStatKey, JSON.stringify(gameStats))
}

export const loadStatsFromLocalStorage = () => {
  const stats = localStorage.getItem(gameStatKey)
  if (stats) {
    return (JSON.parse(stats) as GameStats)
  } else {

    type inheritedStatsType = {
      currentStreak: number
      maxStreak: number
      guesses: {[key: string]: number;}
      winPercentage: number
      gamesPlayed: number
      gamesWon: number
      averageGuesses: number
    }

    const inheritedStats = (JSON.parse(localStorage.getItem(inheritedGameStatKey)) as inheritedStatsType)

    if (inheritedStats) {
      let inheritedWinDistribution = [
        inheritedStats['guesses']['1'],
        inheritedStats['guesses']['2'],
        inheritedStats['guesses']['3'],
        inheritedStats['guesses']['4'],
        inheritedStats['guesses']['5'],
        inheritedStats['guesses']['6'],
        inheritedStats['guesses']['7'],
        inheritedStats['guesses']['8'],
        inheritedStats['guesses']['9'],
        inheritedStats['guesses']['10'],
        inheritedStats['guesses']['11'],
        inheritedStats['guesses']['12'],
      ]
      return ({
        winDistribution: inheritedWinDistribution,
        gamesFailed: (inheritedStats['gamesPlayed'] - inheritedStats['gamesWon']),
        currentStreak: inheritedStats['currentStreak'],
        bestStreak: inheritedStats['maxStreak'],
        totalGames: inheritedStats['gamesPlayed'],
        successRate: inheritedStats['winPercentage']
      } as GameStats)
    } else {
      return null
    }
  }
}
