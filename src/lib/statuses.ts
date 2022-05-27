import { toHiragana } from '@koozaki/romaji-conv'
import { solution, isKatakana, unicodeSplit } from './words'
import { getStoredIsHintMode, loadShareStatusFromLocalStorage } from './localStorage'
import {
  CLOSE_STATUS_KATAKANA,
  CONSONANT_STATUS_KATAKANA,
  VOWEL_STATUS_KATAKANA,
  CLOSE_STATUS_HIRAGANA,
  CONSONANT_STATUS_HIRAGANA,
  VOWEL_STATUS_HIRAGANA,
} from '../constants/strings'

export type CharStatus = 'absent' | 'vowel' | 'consonant' | 'present' | 'close' | 'correct'

const closeStatusKana = (isKatakana ? CLOSE_STATUS_KATAKANA : CLOSE_STATUS_HIRAGANA)
const consonantStatusKana = (isKatakana ? CONSONANT_STATUS_KATAKANA : CONSONANT_STATUS_HIRAGANA)
const vowelStatusKana = (isKatakana ? VOWEL_STATUS_KATAKANA : VOWEL_STATUS_HIRAGANA)

export const getStatuses = (
  guesses: string[]
): { [key: string]: CharStatus } => {
  const charObj: { [key: string]: CharStatus } = {}
  const splitSolution = unicodeSplit(solution)
  let isHintMode = getStoredIsHintMode()

  const loaded = loadShareStatusFromLocalStorage()

  if (loaded) {
    isHintMode = loaded.isHintMode
  }

  guesses.forEach((word) => {
    unicodeSplit(word).forEach((letter, i) => {

      if (isHintMode) {
        vowelStatusKana.forEach((kana) => {
          if (kana.includes(letter) && kana.includes(splitSolution[i])) {
            //make status close
            return (charObj[toHiragana(letter)] = 'vowel')
          }
        })

        consonantStatusKana.forEach((kana) => {
          if (kana.includes(letter) && kana.includes(splitSolution[i])) {
            //make status close
            return (charObj[toHiragana(letter)] = 'consonant')
          }
        })

        closeStatusKana.forEach((kana) => {
          if (kana.includes(letter) && kana.includes(splitSolution[i])) {
            //make status close
            return (charObj[toHiragana(letter)] = 'close')
          }
        })
      }

      if (!splitSolution.includes(letter) && !['vowel', 'consonant', 'present', 'close', 'correct'].includes(charObj[toHiragana(letter)])) {
        // make status absent
        return (charObj[toHiragana(letter)] = 'absent')
      }

      if (letter === splitSolution[i]) {
        //make status correct
        return (charObj[toHiragana(letter)] = 'correct')
      }

      if (splitSolution.includes(letter) && !['close', 'correct'].includes(charObj[toHiragana(letter)])) {
        //make status present
        return (charObj[toHiragana(letter)] = 'present')
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

  let isHintMode = getStoredIsHintMode()

  const loaded = loadShareStatusFromLocalStorage()

  if (loaded) {
    isHintMode = loaded.isHintMode
  }

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

    if (isHintMode) {
      closeStatusKana.forEach((kana) => {
        if (kana.includes(letter) && kana.includes(splitSolution[i])) {
          // handles status close
          statuses[i] = 'close'
          return
        }
      })
    }

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
      consonantStatusKana.forEach((kana) => {
        if (kana.includes(letter) && kana.includes(splitSolution[i])) {
          // handles status consonant
          statuses[i] = 'consonant'
          return
        }
      })
    }

    if (statuses[i]) return

    if (isHintMode) {
      vowelStatusKana.forEach((kana) => {
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
