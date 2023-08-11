import { DuplicateIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import classnames from 'classnames'

import { copyTextToClipboard } from '../../lib/clipboard'
import { encrypt } from '../../lib/encryption'
import {
  getStoredIsHighContrastMode,
  loadGameStateFromLocalStorage
} from '../../lib/localStorage'
import { loadStats } from '../../lib/stats'
import { MigrationStats } from '../modals/MigrateStatsModal'
import { t } from '../../constants/strings'

export const EmigratePanel = () => {
  const [isCopyButtonEnabled, setIsCopyButtonEnabled] = useState(true)
  const [copyButtonText, setCopyButtonText] = useState(t('Copy'))

  const isHighContrast = getStoredIsHighContrastMode()
  const buttonClassNames = classnames(
    'mt-2 inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-left text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:border-gray-200 disabled:bg-white disabled:text-gray-900 disabled:focus:outline-none disabled:dark:border-gray-600 disabled:dark:bg-gray-800 disabled:dark:text-gray-400 sm:text-sm',
    {
      'bg-orange-500 hover:bg-orange-600 focus:ring-orange-400': isHighContrast,
      'bg-green-500 hover:bg-green-600 focus:ring-green-400': !isHighContrast,
    }
  )
  const textAreaClassNames = classnames(
    'mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400',
    {
      'focus:border-orange-500 focus:ring-orange-500 dark:focus:border-orange-500 dark:focus:ring-orange-500': isHighContrast,
      'focus:border-green-500 focus:ring-green-500 dark:focus:border-green-500 dark:focus:ring-green-500': !isHighContrast,
    }
  )

  const stats = loadStats()
  const gameState = loadGameStateFromLocalStorage(true)

  const migrationStats: MigrationStats = {
    statistics: stats,
    gameState: gameState,
  }

  const emigrationCode = encrypt(JSON.stringify(migrationStats))

  const copyEmigrationCodeToClipboard = () => {
    copyTextToClipboard(emigrationCode)
    setCopyButtonText(t('Copied'))
    setIsCopyButtonEnabled(false)
  }

  return (
    <div className="mt-3 text-sm text-gray-500 dark:text-gray-300">
      <label
        htmlFor="message"
        className="mb-2 block text-left text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        {t('Copy your migration code')}
      </label>
      <textarea
        id="emigration-code"
        readOnly={true}
        rows={8}
        className={textAreaClassNames}
        value={emigrationCode}
      />
      <button
        disabled={!isCopyButtonEnabled}
        onClick={copyEmigrationCodeToClipboard}
        type="button"
        className={buttonClassNames}
      >
        {isCopyButtonEnabled && (
          <DuplicateIcon className="mr-2 h-6 w-6 cursor-pointer dark:stroke-white" />
        )}
        {copyButtonText}
      </button>
    </div>
  )
}
