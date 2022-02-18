import { solution } from './words'
import { CONSONANT_STATUS_KANA, CLOSE_STATUS_KANA } from '../constants/strings'

export type CharStatus = 'absent' | 'present' | 'consonant' | 'close' | 'correct'

export const getStatuses = (
  guesses: string[]
): { [key: string]: CharStatus } => {
  const charObj: { [key: string]: CharStatus } = {}

  guesses.forEach((word) => {
    word.split('').forEach((letter, i) => {
      CONSONANT_STATUS_KANA.forEach((kana) => {
        if (kana.includes(letter) && kana.includes(solution[i])) {
          //make status close
          return (charObj[letter] = 'consonant')
        }
      })

      CLOSE_STATUS_KANA.forEach((kana) => {
        if (kana.includes(letter) && kana.includes(solution[i])) {
          //make status close
          return (charObj[letter] = 'close')
        }
      })

      if (!solution.includes(letter) && !['present', 'consonant', 'close', 'correct'].includes(charObj[letter])) {
        // make status absent
        return (charObj[letter] = 'absent')
      }

      if (letter === solution[i]) {
        //make status correct
        return (charObj[letter] = 'correct')
      }

      if (!['consonant', 'close', 'correct'].includes(charObj[letter])) {
        //make status present
        return (charObj[letter] = 'present')
      }
    })
  })

  return charObj
}

export const getGuessStatuses = (guess: string): CharStatus[] => {
  const splitSolution = solution.split('')
  const splitGuess = guess.split('')

  const solutionCharsTaken = splitSolution.map((_) => false)

  const statuses: CharStatus[] = Array.from(Array(guess.length))

  // handle all correct cases first
  splitGuess.forEach((letter, i) => {
    if (letter === splitSolution[i]) {
      statuses[i] = 'correct'
      solutionCharsTaken[i] = true
      return
    }
  })

  splitGuess.forEach((letter, i) => {
    if (statuses[i]) return

    CONSONANT_STATUS_KANA.forEach((kana) => {
      if (kana.includes(letter) && kana.includes(splitSolution[i])) {
        // handles status close
        statuses[i] = 'consonant'
        return
      }
    })

    if (statuses[i]) return

    CLOSE_STATUS_KANA.forEach((kana) => {
      if (kana.includes(letter) && kana.includes(splitSolution[i])) {
        // handles status close
        statuses[i] = 'close'
        return
      }
    })

    if (statuses[i]) return

    if (!splitSolution.includes(letter)) {
      // handles the absent case
      statuses[i] = 'absent'
      return
    }

    // now we are left with "present"s
    const indexOfPresentChar = splitSolution.findIndex(
      (x, index) => x === letter && !solutionCharsTaken[index]
    )

    if (indexOfPresentChar > -1) {
      statuses[i] = 'present'
      solutionCharsTaken[indexOfPresentChar] = true
      return
    } else {
      statuses[i] = 'absent'
      return
    }
  })

  return statuses
}
