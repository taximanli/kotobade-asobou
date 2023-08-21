import { ENABLE_ARCHIVED_GAMES } from '../constants/settings'
import { WORDS } from '../constants/wordlist'
import { VALID_GUESSES } from '../constants/validGuesses'
import { t } from '../constants/strings'
import { getToday } from './dateutils'
import { getGuessStatuses } from './statuses'
import { getStoredTimezone, setStoredGameIndex, removeStoredGameIndex, getStoredGameIndex } from './localStorage'
import { DateTime, Interval } from 'luxon'
import { default as GraphemeSplitter } from 'grapheme-splitter'
import { toHiragana, toKatakana } from '@koozaki/romaji-conv'

// January 23, 2022 Game Epoch
const msInDay = 86400000
export const firstGameDate = DateTime.utc(2022, 1, 23)
export const periodInDays = 1

export const isWordInWordList = (word: string) => {
  return (
    WORDS.includes(toHiragana(localeAwareLowerCase(word))) ||
    WORDS.includes(toKatakana(localeAwareLowerCase(word))) ||
    VALID_GUESSES.includes(toHiragana(localeAwareLowerCase(word)))
  )
}

export const isWinningWord = (word: string) => {
  return solution === word
}

// build a set of previously revealed letters - present and correct
// guess must use correct letters in that space and any other revealed letters
// also check if all revealed instances of a letter are used (i.e. two C's)
export const findFirstUnusedReveal = (word: string, guesses: string[]) => {
  if (guesses.length === 0) {
    return false
  }

  const lettersLeftArray = new Array<string>()
  const guess = guesses[guesses.length - 1]
  const statuses = getGuessStatuses(guess, solution)
  const splitWord = unicodeSplit(word)
  const splitGuess = unicodeSplit(guess)

  for (let i = 0; i < splitGuess.length; i++) {
    if (statuses[i] === 'correct' || statuses[i] === 'present') {
      lettersLeftArray.push(splitGuess[i])
    }
    if (statuses[i] === 'correct' && splitWord[i] !== splitGuess[i]) {
      const position = (i + 1)
      return t('WRONG_SPOT_MESSAGE', splitGuess[i], position.toString())
    }
  }

  // check for the first unused letter, taking duplicate letters
  // into account - see issue #198
  let n
  for (const letter of splitWord) {
    n = lettersLeftArray.indexOf(letter)
    if (n !== -1) {
      lettersLeftArray.splice(n, 1)
    }
  }

  if (lettersLeftArray.length > 0) {
    return t('NOT_CONTAINED_MESSAGE', lettersLeftArray[0])
  }
  return false
}

export const unicodeSplit = (word: string) => {
  return new GraphemeSplitter().splitGraphemes(word)
}

export const unicodeLength = (word: string) => {
  return unicodeSplit(word).length
}

export const localeAwareLowerCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleLowerCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toLowerCase()
}

export const localeAwareUpperCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleUpperCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toUpperCase()
}

export const getDateByIndex = (index: number) => {
  return firstGameDate.plus({days: index})
}

export const getIndexByDate = (date: DateTime) => {
  return Math.floor((date.valueOf() - firstGameDate.valueOf()) / msInDay)
}

export const getWordOfDay = () => {
  // To account for cases where the two dates in question span a daylight saving time (DST) change.
  // The date on which the DST change happens will have a duration in milliseconds which is != 86400000.
  // Convert the two dates to UTC time because because UTC time never observes DST.

  const timezone = getStoredTimezone()

  const now = DateTime.now().setZone(timezone)
  const today = DateTime.utc(now.year, now.month, now.day)
  const tomorrow = today.plus({days: 1}).minus({minutes: now.offset}).valueOf()

  const index = getStoredGameIndex()
  const yesterdayIndex = (index > 0 ? index - 1 : 0)

  const solution = localeAwareUpperCase(WORDS[index % WORDS.length])
  const isKatakana = (solution === toKatakana(solution))

  return {
    yesterdaySolution: localeAwareUpperCase(WORDS[yesterdayIndex % WORDS.length]),
    yesterdaySolutionIndex: yesterdayIndex,
    solution: solution,
    solutionIndex: index,
    tomorrow: tomorrow,
    isKatakana: isKatakana,
  }
}

export let { yesterdaySolution, yesterdaySolutionIndex, solution, solutionIndex, tomorrow, isKatakana } = getWordOfDay()

export const setWordOfDay = () => {
  let wordOfDay = getWordOfDay()
  yesterdaySolution = wordOfDay.yesterdaySolution
  yesterdaySolutionIndex = wordOfDay.yesterdaySolutionIndex
  solution = wordOfDay.solution
  solutionIndex = wordOfDay.solutionIndex
  tomorrow = wordOfDay.tomorrow
  isKatakana = wordOfDay.isKatakana
}

export const getLastGameDate = (today: DateTime) => {
  const daysSinceLastGame = Interval.fromDateTimes(firstGameDate, today).length('days') % periodInDays
  return today.minus({days: daysSinceLastGame})
}

export const getNextGameDate = (today: DateTime) => {
  return getLastGameDate(today).plus({days: periodInDays})
}

export const isValidGameDate = (date: DateTime) => {
  if (date < firstGameDate || date > getToday()) {
    return false
  }

  return Interval.fromDateTimes(firstGameDate, date).length('days') % periodInDays === 0
}

export const setGameDate = (date: DateTime) => {
  try {
    const today = getToday()

    if (date <= today) {
      
      if (getIndexByDate(date) === getIndexByDate(today)) {
        removeStoredGameIndex()
      } else {
        setStoredGameIndex(getIndexByDate(date).toString())
      }
      
      window.location.href = '/kotobade-asobou'
      return
    }
  } catch (e) {
    console.log(e)
  }
}

export const getIsLatestGame = () => {
  if (!ENABLE_ARCHIVED_GAMES) {
    return true
  }
  
  return getStoredGameIndex() === getIndexByDate(getToday())
}
