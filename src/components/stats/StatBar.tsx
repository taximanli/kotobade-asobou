import { GameStats } from '../../lib/localStorage'
import { t } from '../../constants/strings'

type Props = {
  gameStats: GameStats
}

const StatItem = ({
  label,
  value,
}: {
  label: string
  value: string | number
}) => {
  return (
    <div className="items-center justify-center m-1 w-1/4 dark:text-white">
      <div className="text-xl md:text-2xl">{value}</div>
      <div className="text-xs">{label}</div>
    </div>
  )
}

export const StatBar = ({ gameStats }: Props) => {
  return (
    <div className="flex justify-center my-2">
      <StatItem label={t('TOTAL_TRIES_TEXT')} value={gameStats.totalGames} />
      <StatItem label={t('SUCCESS_RATE_TEXT')} value={`${gameStats.successRate}%`} />
      <StatItem label={t('CURRENT_STREAK_TEXT')} value={gameStats.currentStreak} />
      <StatItem label={t('BEST_STREAK_TEXT')} value={gameStats.bestStreak} />
    </div>
  )
}
