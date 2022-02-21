import {
  TranslateIcon,
} from '@heroicons/react/outline'
import classnames from 'classnames'
import { useTranslation } from 'react-i18next';
import { BaseModal } from './BaseModal'
import { SettingsToggle } from './SettingsToggle'
import { PREFERRED_DISPLAY_LANGUAGE } from '../../constants/settings'

type Props = {
  isOpen: boolean
  handleClose: () => void
  isHintMode: boolean
  handleHintMode: Function
  isHardMode: boolean
  handleHardMode: Function
  isDarkMode: boolean
  handleDarkMode: Function
  isHighContrastMode: boolean
  handleHighContrastMode: Function
  displayLanguage: string
  handleDisplayLanguage: Function
}

export const SettingsModal = ({
  isOpen,
  handleClose,
  isHintMode,
  handleHintMode,
  isHardMode,
  handleHardMode,
  isDarkMode,
  handleDarkMode,
  isHighContrastMode,
  handleHighContrastMode,
  displayLanguage,
  handleDisplayLanguage,
}: Props) => {
  const aboutClassName = classnames((displayLanguage === PREFERRED_DISPLAY_LANGUAGE ? 'local-font' : ''), 'text-left text-sm text-gray-500 dark:text-gray-300')
  const { t } = useTranslation();
  return (
    <BaseModal title={t('Settings')} isOpen={isOpen} handleClose={handleClose}>
      <div className="grid-cols-2 gap-4">
        <div className="flex justify-between items-center gap-8 mt-3">
          <div className="text-left">
            <h2 className="local-font text-base text-gray-600 dark:text-gray-300">Language 言語</h2>
          </div>
          <div className='w-36 text-right'>
            <button
              onClick={() => handleDisplayLanguage(displayLanguage === PREFERRED_DISPLAY_LANGUAGE ? 'en' : PREFERRED_DISPLAY_LANGUAGE)}
              className="local-font text-black dark:text-white shadow-none p-2 focus:outline-none text-lg rounded-full outline-none ring-transparent cursor-pointer"
            >
              <div className="flex mx-auto items-center">
                <TranslateIcon className="h-6 w-6 -ml-1 mr-1" />
                {displayLanguage === PREFERRED_DISPLAY_LANGUAGE ? 'English' : '日本語'}
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="grid-cols-2 gap-4">
        <hr className="mt-2 mb-2" />
        <SettingsToggle
          settingName={t('Hint Mode')}
          settingDescription=""
          flag={isHintMode}
          handleFlag={handleHintMode}
        />
        <hr className="mt-2 mb-2" />
        <SettingsToggle
          settingName={t('Hard Mode')}
          settingDescription={t('Any revealed hints must be used in subsequent guesses')}
          flag={isHardMode}
          handleFlag={handleHardMode}
        />
        <hr className="mt-2 mb-2" />
        <SettingsToggle
          settingName={t('Dark Mode')}
          settingDescription=""
          flag={isDarkMode}
          handleFlag={handleDarkMode}
        />
        <hr className="mt-2 mb-2" />
        <SettingsToggle
          settingName={t('High Contrast Mode')}
          settingDescription=""
          flag={isHighContrastMode}
          handleFlag={handleHighContrastMode}
        />
        <hr className="mt-2 mb-2" />
        <div className="flex justify-between items-center gap-8 mt-3">
          <div className="text-left">
            <h2 className="local-font text-base text-gray-600 dark:text-gray-300">{t('Feedback')}</h2>
          </div>
          <div className='w-14 content-start'>
            {' '}<a className="underline text-sm text-gray-600 dark:text-gray-300" href="https://twitter.com/taximanli" rel="noreferrer" target="_blank">Twitter</a>{' '}
          </div>
        </div>
      </div>
      <hr className="mt-2 mb-2" />
      <div className="grid-cols-1 gap-4">
        <div className="flex justify-between items-center gap-8 mt-3">
          <p className={aboutClassName}>
            {t('This is an')}
            {' '}<a className="underline text-sm text-gray-600 dark:text-gray-300" href="https://github.com/cwackerfuss/react-wordle" rel="noreferrer" target="_blank">{t('open source version')}</a>{' '}
            {t('This game was adapted')}
          </p>
        </div>
      </div>
    </BaseModal>
  )
}
