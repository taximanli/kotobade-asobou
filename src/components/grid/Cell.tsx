import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'
import { REVEAL_TIME_MS } from '../../constants/settings'

type Props = {
  value?: string
  status?: CharStatus
  isRevealing?: boolean
  isCompleted?: boolean
  position?: number
}

export const Cell = ({
  value,
  status,
  isRevealing,
  isCompleted,
  position = 0,
}: Props) => {
  const isFilled = value && !isCompleted
  const shouldReveal = isRevealing && isCompleted
  const animationDelay = `${position * REVEAL_TIME_MS}ms`

  const classes = classnames(
    'w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-4xl cell-font font-bold rounded dark:text-white',
    {
      'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-600':
        !status,
      'border-black dark:border-stone-100': value && !status,
      'absent bg-stone-400 dark:bg-stone-700 text-white border-stone-400 dark:border-stone-700':
        status === 'absent',
      'correct bg-emerald-500 text-white border-emerald-500':
        status === 'correct',
      'present bg-amber-500 text-white border-amber-500':
        status === 'present',
      'cell-fill-animation': isFilled,
      'cell-reveal': shouldReveal,
    }
  )

  return (
    <div className={classes} style={{ animationDelay }}>
      <div className="letter-container" style={{ animationDelay }}>
        {value}
      </div>
    </div>
  )
}
