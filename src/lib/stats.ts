/**
** An attempt at a statistics object and its interface
** 
** James Sturgis 18/1/2022
**/

import {
  loadStatsFromLocalStorage,
  saveStatsToLocalStorage
} from './localStorage'

var bestStreak: number = 0
var currentStreak: number = 0
var data: number[] = [0,0,0,0,0,0,0]   // Persistent data

export const addEvent = (count: number) => {
                                       // Count is number of incorrect guesses before end.
  if(count < 0) { count = 0 }          // Should not really need this
  if( count > 5 ){                     // A fail situation
    currentStreak = 0                  // End current streak
    data[6] += 1                       // Increase number of fails
  } else {
    data[count] += 1                   // Increase counters
    currentStreak += 1
    if( bestStreak < currentStreak ){
      bestStreak = currentStreak
    }
  }
  saveStats()
}

export const resetStats = () => {
  currentStreak = 0
  bestStreak = 0
  data = [0,0,0,0,0,0,0]
}

export const saveStats = () => {
  saveStatsToLocalStorage({ data, bestStreak, currentStreak })
}

export const loadStats = () => {
  const loaded = loadStatsFromLocalStorage()
  resetStats()
  if( loaded ){
    data = loaded.data
    bestStreak = loaded.bestStreak
    currentStreak = loaded.currentStreak
  }
}

const trys = data.reduce((a,b) => a+b , 0 )

export const trysStat          = String(trys)
export const successRateStat   = String(Math.round((100*(trys - data[6])/Math.max(trys,1))))+"%"
export const bestStreakStat    = String(bestStreak)
export const currentStreakStat = String(currentStreak)

