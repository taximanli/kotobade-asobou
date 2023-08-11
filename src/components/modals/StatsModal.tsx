import {
  ClockIcon,
  EmojiHappyIcon,
  EmojiSadIcon
} from '@heroicons/react/outline'
import coffeeLogo from '../../images/ko-fi-com-taximanli.png'

import {
  DATE_LOCALE,
  ENABLE_ARCHIVED_GAMES,
  ENABLE_MIGRATE_STATS,
  PREFERRED_DISPLAY_LANGUAGE
} from '../../constants/settings'
import classnames from 'classnames'
import Countdown from 'react-countdown'
import { format } from 'date-fns'
import { DateTime } from 'luxon'
import { StatBar } from '../stats/StatBar'
import { Histogram } from '../stats/Histogram'
import { GameStats, getStoredIsHighContrastMode, getStoredDisplayLanguage, getStoredTimezone } from '../../lib/localStorage'
import { shareStatus } from '../../lib/share'
import { yesterdaySolution, yesterdaySolutionIndex, solution, solutionIndex, tomorrow, solutionGameDate } from '../../lib/words'
import { BaseModal } from './BaseModal'
import { t, JISHO_SEARCH_LINK, ARCHIVE_GAMEDATE_TEXT } from '../../constants/strings';
import { MigrationIntro } from '../stats/MigrationIntro'

export type shareStatusType = 'text' | 'clipboard' | 'line' | 'tweet'

type Props = {
  isOpen: boolean
  handleClose: () => void
  guesses: string[]
  gameStats: GameStats
  isLatestGame: boolean
  isGameLost: boolean
  isGameWon: boolean
  handleShareToClipboard: () => void
  handleMigrateStatsButton: () => void
  isHintMode: boolean
  isHardMode: boolean
  isDarkMode: boolean
  isHighContrastMode: boolean
  numberOfGuessesMade: number
}

