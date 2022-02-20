import Countdown from 'react-countdown'
import { useTranslation } from 'react-i18next';
import { StatBar } from '../stats/StatBar'
import { Histogram } from '../stats/Histogram'
import { GameStats } from '../../lib/localStorage'
import { shareStatus } from '../../lib/share'
import { tomorrow } from '../../lib/words'
import { BaseModal } from './BaseModal'

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
}: Props) => {
  const { t } = useTranslation();
  if (gameStats.totalGames <= 0) {
    return (
      <BaseModal
        title={t('STATISTICS_TITLE')}
        isOpen={isOpen}
        handleClose={handleClose}
      >
        <StatBar gameStats={gameStats} />
      </BaseModal>
    )
  }
  return (
    <BaseModal
      title={t('STATISTICS_TITLE')}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <StatBar gameStats={gameStats} />
      <h4 className="local-font text-base leading-6 font-medium text-gray-900 dark:text-gray-100">
        {t('GUESS_DISTRIBUTION_TEXT')}
      </h4>
      <Histogram gameStats={gameStats} />
      {(isGameLost || isGameWon) && (
        <div className="mt-5 sm:mt-6 grid grid-cols-2 gap-4 dark:text-white">
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
              className="mt-2 w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 local-font text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              onClick={() => {
                shareStatus(guesses, isGameLost, isHintMode, isHardMode)
                handleShare()
              }}
            >
              {t('SHARE_TEXT')}
            </button>
          </div>
        </div>
      )}
    </BaseModal>
  )
}
