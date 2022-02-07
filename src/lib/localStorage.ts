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

export type inheritedStatsType = {
  currentStreak: number
  maxStreak: number
  guesses: {[key: string]: number;}
  winPercentage: number
  gamesPlayed: number
  gamesWon: number
  averageGuesses: number
}

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
    const inheritedStats = localStorage.getItem(inheritedGameStatKey)
    if (inheritedStats) {
      let parsedInheritedStats = (JSON.parse(inheritedStats) as inheritedStatsType)
      if (parsedInheritedStats) {
        let inheritedWinDistribution = [
          parsedInheritedStats['guesses']['1'],
          parsedInheritedStats['guesses']['2'],
          parsedInheritedStats['guesses']['3'],
          parsedInheritedStats['guesses']['4'],
          parsedInheritedStats['guesses']['5'],
          parsedInheritedStats['guesses']['6'],
          parsedInheritedStats['guesses']['7'],
          parsedInheritedStats['guesses']['8'],
          parsedInheritedStats['guesses']['9'],
          parsedInheritedStats['guesses']['10'],
          parsedInheritedStats['guesses']['11'],
          parsedInheritedStats['guesses']['12'],
        ]
        return ({
          winDistribution: inheritedWinDistribution,
          gamesFailed: (parsedInheritedStats['gamesPlayed'] - parsedInheritedStats['gamesWon']),
          currentStreak: parsedInheritedStats['currentStreak'],
          bestStreak: parsedInheritedStats['maxStreak'],
          totalGames: parsedInheritedStats['gamesPlayed'],
          successRate: parsedInheritedStats['winPercentage']
        } as GameStats)
      }
    } else {
      return null
    }
  }
}
