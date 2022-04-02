import { useState, useEffect } from 'react'
import { ITimezone } from 'react-timezone-select'
import { toHiragana } from '@koozaki/romaji-conv'
import { Grid } from './components/grid/Grid'
import { Bar } from './components/keyboard/Bar'
import { Keyboard } from './components/keyboard/Keyboard'
import { InfoModal } from './components/modals/InfoModal'
import { SupportModal } from './components/modals/SupportModal'
import { StatsModal } from './components/modals/StatsModal'
import { SettingsModal } from './components/modals/SettingsModal'
import { t, WIN_MESSAGES } from './constants/strings'
import {
  MAX_WORD_LENGTH,
  MAX_CHALLENGES,
  REVEAL_TIME_MS,
  GAME_LOST_INFO_DELAY,
  WELCOME_INFO_MODAL_MS,
  PREFERRED_DISPLAY_LANGUAGE,
} from './constants/settings'
import {
  isWordInWordList,
  isWinningWord,
  solutionIndex,
  solution,
  findFirstUnusedReveal,
  unicodeLength,
  setWordOfDay,
} from './lib/words'
import { addStatsForCompletedGame, loadStats } from './lib/stats'
import {
  saveShareStatusToLocalStorage,
  removeShareStatusFromLocalStorage,
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
  setStoredIsHighContrastMode,
  getStoredIsHighContrastMode,
  setStoredIsHintMode,
  getStoredIsHintMode,
  setStoredDisplayLanguage,
  getStoredDisplayLanguage,
  getStoredTimezone,
  setStoredTimezone,
} from './lib/localStorage'
import { default as GraphemeSplitter } from 'grapheme-splitter'

import './App.css'
import { AlertContainer } from './components/alerts/AlertContainer'
import { useAlert } from './context/AlertContext'
import { Navbar } from './components/navbar/Navbar'

