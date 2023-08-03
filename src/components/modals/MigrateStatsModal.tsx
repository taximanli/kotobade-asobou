import { useState } from 'react'
import classnames from 'classnames'

import { GameStats, StoredGameState, getStoredIsHighContrastMode } from '../../lib/localStorage'
import { EmigratePanel } from '../stats/EmigratePanel'
import { ImmigratePanel } from '../stats/ImmigratePanel'
import { BaseModal } from './BaseModal'
import { t } from '../../constants/strings'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export type MigrationStats = {
  statistics: GameStats
  gameState: StoredGameState | null
}

export const MigrateStatsModal = ({ isOpen, handleClose }: Props) => {
  const [isEmigrateVisible, setIsEmigrateVisible] = useState(true)

  const isHighContrast = getStoredIsHighContrastMode()
  const buttonClassNames = classnames(
    'h-4 w-4 border-gray-300 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800',
    {
      'text-orange-600 focus:ring-orange-500 dark:focus:ring-orange-600': isHighContrast,
      'text-green-600 focus:ring-green-500 dark:focus:ring-green-600': !isHighContrast,
    }
  )

  return (
    <BaseModal
      title={t('Transfer your statistics')}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <p className="mt-4 mb-4 text-left text-sm text-gray-500 dark:text-gray-300">
        {t('Copy the migration code')}
      </p>

      <div className="w-full columns-3 gap-0">
        <div className="mb-4 flex items-center">
          <p className="mb-0 flex text-sm font-medium text-gray-900 dark:text-gray-300">
            {t('This is my')}
          </p>
        </div>
        <div className="mb-4 flex items-center">
          <input
            checked={isEmigrateVisible}
            onChange={() => setIsEmigrateVisible(true)}
            id="emigrate-radio-button"
            radioGroup="migrate-radio-buttons"
            type="radio"
            value=""
            name="emigrate-radio-button"
            className={buttonClassNames}
          />
          <label
            htmlFor="emigrate-radio-button"
            className="ml-2 mr-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            {t('old device')}
          </label>
        </div>
        <div className="flex items-center">
          <input
            checked={!isEmigrateVisible}
            onChange={() => setIsEmigrateVisible(false)}
            id="immigrate-radio-button"
            radioGroup="migrate-radio-buttons"
            type="radio"
            value=""
            name="immigrate-radio-button"
            className={buttonClassNames}
          />
          <label
            htmlFor="immigrate-radio-button"
            className="ml-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            {t('new device')}
          </label>
        </div>
      </div>

      {isEmigrateVisible && <EmigratePanel />}
      {!isEmigrateVisible && <ImmigratePanel />}
    </BaseModal>
  )
}
