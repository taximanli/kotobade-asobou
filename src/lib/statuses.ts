import { solution, unicodeSplit } from './words'
import { getStoredIsHintMode } from './localStorage'
import { CLOSE_STATUS_KANA, CONSONANT_STATUS_KANA, VOWEL_STATUS_KANA } from '../constants/strings'

export type CharStatus = 'absent' | 'vowel' | 'consonant' | 'present' | 'close' | 'correct'

export const getStatuses = (
  guesses: string[]
): { [key: string]: CharStatus } => {
  const charObj: { [key: string]: CharStatus } = {}
  const splitSolution = unicodeSplit(solution)
  const isHintMode = getStoredIsHintMode()

  guesses.forEach((word) => {
    unicodeSplit(word).forEach((letter, i) => {

      if (isHintMode) {
        VOWEL_STATUS_KANA.forEach((kana) => {
          if (kana.includes(letter) && kana.includes(splitSolution[i])) {
            //make status close
            return (charObj[letter] = 'vowel')
          }
        })

        CONSONANT_STATUS_KANA.forEach((kana) => {
          if (kana.includes(letter) && kana.includes(splitSolution[i])) {
            //make status close
            return (charObj[letter] = 'consonant')
          }
        })
      }

      CLOSE_STATUS_KANA.forEach((kana) => {
        if (kana.includes(letter) && kana.includes(splitSolution[i])) {
          //make status close
          return (charObj[letter] = 'close')
        }
      })

      if (!splitSolution.includes(letter) && !['vowel', 'consonant', 'present', 'close', 'correct'].includes(charObj[letter])) {
        // make status absent
        return (charObj[letter] = 'absent')
      }

      if (letter === splitSolution[i]) {
        //make status correct
        return (charObj[letter] = 'correct')
      }

      if (splitSolution.includes(letter) && !['close', 'correct'].includes(charObj[letter])) {
        //make status present
        return (charObj[letter] = 'present')
      }
    })
  })

  return charObj
}

export const getGuessStatuses = (guess: string): CharStatus[] => {
  const splitSolution = unicodeSplit(solution)
  const splitGuess = unicodeSplit(guess)

  const solutionCharsTaken = splitSolution.map((_) => false)

  const statuses: CharStatus[] = Array.from(Array(guess.length))

  const isHintMode = getStoredIsHintMode()

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

    CLOSE_STATUS_KANA.forEach((kana) => {
      if (kana.includes(letter) && kana.includes(splitSolution[i])) {
        // handles status close
        statuses[i] = 'close'
        return
      }
    })

    if (statuses[i]) return

    // now we are left with "present"s
    const indexOfPresentChar = splitSolution.findIndex(
      (x, index) => x === letter && !solutionCharsTaken[index]
    )

    if (indexOfPresentChar > -1) {
      statuses[i] = 'present'
      solutionCharsTaken[indexOfPresentChar] = true
      return
    }

    if (statuses[i]) return

    if (isHintMode) {
      CONSONANT_STATUS_KANA.forEach((kana) => {
        if (kana.includes(letter) && kana.includes(splitSolution[i])) {
          // handles status consonant
          statuses[i] = 'consonant'
          return
        }
      })
    }

    if (statuses[i]) return

    if (isHintMode) {
      VOWEL_STATUS_KANA.forEach((kana) => {
        if (kana.includes(letter) && kana.includes(splitSolution[i])) {
          // handles status vowel
          statuses[i] = 'vowel'
          return
        }
      })
    }

    if (statuses[i]) {
      return
    } else {
      // handles the absent case
      statuses[i] = 'absent'
      return
    }

    /*
    if (!splitSolution.includes(letter)) {
      // handles the absent case
      statuses[i] = 'absent'
      return
    }
    */
  })

  return statuses
}
