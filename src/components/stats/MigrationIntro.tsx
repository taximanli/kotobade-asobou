import { LogoutIcon } from '@heroicons/react/outline'
import classnames from 'classnames'
import { getStoredIsHighContrastMode } from '../../lib/localStorage'
import { t } from '../../constants/strings'

type Props = {
  handleMigrateStatsButton: () => void
}

export const MigrationIntro = ({ handleMigrateStatsButton }: Props) => {

  const isHighContrast = getStoredIsHighContrastMode()
  const buttonClassNames = classnames(
    'mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent px-4 py-2 text-center local-font text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm',
    {
      'bg-orange-500 hover:bg-orange-600 focus:ring-orange-400': isHighContrast,
      'bg-green-500 hover:bg-green-600 focus:ring-green-400': !isHighContrast,
    }
  )

  return (
    <div className="mt-1 columns-2 items-center items-stretch justify-center text-left dark:text-white sm:mt-2">
      <div className="mt-2 text-xs">{t('MIGRATE_DESCRIPTION_TEXT')}</div>
      <button
        type="button"
        className={buttonClassNames}
        onClick={handleMigrateStatsButton}
      >
        <LogoutIcon className="mr-2 h-6 w-6 cursor-pointer dark:stroke-white" />
        {t('MIGRATE_BUTTON_TEXT')}
      </button>
    </div>
  )
}
