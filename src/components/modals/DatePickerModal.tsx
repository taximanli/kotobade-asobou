import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { DateTime } from 'luxon'
import { ja, enUS } from 'date-fns/locale'
import { useState } from 'react'
import classnames from 'classnames'
import DatePicker, { registerLocale } from 'react-datepicker'

import { t } from '../../constants/strings'
import { getToday, getYesterday } from '../../lib/dateutils'
import { getStoredIsHighContrastMode, getStoredDisplayLanguage } from '../../lib/localStorage'
import { PREFERRED_DISPLAY_LANGUAGE } from '../../constants/settings'
import {
  firstGameDate,
  getLastGameDate,
  isValidGameDate,
  periodInDays,
} from '../../lib/words'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  initialDate?: DateTime
  handleSelectDate: (date: DateTime) => void
  handleClose: () => void
}

export const DatePickerModal = ({
  isOpen,
  initialDate,
  handleSelectDate,
  handleClose,
}: Props) => {
  const displayLanguage = getStoredDisplayLanguage()

  const isHighContrast = getStoredIsHighContrastMode()
  const buttonClassNames = classnames(
    'mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent px-4 py-2 text-center local-font text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:border-gray-200 disabled:bg-gray-500 disabled:bg-white disabled:text-gray-900 disabled:focus:outline-none disabled:dark:border-gray-600 disabled:dark:bg-gray-800 disabled:dark:text-gray-400 sm:text-base sm:text-base',
    {
      'bg-orange-500 hover:bg-orange-600 focus:ring-orange-400': isHighContrast,
      'bg-green-500 hover:bg-green-600 focus:ring-green-400': !isHighContrast,
    }
  )

  const lastGameDate = getLastGameDate(getYesterday())
  const [selectedDate, setSelectedDate] = useState(() => {
    if (initialDate == null || initialDate > lastGameDate) {
      return lastGameDate
    }
    return initialDate
  })

  registerLocale('locale', (displayLanguage === PREFERRED_DISPLAY_LANGUAGE ? ja : enUS))

  const excludedDates: Date[] = []
  if (periodInDays > 1) {
    let date = firstGameDate
    for (date = firstGameDate; date < getToday(); date = date.plus({days: 1})) {
      if (!isValidGameDate(date)) {
        excludedDates.push(date.toJSDate())
      }
    }
  }

  return (
    <BaseModal
      title={t('DATEPICKER_TITLE')}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <div className="mx-auto flex max-w-2xl items-center justify-center space-x-4 py-5 text-left sm:w-48">
        <DatePicker
          locale="locale"
          minDate={firstGameDate.toJSDate()}
          maxDate={getYesterday().toJSDate()}
          selected={selectedDate.toJSDate()}
          excludeDates={excludedDates}
          onChange={(date: Date) => setSelectedDate(DateTime.utc(date.getFullYear(), date.getMonth()+1, date.getDate()))}
          inline
          popperClassName="react-datepicker-left"
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="flex items-center justify-between px-2 py-2">
              <span className="font-bold text-lg text-gray-700 dark:text-gray-100">
                {(displayLanguage === PREFERRED_DISPLAY_LANGUAGE ? date.toLocaleString('ja',{month:'short', year:'numeric'}) : date.toLocaleString('en-us',{month:'short', year:'numeric'}))}
              </span>

              <div className="space-x-2">
                <button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                  type="button"
                  className={`
                            ${
                              prevMonthButtonDisabled &&
                              'cursor-not-allowed opacity-50'
                            }
                            ${
                              isHighContrast &&
                              'focus:ring-orange-500 dark:focus:ring-orange-600'
                            }
                            ${
                              !isHighContrast &&
                              'focus:ring-green-500 dark:focus:ring-green-600'
                            }
                            inline-flex rounded border border-gray-300 bg-white p-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0
                            dark:border-gray-600 dark:bg-slate-700 dark:text-gray-200
                        `}
                >
                  <ChevronLeftIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>

                <button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                  type="button"
                  className={`
                            ${
                              nextMonthButtonDisabled &&
                              'cursor-not-allowed opacity-50'
                            }
                            ${
                              isHighContrast &&
                              'focus:ring-orange-500 dark:focus:ring-orange-600'
                            }
                            ${
                              !isHighContrast &&
                              'focus:ring-green-500 dark:focus:ring-green-600'
                            }
                            inline-flex rounded border border-gray-300 bg-white p-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0
                            dark:border-gray-600 dark:bg-slate-700 dark:text-gray-200
                        `}
                >
                  <ChevronRightIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>
          )}
        />
      </div>
      <div className="mt-5 flex columns-2 items-center items-stretch justify-center gap-4 text-center dark:text-white sm:mt-6">
        <button
          type="button"
          disabled={!isValidGameDate(getToday())}
          className={buttonClassNames}
          onClick={() => handleSelectDate(getToday())}
        >
          {t('DATEPICKER_TODAY_TEXT')}
        </button>
        <button
          type="button"
          disabled={selectedDate >= getToday()}
          className={buttonClassNames}
          onClick={() => handleSelectDate(selectedDate)}
        >
          {t('DATEPICKER_CHOOSE_TEXT', selectedDate.setLocale(displayLanguage === PREFERRED_DISPLAY_LANGUAGE ? 'ja-JP' : 'en-US').toLocaleString(DateTime.DATE_MED))}
        </button>
      </div>
    </BaseModal>
  )
}
