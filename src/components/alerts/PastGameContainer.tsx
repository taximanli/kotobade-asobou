import { ClockIcon } from '@heroicons/react/outline'

import { DateTime } from 'luxon'

import { PREFERRED_DISPLAY_LANGUAGE } from '../../constants/settings'
import { getDateByIndex } from '../../lib/words'
import { getStoredDisplayLanguage, getStoredGameIndex } from '../../lib/localStorage'

type Props = {
  isLatestGame: boolean
  setIsDatePickerModalOpen: (value: boolean) => void
}

export const PastGameContainer = ({
  isLatestGame,
  setIsDatePickerModalOpen,
}: Props) => {
  const displayLanguage = getStoredDisplayLanguage()

  return (
    <>
      {!isLatestGame && (
        <div className="flex items-center justify-center mb-4">
          <ClockIcon
            className="h-6 w-6 stroke-gray-600 dark:stroke-gray-300 cursor-pointer"
            onClick={() => setIsDatePickerModalOpen(true)}
          />
          <p
            className="text-base text-gray-600 dark:text-gray-300 pl-2 cursor-pointer"
            onClick={() => setIsDatePickerModalOpen(true)}
          >
            {displayLanguage === PREFERRED_DISPLAY_LANGUAGE &&
              '過去問 第' +
                getStoredGameIndex().toString() +
                '回 ' +
                getDateByIndex(getStoredGameIndex())
                  .setLocale('ja-JP')
                  .toLocaleString(DateTime.DATE_MED)}
            {displayLanguage !== PREFERRED_DISPLAY_LANGUAGE &&
              'Past Game #' +
                getStoredGameIndex().toString() +
                ' on ' +
                getDateByIndex(getStoredGameIndex())
                  .setLocale('en-US')
                  .toLocaleString(DateTime.DATE_MED)}
          </p>
        </div>
      )}
    </>
  )
}