export const StatsModal = ({
  isOpen,
  handleClose,
  guesses,
  gameStats,
  isLatestGame,
  isGameLost,
  isGameWon,
  handleShareToClipboard,
  handleMigrateStatsButton,
  isHintMode,
  isHardMode,
  isDarkMode,
  isHighContrastMode,
  numberOfGuessesMade,
}: Props) => {
  const isHighContrast = getStoredIsHighContrastMode()
  const displayLanguage = getStoredDisplayLanguage()
  const timezone = getStoredTimezone()

  const now = DateTime.now().setZone(timezone)

  let statsModalTitle = ''

  if (displayLanguage === PREFERRED_DISPLAY_LANGUAGE) {
    statsModalTitle = now.setLocale('ja-JP').toLocaleString(DateTime.DATE_FULL) + ' 第' + solutionIndex.toString() + '回'
  } else {
    statsModalTitle = 'Game #' + solutionIndex.toString() + ' on ' + now.setLocale('en-US').toLocaleString(DateTime.DATE_FULL)
  }

  const linkClassName = classnames((isHighContrast ? 'text-orange-600 dark:text-orange-400' : 'text-green-600 dark:text-green-400'), 'underline text-sm')
  const correctWordClassNames = classnames(
    'flex gap-1 justify-center text-base font-medium mx-1 mb-3',
    {
      'local-font': displayLanguage === PREFERRED_DISPLAY_LANGUAGE,
      'text-red-600 dark:text-red-400': isGameLost,
      'text-green-500 dark:text-green-400': isGameWon,
    }
  )
  const correctWordSearchLinkClassNames = classnames(
    'local-font underline text-base font-medium cursor-zoom-in',
    {
      'text-red-600 dark:text-red-400': isGameLost,
      'text-green-500 dark:text-green-400': isGameWon,
    }
  )
  const buttonClassNames = classnames(
    'mt-1 w-full rounded-md border border-transparent shadow-sm px-4 py-2 local-font text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm',
    {
      'bg-orange-500 hover:bg-orange-600 focus:ring-orange-400': isHighContrast,
      'bg-green-500 hover:bg-green-600 focus:ring-green-400': !isHighContrast,
    }
  )

  if (gameStats.totalGames <= 0) {
    return (
      <BaseModal
        title={statsModalTitle}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <h4 className="local-font text-base leading-6 font-medium text-gray-900 dark:text-gray-100">
          {t('STATISTICS_TITLE')}
        </h4>
        <StatBar gameStats={gameStats} />
        {ENABLE_MIGRATE_STATS && (
          <MigrationIntro handleMigrateStatsButton={handleMigrateStatsButton} />
        )}
      </BaseModal>
    )
  }
  return (
    <BaseModal
      title={statsModalTitle}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      {(isGameLost || isGameWon) && (
      <div className={correctWordClassNames}>
        {(isGameWon ? <EmojiHappyIcon className="h-6 w-6 cursor-pointer text-green-500 dark:text-green-400"/> : <EmojiSadIcon className="h-6 w-6 cursor-pointer text-red-600 dark:text-red-400"/>)}
        {t('CORRECT_WORD_MESSAGE')}
        <a className={correctWordSearchLinkClassNames} href={(JISHO_SEARCH_LINK + solution)} rel="noreferrer" target="_blank">{solution}</a>
      </div>
      )}
      <div className="flex gap-1 justify-center dark:text-white mx-1">
        {(!ENABLE_ARCHIVED_GAMES || isLatestGame) && (
          <div>
            <h5>{t('NEW_WORD_TEXT')}</h5>
            <Countdown
              className="local-font text-baseline font-medium text-gray-900 dark:text-gray-100"
              date={tomorrow}
              daysInHours={true}
            />
          </div>
        )}
        {ENABLE_ARCHIVED_GAMES && !isLatestGame && (
          <div className="mt-2 inline-flex">
            <ClockIcon className="mr-1 mt-2 mt-1 h-5 w-5 stroke-black dark:stroke-white" />
            <div className="mt-1 ml-1 text-center text-sm sm:text-base">
              <strong>{ARCHIVE_GAMEDATE_TEXT}:</strong>
              <br />
              {format(solutionGameDate, 'd MMMM yyyy', {
                locale: DATE_LOCALE,
              })}
            </div>
          </div>
        )}
      </div>
      {(isGameLost || isGameWon) && (
      <div className="flex gap-1 justify-center text-sm dark:text-white mx-1 mb-3">
        {t('YESTERDAY_CORRECT_WORD_MESSAGE', yesterdaySolutionIndex.toString())}
        <a className="underline text-sm text-gray-600 dark:text-gray-300 cursor-zoom-in" href={(JISHO_SEARCH_LINK + yesterdaySolution)} rel="noreferrer" target="_blank">{yesterdaySolution}</a>
      </div>
      )}
      <div className="flex justify-between items-center gap-3 mt-4">
        <p className="text-left text-sm dark:text-white">
          {t('If you love this game')}<br />{t('Please consider')}
          {' '}<a className={linkClassName} href={t('KOFI_LINK')} rel="noreferrer" target="_blank">{t('can you treat me')}</a>{' '}
          {t('please?')}
        </p>
        <img className="w-9 h-9 wiggle cursor-pointer" src={coffeeLogo} title={t('Buy me a coffee?')} alt={t('Buy me a coffee?')} onClick={()=> window.open(t('KOFI_LINK'), "_blank")} />
      </div>
      {(isGameLost || isGameWon) && (
        <div>
          <div className="mt-4 sm:mt-5 mb-1 dark:text-white mx-1">
            <textarea className="local-font text-xs w-full border-solid border-2 rounded bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600" rows={5}
              value={shareStatus(
                  'text',
                  guesses,
                  isGameLost,
                  isHintMode,
                  isHardMode,
                  isDarkMode,
                  isHighContrastMode,
                  handleShareToClipboard
              )} />          
          </div>
          <div className="mb-5 sm:mb-6 grid grid-cols-3 gap-3 dark:text-white mx-1">
            <div>
              <button
                type="button"
                className={buttonClassNames}
                onClick={() => {
                  shareStatus(
                    'clipboard',
                    guesses,
                    isGameLost,
                    isHintMode,
                    isHardMode,
                    isDarkMode,
                    isHighContrastMode,
                    handleShareToClipboard
                  )
                }}
              >
                {t('SHARE_TEXT')}
              </button>
            </div>
            <div>
              <button
                type="button"
                className={buttonClassNames}
                onClick={() => {
                  shareStatus(
                    'line',
                    guesses,
                    isGameLost,
                    isHintMode,
                    isHardMode,
                    isDarkMode,
                    isHighContrastMode,
                    handleShareToClipboard
                  )
                }}
              >
                {t('LINE_TEXT')}
              </button>
            </div>
            <div>
              <button
                type="button"
                className={buttonClassNames}
                onClick={() => {
                  shareStatus(
                    'tweet',
                    guesses,
                    isGameLost,
                    isHintMode,
                    isHardMode,
                    isDarkMode,
                    isHighContrastMode,
                    handleShareToClipboard
                  )                  
                }}
              >
                {t('TWEET_TEXT')}
              </button>
            </div>
          </div>
        </div>
      )}
      <hr className="mt-4 mb-4" />
      <h4 className="local-font text-base leading-6 font-medium text-gray-900 dark:text-gray-100">
        {t('STATISTICS_TITLE')}
      </h4>
      <StatBar gameStats={gameStats} />
      <h4 className="local-font text-base leading-6 font-medium text-gray-900 dark:text-gray-100">
        {t('GUESS_DISTRIBUTION_TEXT')}
      </h4>
      <Histogram
        gameStats={gameStats}
        isLatestGame={isLatestGame}
        isGameWon={isGameWon}
        numberOfGuessesMade={numberOfGuessesMade}
      />
      {ENABLE_MIGRATE_STATS && (
        <div>
          <hr className="mt-4 mb-3" />
          <MigrationIntro handleMigrateStatsButton={handleMigrateStatsButton} />
        </div>
      )}
    </BaseModal>
  )
}
