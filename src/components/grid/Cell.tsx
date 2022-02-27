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
    'w-10 xs:w-11 sm:w-14 h-10 xs:h-11 sm:h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-3xl md:text-4xl local-font font-bold rounded dark:text-white',
    {
      'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600':
        !status,
      'border-black dark:border-slate-100': value && !status,
      'absent cell-bg':
        status === 'absent',
      'correct cell-bg':
        status === 'correct',
      'present cell-bg':
        status === 'present',
      'close cell-bg':
        status === 'close',
      'consonant cell-bg':
        status === 'consonant',
      'vowel cell-bg':
        status === 'vowel',
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
