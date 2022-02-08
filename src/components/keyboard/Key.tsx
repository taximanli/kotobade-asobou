import { ReactNode } from 'react'
import classnames from 'classnames'
import { CharStatus } from '../../lib/statuses'
import { MAX_WORD_LENGTH, REVEAL_TIME_MS } from '../../constants/settings'

type Props = {
  children?: ReactNode
  value: string
  width?: number
  status?: CharStatus
  onClick: (value: string) => void
  isRevealing?: boolean
}

export const Key = ({
  children,
  status,
  width = 40,
  value,
  onClick,
  isRevealing,
}: Props) => {
  const keyDelayMs = REVEAL_TIME_MS * MAX_WORD_LENGTH

  const classes = classnames(
    'flex items-center justify-center rounded mx-0.5 text-xl key-font font-bold cursor-pointer select-none dark:text-white',
    {
      'transition ease-in-out': isRevealing,
      'bg-stone-200 dark:bg-stone-600 hover:bg-stone-300 active:bg-stone-400':
        !status,
      'bg-stone-400 dark:bg-stone-800 text-white': status === 'absent',
      'bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white':
        status === 'correct',
      'bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white':
        status === 'present',
    }
  )

  const styles = {
    transitionDelay: isRevealing ? `${keyDelayMs}ms` : 'unset',
    width: `${width}px`,
    height: `${width}px`,
  }

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(value)
    event.currentTarget.blur()
  }

  if (value === '') {
    return (
      <button style={styles} className="mx-0.5">
        {children || value}
      </button>
    )      
  } else {
    return (
      <button style={styles} className={classes} onClick={handleClick}>
        {children || value}
      </button>
    )  
  }

}
