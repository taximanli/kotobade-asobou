import { GameStats } from '../../lib/localStorage'
import { Progress } from './Progress'

type Props = {
  gameStats: GameStats
  numberOfGuessesMade: number
}

export const Histogram = ({ gameStats, numberOfGuessesMade }: Props) => {
  const winDistribution = gameStats.winDistribution
  const maxValue = Math.max(...winDistribution)

  return (
    <div className="columns-1 justify-left m-2 text-sm dark:text-white">
      {winDistribution.map((value, i) => (
        <Progress
          key={i}
          index={i}
          currentDayStatRow={numberOfGuessesMade === i + 1}
          size={90 * (value / maxValue)}
          label={String(value)}
        />
      ))}
    </div>
  )
}
