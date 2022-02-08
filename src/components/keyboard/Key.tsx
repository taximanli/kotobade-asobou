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

  const dummyKeyClasses = classnames(
    'w-7 xs:w-8 sm:w-10 h-7 xs:h-8 sm:h-10 rounded mx-0.5 select-none'
  )

  const keyClasses = classnames(
    'w-7 xs:w-8 sm:w-10 h-7 xs:h-8 sm:h-10 flex items-center justify-center rounded mx-0.5 text-lg sm:text-xl key-font font-bold cursor-pointer select-none dark:text-white',
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
    // width: `${width}px`,
    // height: `${width}px`,
  }

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(value)
    event.currentTarget.blur()
  }

  if (value === '') {
    return (
      <button style={styles} className={dummyKeyClasses}>
        {children || value}
      </button>
    )      
  } else {
    return (
      <button style={styles} className={keyClasses} onClick={handleClick}>
        {children || value}
      </button>
    )  
  }

}