function App() {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches

  const { showError: showErrorAlert, showSuccess: showSuccessAlert } =
    useAlert()
  const [currentGuess, setCurrentGuess] = useState('')
  const [currentInputText, setCurrentInputText] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [currentRowClass, setCurrentRowClass] = useState('')
  const [isGameLost, setIsGameLost] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme')
      ? localStorage.getItem('theme') === 'dark'
      : prefersDarkMode
      ? true
      : false
  )
  const [isHighContrastMode, setIsHighContrastMode] = useState(
    getStoredIsHighContrastMode()
  )
  const [displayLanguage, setDisplayLanguage] = useState(
    getStoredDisplayLanguage()
  )
  const [isRevealing, setIsRevealing] = useState(false)
  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.solution !== solution) {
      removeShareStatusFromLocalStorage()
      return []
    }
    const gameWasWon = loaded.guesses.includes(solution)
    if (gameWasWon) {
      setIsGameWon(true)
    }
    if (loaded.guesses.length === MAX_CHALLENGES && !gameWasWon) {
      setIsGameLost(true)
      showErrorAlert(
        t('CORRECT_WORD_MESSAGE', solutionIndex.toString(), solution),
        {
          persist: true,
        }
      )
    }
    return loaded.guesses
  })

  const [stats, setStats] = useState(() => loadStats())

  const [timezone, setTimezone] = useState(getStoredTimezone())

  const [isHintMode, setIsHintMode] = useState(getStoredIsHintMode())

  const [isHardMode, setIsHardMode] = useState(
    localStorage.getItem('gameMode')
      ? localStorage.getItem('gameMode') === 'hard'
      : false
  )

  useEffect(() => {
    // if no game state on load,
    // show the user the how-to info modal
    //if (!loadGameStateFromLocalStorage()) {
    if (!(isGameWon || isGameLost)) {
      setTimeout(() => {
        setIsInfoModalOpen(true)
      }, WELCOME_INFO_MODAL_MS)
    }
    //}
  }, [isGameWon, isGameLost])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    if (isHighContrastMode) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }
  }, [isDarkMode, isHighContrastMode])

  const handleTimezone = (timezone: ITimezone) => {
    if (guesses.length === 0) {
      timezone = typeof timezone === 'string' ? timezone : timezone.value
      setTimezone(timezone)
      setStoredTimezone(timezone)
      setWordOfDay()
    } else {
      showErrorAlert(t('TIMEZONE_ALERT_MESSAGE'))
    }
  }

  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  const handleHintMode = (isHint: boolean) => {
    if (
      guesses.length === 0 ||
      isGameWon ||
      isGameLost ||
      !getStoredIsHintMode()
    ) {
      setIsHintMode(isHint)
      setStoredIsHintMode(isHint)
    } else {
      showErrorAlert(t('HINT_MODE_ALERT_MESSAGE'))
    }
  }

  const handleHardMode = (isHard: boolean) => {
    if (
      guesses.length === 0 ||
      isGameWon ||
      isGameLost ||
      localStorage.getItem('gameMode') === 'hard'
    ) {
      setIsHardMode(isHard)
      localStorage.setItem('gameMode', isHard ? 'hard' : 'normal')
    } else {
      showErrorAlert(t('HARD_MODE_ALERT_MESSAGE'))
    }
  }

  const handleHighContrastMode = (isHighContrast: boolean) => {
    setIsHighContrastMode(isHighContrast)
    setStoredIsHighContrastMode(isHighContrast)
  }

  const handleDisplayLanguage = (displayLanguage: string) => {
    setDisplayLanguage(displayLanguage)
    setStoredDisplayLanguage(displayLanguage)
  }

  const clearCurrentRowClass = () => {
    setCurrentRowClass('')
  }

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution })
  }, [guesses])

  useEffect(() => {
    if (isGameWon) {
      const winMessage =
        displayLanguage === PREFERRED_DISPLAY_LANGUAGE
          ? WIN_MESSAGES.ja[guesses.length - 1]
          : WIN_MESSAGES.en[guesses.length - 1]
      const delayMs = REVEAL_TIME_MS * MAX_WORD_LENGTH

      showSuccessAlert(winMessage, {
        delayMs,
        onClose: () => setIsStatsModalOpen(true),
      })
    }

    if (isGameLost) {
      setTimeout(() => {
        setIsStatsModalOpen(true)
      }, GAME_LOST_INFO_DELAY)
    }
  }, [isGameWon, isGameLost, guesses, displayLanguage, showSuccessAlert])

  const onChar = (value: string) => {
    if (
      unicodeLength(`${currentGuess}${value}`) <= MAX_WORD_LENGTH &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setCurrentGuess(`${currentGuess}${value}`)
      setCurrentInputText(`${currentInputText}${value}`)
    }
  }

  const onDelete = () => {
    if (currentGuess === currentInputText) {
      setCurrentGuess(
        new GraphemeSplitter()
          .splitGraphemes(currentGuess)
          .slice(0, -1)
          .join('')
      )
    }
    setCurrentInputText(
      new GraphemeSplitter()
        .splitGraphemes(currentInputText)
        .slice(0, -1)
        .join('')
    )
  }

  const onEnter = () => {
    // convert romaji or katakana input to hiragana
    let currentInputTextInHiragana = toHiragana(currentInputText)
    let currentGuessInHiragana = new GraphemeSplitter()
      .splitGraphemes(currentInputTextInHiragana)
      .slice(0, MAX_WORD_LENGTH)
      .join('')

    setCurrentGuess(currentGuessInHiragana)
    setCurrentInputText(currentInputTextInHiragana)

    if (isGameWon || isGameLost) {
      return
    }

    if (currentInputTextInHiragana === '' || currentGuessInHiragana === '') {
      return
    }

    if (!(unicodeLength(currentInputTextInHiragana) === MAX_WORD_LENGTH)) {
      return showErrorAlert(
        t('NOT_ENOUGH_LETTERS_MESSAGE', currentInputTextInHiragana)
      )
    }

    if (!(unicodeLength(currentGuessInHiragana) === MAX_WORD_LENGTH)) {
      setCurrentRowClass('jiggle')
      return showErrorAlert(
        t('NOT_ENOUGH_LETTERS_MESSAGE', currentGuessInHiragana),
        {
          onClose: clearCurrentRowClass,
        }
      )
    }

    if (!isWordInWordList(currentGuessInHiragana)) {
      setCurrentRowClass('jiggle')
      return showErrorAlert(t('WORD_NOT_FOUND_MESSAGE'), {
        onClose: clearCurrentRowClass,
      })
    }

    // enforce hard mode - all guesses must contain all previously revealed letters
    if (isHardMode) {
      const firstMissingReveal = findFirstUnusedReveal(
        currentGuessInHiragana,
        guesses
      )
      if (firstMissingReveal) {
        setCurrentRowClass('jiggle')
        return showErrorAlert(firstMissingReveal, {
          onClose: clearCurrentRowClass,
        })
      }
    }

    setIsRevealing(true)
    // turn this back off after all
    // chars have been revealed
    setTimeout(() => {
      setIsRevealing(false)
    }, REVEAL_TIME_MS * MAX_WORD_LENGTH)

    const winningWord = isWinningWord(currentGuessInHiragana)

    if (
      unicodeLength(currentGuessInHiragana) === MAX_WORD_LENGTH &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuessInHiragana])
      setCurrentGuess('')
      setCurrentInputText('')
      saveShareStatusToLocalStorage(isHintMode, isHardMode)

      if (winningWord) {
        setStats(addStatsForCompletedGame(stats, guesses.length))
        return setIsGameWon(true)
      }

      if (guesses.length === MAX_CHALLENGES - 1) {
        setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        setIsGameLost(true)
        showErrorAlert(
          t('CORRECT_WORD_MESSAGE', solutionIndex.toString(), solution),
          {
            persist: true,
            delayMs: REVEAL_TIME_MS * MAX_WORD_LENGTH + 1,
          }
        )
      }
    }
  }

  return (
    <div className="pt-2 pb-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
      <Navbar
        setIsInfoModalOpen={setIsInfoModalOpen}
        setIsSupportModalOpen={setIsSupportModalOpen}
        setIsStatsModalOpen={setIsStatsModalOpen}
        setIsSettingsModalOpen={setIsSettingsModalOpen}
      />
      <Grid
        guesses={guesses}
        currentGuess={currentGuess}
        isRevealing={isRevealing}
        currentRowClassName={currentRowClass}
      />
      <Bar
        onDelete={onDelete}
        onEnter={onEnter}
        setCurrentGuess={setCurrentGuess}
        setCurrentInputText={setCurrentInputText}
        currentInputText={currentInputText}
      />
      <Keyboard
        onChar={onChar}
        onDelete={onDelete}
        onEnter={onEnter}
        guesses={guesses}
        isRevealing={isRevealing}
      />
      <InfoModal
        isOpen={isInfoModalOpen}
        handleClose={() => setIsInfoModalOpen(false)}
      />
      <SupportModal
        isOpen={isSupportModalOpen}
        handleClose={() => setIsSupportModalOpen(false)}
      />
      <StatsModal
        isOpen={isStatsModalOpen}
        handleClose={() => setIsStatsModalOpen(false)}
        guesses={guesses}
        gameStats={stats}
        isGameLost={isGameLost}
        isGameWon={isGameWon}
        handleShareToClipboard={() =>
          showSuccessAlert(t('GAME_COPIED_MESSAGE'))
        }
        isHintMode={isHintMode}
        isHardMode={isHardMode}
        isDarkMode={isDarkMode}
        isHighContrastMode={isHighContrastMode}
        numberOfGuessesMade={guesses.length}
      />
      <SettingsModal
        isOpen={isSettingsModalOpen}
        handleClose={() => setIsSettingsModalOpen(false)}
        timezone={timezone}
        handleTimezone={handleTimezone}
        isHintMode={isHintMode}
        handleHintMode={handleHintMode}
        isHardMode={isHardMode}
        handleHardMode={handleHardMode}
        isDarkMode={isDarkMode}
        handleDarkMode={handleDarkMode}
        isHighContrastMode={isHighContrastMode}
        handleHighContrastMode={handleHighContrastMode}
        displayLanguage={displayLanguage!}
        handleDisplayLanguage={handleDisplayLanguage}
      />

      <AlertContainer />
    </div>
  )
}

export default App
