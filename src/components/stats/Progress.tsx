import classnames from 'classnames'
import { getStoredIsHighContrastMode } from '../../lib/localStorage'

type Props = {
  index: number
  size: number
  label: string
  isCurrentDayStatRow: boolean
}

export const Progress = ({ index, size, label, isCurrentDayStatRow }: Props) => {
  const isHighContrast = getStoredIsHighContrastMode()

  const classNames = classnames(
    'text-xs font-medium text-white dark:text-gray-700 text-center p-0.5 rounded-l-full rounded-r-full',
    {
      'bg-orange-500': isCurrentDayStatRow && isHighContrast,
      'bg-green-500': isCurrentDayStatRow && !isHighContrast,
      'bg-slate-400 dark:bg-slate-300': !isCurrentDayStatRow
    }
  )

  return (
    <div className="flex justify-left m-1">
      <div className="items-center justify-center text-right w-4">{index + 1}</div>
      <div className="rounded-full w-full ml-2">
        <div
          style={{ width: `${8 + size}%` }}
          className={classNames}
        >
          {label}
        </div>
      </div>
    </div>
  )
}
