import { useState, useEffect } from 'react'
import { Adsense } from '@ctrl/react-adsense'
import { ITimezone } from 'react-timezone-select'
import { toHiragana, toKatakana } from '@koozaki/romaji-conv'
import { Grid } from './components/grid/Grid'
import { AppArea } from './components/keyboard/Area'
import { DatePickerModal } from './components/modals/DatePickerModal'
import { InfoModal } from './components/modals/InfoModal'
import { SupportModal } from './components/modals/SupportModal'
import { StatsModal } from './components/modals/StatsModal'
import { MigrateStatsModal } from './components/modals/MigrateStatsModal'
import { SettingsModal } from './components/modals/SettingsModal'
import { t, WIN_MESSAGES } from './constants/strings'
import {
  MAX_WORD_LENGTH,
  MAX_CHALLENGES,
  REVEAL_TIME_MS,
  GAME_LOST_INFO_DELAY,
  WELCOME_INFO_MODAL_MS,
  PREFERRED_DISPLAY_LANGUAGE,
  AD_CLIENT_ID,
  AD_SLOT_TOP_BANNER_ID,
  AD_SLOT_BOTTOM_BANNER_ID,
  AD_SLOT_LEFT_SKIN_ID,
  AD_SLOT_RIGHT_SKIN_ID,
} from './constants/settings'
import {
  isWordInWordList,
  isWinningWord,
  solution,
  isKatakana,
  findFirstUnusedReveal,
  getDateByIndex,
  getIndexByDate,
  getIsLatestGame,
  setGameDate,
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
  setStoredTimezone,
  getStoredTimezone,
  setStoredAppArea,
  getStoredAppArea,
  setStoredGameIndex,
  removeStoredGameIndex,
  getStoredGameIndex,
} from './lib/localStorage'
import { getToday } from './lib/dateutils'
import { default as GraphemeSplitter } from 'grapheme-splitter'

import './App.css'
import { PastGameContainer } from './components/alerts/PastGameContainer'
import { AlertContainer } from './components/alerts/AlertContainer'
import { useAlert } from './context/AlertContext'
import { Navbar } from './components/navbar/Navbar'

