import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'

type Props = {
  value?: string
  status?: CharStatus
}

export const Cell = ({ value, status }: Props) => {
  const classes = classnames(
    'w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-bold rounded dark:text-white',
    {
      'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600':
        !status,
      'border-black dark:border-slate-100': value && !status,
      'bg-slate-400 dark:bg-slate-700 text-white border-slate-400 dark:border-slate-700':
        status === 'absent',
      'bg-blue-500 text-white border-blue-500': status === 'correct',
      'bg-orange-500 dark:bg-orange-700 text-white border-orange-500 dark:border-orange-700':
        status === 'present',
      'cell-animation': !!value,
    }
  )

  return <div className={classes}>{value}</div>
}
