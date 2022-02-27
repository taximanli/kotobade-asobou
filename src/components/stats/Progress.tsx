import classnames from 'classnames'
import { getStoredIsHighContrastMode } from '../../lib/localStorage'

type Props = {
  index: number
  size: number
  label: string
}

export const Progress = ({ index, size, label }: Props) => {
  const isHighContrast = getStoredIsHighContrastMode()

  const classNames = classnames(
    'text-xs font-medium text-blue-100 text-center p-0.5 rounded-l-full rounded-r-full',
    {
      'bg-orange-500': isHighContrast,
      'bg-green-500': !isHighContrast,
    }
  )

  return (
    <div className="flex justify-left m-1">
      <div className="items-center justify-center text-right w-4">{index + 1}</div>
      <div className="rounded-full w-full ml-2">
        <div
          style={{ width: `${5 + size}%` }}
          className={classNames}
        >
          {label}
        </div>
      </div>
    </div>
  )
}
