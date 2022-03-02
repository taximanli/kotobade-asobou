import { getGuessStatuses } from './statuses'
import { solutionIndex } from './words'
import { GAME_TITLE, GAME_LINK } from '../constants/strings'
import { MAX_CHALLENGES } from '../constants/settings'
import { loadShareStatusFromLocalStorage } from '../lib/localStorage'

export const shareStatus = (
  guesses: string[],
  lost: boolean,
  isHintMode: boolean,
  isHardMode: boolean,
  isDarkMode: boolean,
  isHighContrastMode: boolean
) => {
  const loaded = loadShareStatusFromLocalStorage()

  if (loaded) {
    isHintMode = loaded.isHintMode
    isHardMode = loaded.isHardMode
  }

  navigator.clipboard.writeText(
    `${GAME_TITLE} ${solutionIndex} ${
      lost ? 'X' : guesses.length
    }/${MAX_CHALLENGES}${isHardMode ? '*' : ''}${isHintMode ? '?' : ''}\n` +
    `${GAME_LINK}\n` +
      generateEmojiGrid(guesses, getEmojiTiles(isDarkMode, isHighContrastMode))
  )
}

export const generateEmojiGrid = (guesses: string[], tiles: string[]) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(guess)
      return guess
        .split('')
        .map((_, i) => {
          switch (status[i]) {
            case 'correct':
              return tiles[0]
            case 'present':
              return tiles[1]
            case 'close':
              return tiles[2]
            case 'consonant':
              return tiles[3]
            case 'vowel':
              return tiles[4]
            default:
              return tiles[5]
          }
        })
        .join('')
    })
    .join('\n')
}

const getEmojiTiles = (isDarkMode: boolean, isHighContrastMode: boolean) => {
  let tiles: string[] = []
  tiles.push(isHighContrastMode ? '🟧' : '🟩') // correct
  tiles.push(isHighContrastMode ? '🟦' : '🟨') // present
  tiles.push(isHighContrastMode ? '🟣' : '🟢') // close
  tiles.push('↕️') // consonant
  tiles.push('↔️') // vowel
  tiles.push(isDarkMode ? '⬛' : '⬜') // absent
  return tiles
}
