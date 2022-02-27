import classnames from 'classnames'
import Countdown from 'react-countdown'
import { StatBar } from '../stats/StatBar'
import { Histogram } from '../stats/Histogram'
import { GameStats, getStoredIsHighContrastMode } from '../../lib/localStorage'
import { shareStatus } from '../../lib/share'
import { solutionIndex, tomorrow } from '../../lib/words'
import { BaseModal } from './BaseModal'
import { t } from '../../constants/strings';

type Props = {
  isOpen: boolean
  handleClose: () => void
  guesses: string[]
  gameStats: GameStats
  isGameLost: boolean
  isGameWon: boolean
  handleShare: () => void
  isHintMode: boolean
  isHardMode: boolean
  isDarkMode: boolean
  isHighContrastMode: boolean
}

export const StatsModal = ({
  isOpen,
  handleClose,
  guesses,
  gameStats,
  isGameLost,
  isGameWon,
  handleShare,
  isHintMode,
  isHardMode,
  isDarkMode,
  isHighContrastMode,
}: Props) => {
  const isHighContrast = getStoredIsHighContrastMode()

  const classNames = classnames(
    'mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 local-font text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm',
    {
      'bg-orange-500 hover:bg-orange-600 focus:ring-orange-400': isHighContrast,
      'bg-green-500 hover:bg-green-600 focus:ring-green-400': !isHighContrast,
    }
  )

  if (gameStats.totalGames <= 0) {
    return (
      <BaseModal
        title={t('SOLUTION_INDEX_TEXT', solutionIndex.toString())}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <h4 className="local-font text-base leading-6 font-medium text-gray-900 dark:text-gray-100">
          {t('STATISTICS_TITLE')}
        </h4>
        <StatBar gameStats={gameStats} />
      </BaseModal>
    )
  }
  return (
    <BaseModal
      title={t('SOLUTION_INDEX_TEXT', solutionIndex.toString())}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      {(isGameLost || isGameWon) && (
        <div className="mt-5 sm:mt-6 grid grid-cols-2 gap-4 dark:text-white m-5">
          <div>
            <h5>{t('NEW_WORD_TEXT')}</h5>
            <Countdown
              className="local-font text-lg font-medium text-gray-900 dark:text-gray-100"
              date={tomorrow}
              daysInHours={true}
            />
          </div>
          <div>
            <button
              type="button"
              className={classNames}
              onClick={() => {
              shareStatus(
                guesses,
                isGameLost,
                isHintMode,
                isHardMode,
                isDarkMode,
                isHighContrastMode
              )
                handleShare()
              }}
            >
              {t('SHARE_TEXT')}
            </button>
          </div>
        </div>
      )}
      <h4 className="local-font text-base leading-6 font-medium text-gray-900 dark:text-gray-100">
        {t('STATISTICS_TITLE')}
      </h4>
      <StatBar gameStats={gameStats} />
      <h4 className="local-font text-base leading-6 font-medium text-gray-900 dark:text-gray-100">
        {t('GUESS_DISTRIBUTION_TEXT')}
      </h4>
      <Histogram gameStats={gameStats} />
    </BaseModal>
  )
}
