import { SaveIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import classnames from 'classnames'

import { decrypt } from '../../lib/encryption'
import {
  getStoredIsHighContrastMode,
  saveGameStateToLocalStorage,
  saveStatsToLocalStorage,
} from '../../lib/localStorage'
import { MigrationStats } from '../modals/MigrateStatsModal'
import { t } from '../../constants/strings'

export const ImmigratePanel = () => {
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false)

  const isHighContrast = getStoredIsHighContrastMode()
  const buttonClassNames = classnames(
    'mt-2 inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-left text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:border-gray-200 disabled:bg-white disabled:text-gray-900 disabled:focus:outline-none disabled:dark:border-gray-600 disabled:dark:bg-gray-800 disabled:dark:text-gray-400 sm:text-sm',
    {
      'bg-orange-500 hover:bg-orange-600 focus:ring-orange-400': isHighContrast,
      'bg-green-500 hover:bg-green-600 focus:ring-green-400': !isHighContrast,
    }
  )

  const textareaClassNames = {
    valid: ['bg-gray-100', 'dark:bg-gray-700'],
    invalid: ['bg-rose-400', 'dark:bg-rose-900'],
  }
  const allClassNames = [
    ...textareaClassNames.valid,
    ...textareaClassNames.invalid,
  ]

  const handleImmigrationCodeChange = (event: any) => {
    if (event.target instanceof Element) {
      const textarea = event.target

      allClassNames.forEach((cn) => textarea.classList.remove(cn))

      setIsSaveButtonEnabled(false)

      const text = textarea.value

      try {
        const migrationStats = JSON.parse(decrypt(text) ?? '') as MigrationStats
        if (
          !migrationStats ||
          (!migrationStats.gameState && !migrationStats.statistics)
        ) {
          textareaClassNames.invalid.forEach((cn) => textarea.classList.add(cn))
          return
        }

        textareaClassNames.valid.forEach((cn) => textarea.classList.add(cn))
        setIsSaveButtonEnabled(true)
      } catch (error) {
        textareaClassNames.invalid.forEach((cn) => textarea.classList.add(cn))
      }
    }
  }

  const handleSaveButton = () => {
    const textarea = document.getElementById(
      'immigration-code'
    ) as HTMLInputElement
    if (
      textarea &&
      window.confirm(
        t('override the statistics')
      )
    ) {
      var migrationStats = JSON.parse(
        decrypt(textarea.value) ?? ''
      ) as MigrationStats
      if (!migrationStats) return

      if (migrationStats.gameState) {
        saveGameStateToLocalStorage(true, migrationStats.gameState)
      }

      if (migrationStats.statistics) {
        saveStatsToLocalStorage(migrationStats.statistics)
      }

      alert(t('The game will now reload'))

      window.location.reload()
    }
  }

  return (
    <div className="mt-3 text-sm text-gray-500 dark:text-gray-300">
      <label
        htmlFor="message"
        className="mb-2 block text-left text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        {t('Paste your migration code')}
      </label>
      <textarea
        onChange={(e) => handleImmigrationCodeChange(e)}
        id="immigration-code"
        rows={8}
        className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      ></textarea>
      <button
        disabled={!isSaveButtonEnabled}
        onClick={handleSaveButton}
        type="button"
        className={buttonClassNames}
      >
        {isSaveButtonEnabled && (
          <SaveIcon className="mr-2 h-6 w-6 cursor-pointer dark:stroke-white" />
        )}
        {t('Save')}
      </button>
    </div>
  )
}
