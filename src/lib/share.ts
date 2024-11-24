import { getGuessStatuses } from './statuses'
import { getDateByIndex, getIsLatestGame, solution, solutionIndex, unicodeSplit } from './words'
import { GAME_TITLE, GAME_LINK } from '../constants/strings'
import { MAX_CHALLENGES } from '../constants/settings'
import { UAParser } from 'ua-parser-js'
import { loadShareStatusFromLocalStorage } from '../lib/localStorage'
import { shareStatusType } from '../components/modals/StatsModal'

const webShareApiDeviceTypes: string[] = ['mobile', 'smarttv', 'wearable']
const parser = new UAParser()
const browser = parser.getBrowser()
const device = parser.getDevice()

export const shareStatus = (
  shareStatusType: shareStatusType,
  guesses: string[],
  lost: boolean,
  isHintMode: boolean,
  isHardMode: boolean,
  isDarkMode: boolean,
  isHighContrastMode: boolean,
  handleShareToClipboard: () => void
) => {
  const isLatestGame = getIsLatestGame()
  const endOfLine = (shareStatusType === 'tweet' || shareStatusType === 'threads' || shareStatusType === 'bluesky' || shareStatusType === 'line' ? '%0A' : '\n')
  const loaded = loadShareStatusFromLocalStorage()

  if (loaded) {
    isHintMode = loaded.isHintMode
    isHardMode = loaded.isHardMode
  }

  const textToShare = 
  (isLatestGame ? '' : getDateByIndex(solutionIndex).toISODate() + ' 🕒' + endOfLine) +
  `${GAME_TITLE} ${solutionIndex} ${
    lost ? 'X' : guesses.length
  }/${MAX_CHALLENGES}${isHardMode ? '*' : ''}${isHintMode ? '?' : ''}` + endOfLine +
  `${GAME_LINK}` + endOfLine +
    generateEmojiGrid(endOfLine, guesses, getEmojiTiles(isDarkMode, isHighContrastMode))

  if (shareStatusType === 'tweet') {
    window.open("https://twitter.com/intent/tweet?text=" + textToShare, "_blank")
  }
  else
  if (shareStatusType === 'threads') {
    window.open("https://www.threads.net/intent/post?text=" + textToShare, "_blank")
  }
  else
  if (shareStatusType === 'bluesky') {
    window.open("https://bsky.app/intent/compose?text=" + textToShare, "_blank")
  }
  else
  if (shareStatusType === 'line') {
    window.open("https://line.me/R/share?text=" + textToShare, "_blank")
  }
  else
  if (shareStatusType === 'clipboard') {
    const shareData = { text: textToShare }

    let shareSuccess = false
  
    try {
      if (attemptShare(shareData)) {
        navigator.share(shareData)
        shareSuccess = true
      }
    } catch (error) {
      shareSuccess = false
    }
  
    if (!shareSuccess) {
      navigator.clipboard.writeText(textToShare)
      handleShareToClipboard()
    }
  }
  else
  {
    return textToShare
  }
}

export const generateEmojiGrid = (endOfLine: string, guesses: string[], tiles: string[]) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(guess, solution)
      const splitGuess = unicodeSplit(guess)

      return splitGuess
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
    .join(endOfLine)
}

const attemptShare = (shareData: object) => {
  return (
    // Deliberately exclude Firefox Mobile, because its Web Share API isn't working correctly
    browser.name?.toUpperCase().indexOf('FIREFOX') === -1 &&
    webShareApiDeviceTypes.indexOf(device.type ?? '') !== -1 &&
    navigator.canShare &&
    navigator.canShare(shareData) &&
    navigator.share
  )
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