function App() {
  const isLatestGame = getIsLatestGame()

  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches

  const {
    /* showCorrectWord: showCorrectWordAlert, */
    showError: showErrorAlert,
    showSuccess: showSuccessAlert,
  } = useAlert()
  const [currentGuess, setCurrentGuess] = useState('')
  const [currentInputText, setCurrentInputText] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState(false)
  const [isMigrateStatsModalOpen, setIsMigrateStatsModalOpen] = useState(false)
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
    const loaded = loadGameStateFromLocalStorage(isLatestGame)
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
      /*
      showCorrectWordAlert(
        t('CORRECT_WORD_MESSAGE', solutionIndex.toString(), solution),
        {
          persist: true,
        }
      )
      */
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

  const [activeAppArea, setActiveAppArea] = useState(getStoredAppArea())

  useEffect(() => {
    // if no game state on load,
    // show the user the how-to info modal
    //if (!loadGameStateFromLocalStorage()) {
    if (isLatestGame && !(isGameWon || isGameLost)) {
      setTimeout(() => {
        setIsInfoModalOpen(true)
      }, WELCOME_INFO_MODAL_MS)
    }
    //}
  }, [isLatestGame, isGameWon, isGameLost])

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
    if (isLatestGame && guesses.length === 0) {
      timezone = typeof timezone === 'string' ? timezone : timezone.value
      setTimezone(timezone)
      setStoredTimezone(timezone)
      setStoredGameIndex(getIndexByDate(getToday()).toString())
      setWordOfDay()
      saveGameStateToLocalStorage(getIsLatestGame(), { guesses, solution })
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

  const handleAppArea = (appArea: string) => {
    setActiveAppArea(appArea)
    setStoredAppArea(appArea)
  }

  const clearCurrentRowClass = () => {
    setCurrentRowClass('')
  }

  useEffect(() => {
    saveGameStateToLocalStorage(getIsLatestGame(), { guesses, solution })
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
    let currentInputTextInHiragana = isKatakana
      ? toKatakana(currentInputText)
      : toHiragana(currentInputText)
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
        if (isLatestGame) {
          setStats(addStatsForCompletedGame(stats, guesses.length))
        }
        return setIsGameWon(true)
      }

      if (guesses.length === MAX_CHALLENGES - 1) {
        if (isLatestGame) {
          setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        }
        setIsGameLost(true)
        /*
        showCorrectWordAlert(
          t('CORRECT_WORD_MESSAGE', solutionIndex.toString(), solution),
          {
            persist: true,
            delayMs: REVEAL_TIME_MS * MAX_WORD_LENGTH + 1,
          }
        )
        */
      }
    }
  }

  return (
    <div className="m-0 p-0 max-w-full">
      <div className="text-center adsbygoogle">
        <Adsense client={AD_CLIENT_ID} slot={AD_SLOT_TOP_BANNER_ID} />
      </div>
      <div className="pt-2 pb-3 flex max-w-full">
        <div className="hidden md:block flex-none w-32 lg:w-64 mt-3">
          <div className="text-center adsbygoogle">
            <Adsense client={AD_CLIENT_ID} slot={AD_SLOT_LEFT_SKIN_ID} />
          </div>
        </div>
        <div className="block flex-grow max-w-full mx-auto sm:px-6 lg:px-8">
          <Navbar
            setIsInfoModalOpen={setIsInfoModalOpen}
            setIsSupportModalOpen={setIsSupportModalOpen}
            setIsDatePickerModalOpen={setIsDatePickerModalOpen}
            setIsStatsModalOpen={setIsStatsModalOpen}
            setIsSettingsModalOpen={setIsSettingsModalOpen}
          />
          <PastGameContainer
            isLatestGame={isLatestGame}
            setIsDatePickerModalOpen={setIsDatePickerModalOpen}
          />
          <Grid
            guesses={guesses}
            currentGuess={currentGuess}
            isRevealing={isRevealing}
            currentRowClassName={currentRowClass}
          />
          <AppArea
            onChar={onChar}
            onDelete={onDelete}
            onEnter={onEnter}
            setCurrentGuess={setCurrentGuess}
            setCurrentInputText={setCurrentInputText}
            currentInputText={currentInputText}
            setActiveAppArea={setActiveAppArea}
            activeAppArea={activeAppArea}
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
            handleClose={() => {
              setIsStatsModalOpen(false)
              if (!isLatestGame && (isGameWon || isGameLost)) {
                removeStoredGameIndex()
                window.location.href = '/kotobade-asobou'
              }
            }}
            guesses={guesses}
            gameStats={stats}
            isLatestGame={isLatestGame}
            isGameLost={isGameLost}
            isGameWon={isGameWon}
            handleCalendarIcon={() => {
              setIsStatsModalOpen(false)
              setIsDatePickerModalOpen(true)
            }}
            handleShareToClipboard={() =>
              showSuccessAlert(t('GAME_COPIED_MESSAGE'))
            }
            handleMigrateStatsButton={() => {
              setIsStatsModalOpen(false)
              setIsMigrateStatsModalOpen(true)
            }}
            isHintMode={isHintMode}
            isHardMode={isHardMode}
            isDarkMode={isDarkMode}
            isHighContrastMode={isHighContrastMode}
            numberOfGuessesMade={guesses.length}
          />
          <DatePickerModal
            isOpen={isDatePickerModalOpen}
            initialDate={getDateByIndex(getStoredGameIndex())}
            handleSelectDate={(date) => {
              setIsDatePickerModalOpen(false)
              setGameDate(date)
            }}
            handleClose={() => setIsDatePickerModalOpen(false)}
          />
          <MigrateStatsModal
            isOpen={isMigrateStatsModalOpen}
            handleClose={() => setIsMigrateStatsModalOpen(false)}
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
            activeAppArea={activeAppArea!}
            handleAppArea={handleAppArea}
          />
          <AlertContainer />
        </div>
        <div className="hidden md:block flex-none w-32 lg:w-64 mt-3">
          <div className="text-center adsbygoogle">
            <Adsense client={AD_CLIENT_ID} slot={AD_SLOT_RIGHT_SKIN_ID} />
          </div>
        </div>
      </div>
      <div className="text-center adsbygoogle">
        <Adsense client={AD_CLIENT_ID} slot={AD_SLOT_BOTTOM_BANNER_ID} />
      </div>
    </div>
  )
}

export default App
