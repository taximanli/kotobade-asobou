import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'

type Props = {
  value?: string
  status?: CharStatus
  revealing?: boolean
  completed?: boolean
}

export const Cell = ({ value, status, revealing, completed }: Props) => {
  const classes = classnames(
    'w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-4xl font-bold rounded dark:text-white',
    {
      'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600':
        !status,
      'border-black dark:border-slate-100': value && !status,
      'shadowed bg-slate-400 dark:bg-slate-700 text-white border-slate-400 dark:border-slate-700':
        status === 'absent',
      'shadowed bg-green-500 text-white border-green-500': status === 'correct',
      'shadowed bg-yellow-500 dark:bg-yellow-700 text-white border-yellow-500 dark:border-yellow-700':
        status === 'present',
      'cell-animation': !!value && !completed,
      'cell-reveal': !!revealing && completed,
    }
  )

  return (
    <div className={classes}>
      <div className={'letter-container'}>{value}</div>
    </div>
  )
}
