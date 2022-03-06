import { getGuessStatuses } from './statuses'
import { solutionIndex } from './words'
import { GAME_TITLE, GAME_LINK } from '../constants/strings'
import { MAX_CHALLENGES } from '../constants/settings'
import { loadShareStatusFromLocalStorage } from '../lib/localStorage'
import { shareStatusType } from '../components/modals/StatsModal'

export const shareStatus = (
  shareStatusType: shareStatusType,
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

  const endOfLine = (shareStatusType === 'tweet' ? '%0A' : '\n')

  const shareText = 
  `${GAME_TITLE} ${solutionIndex} ${
    lost ? 'X' : guesses.length
  }/${MAX_CHALLENGES}${isHardMode ? '*' : ''}${isHintMode ? '?' : ''}` + endOfLine +
  `${GAME_LINK}` + endOfLine +
    generateEmojiGrid(endOfLine, guesses, getEmojiTiles(isDarkMode, isHighContrastMode))

  if (shareStatusType === 'tweet') {
    window.open("https://twitter.com/intent/tweet?text=" + shareText, "_blank")
  }
  else
  if (shareStatusType === 'clipboard') {
    navigator.clipboard.writeText(shareText)
  }
  else
  {
    return shareText
  }
}

export const generateEmojiGrid = (endOfLine: string, guesses: string[], tiles: string[]) => {
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
            case 'consonant-correct':
              return tiles[3]
            case 'vowel-correct':
              return tiles[4]
            case 'consonant-present':
              return tiles[3]
            case 'vowel-present':
              return tiles[4]
            default:
              return tiles[5]
          }
        })
        .join('')
    })
    .join(endOfLine)
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
