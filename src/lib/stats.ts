/**
** An attempt at a statistics object and its interface
**/

import {
  loadStatsFromLocalStorage,
  saveStatsToLocalStorage
} from './localStorage'

// In stats array elements 0-5 are successes in 1-6 trys
// stats[6] is the number of failures
// stats[7] is the currentStreak
// stats[8] is the bestStreak

export const failures      = (stats: number[] ) => { return stats[6] }
export const currentStreak = (stats: number[] ) => { return stats[7] }
export const bestStreak    = (stats: number[] ) => { return stats[8] }

export const addEvent = (stats: number[], count: number) => {
                                        // Count is number of incorrect guesses before end.
  if(count < 0) { count = 0 }           // Should not really need this
  if( count > 5 ){                      // A fail situation
    stats[7] = 0                        // End current streak
    stats[6] += 1                       // Increase number of fails
  } else {
    stats[count] += 1                   // Increase counters
    stats[7] += 1
    if( bestStreak(stats) < currentStreak(stats) ){
      stats[8] = currentStreak(stats)
    }
  }
  saveStats(stats)
  return stats
}

export const resetStats = () => {
  return [0,0,0,0,0,0,0,0,0]
}

export const saveStats = (stats: number[]) => {
  const distribution = stats.slice(0,7)
  const current = currentStreak(stats)
  const best = bestStreak(stats)
  saveStatsToLocalStorage({ distribution , current, best })
}

export const loadStats = () => {
  const loaded = loadStatsFromLocalStorage()
  var stats  = resetStats()
  if( loaded ){
    stats = loaded.distribution
    stats[7] = loaded.current
    stats[8] = loaded.best
  }
  return ( stats )
}

export const trys = (stats: number[] ) => {
  return(stats.slice(0,7).reduce((a,b) => a+b , 0 ))
}

export const successRate = (stats: number[] ) => {
  return(Math.round((100*(trys(stats) - failures(stats)))/Math.max(trys(stats),1)))
}



