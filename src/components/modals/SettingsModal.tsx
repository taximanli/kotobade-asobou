import {
  TranslateIcon,
} from '@heroicons/react/outline'
import { BaseModal } from './BaseModal'
import { SettingsToggle } from './SettingsToggle'

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
  return (
    <BaseModal title="Settings 設定" isOpen={isOpen} handleClose={handleClose}>
      <div className="grid-cols-2 gap-4">
        <div className="flex justify-between items-center gap-8 mt-3">
          <div className="text-left">
            <h2 className="local-font text-base text-gray-600 dark:text-gray-300">Language 言語</h2>
          </div>
          <div className='w-36 text-right'>
            <button
              onClick={() => handleDisplayLanguage(displayLanguage === 'en' ? 'ja' : 'en')}
              className="local-font text-black dark:text-white shadow-none p-2 focus:outline-none text-lg rounded-full outline-none ring-transparent cursor-pointer"
            >
              <div className="flex mx-auto items-center">
                <TranslateIcon className="h-6 w-6 -ml-1 mr-1" />
                {displayLanguage === 'en' ? '日本語' : 'English'}
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="grid-cols-2 gap-4">
        <hr className="mt-4 mb-4" />
        <SettingsToggle
          settingName="Hint Mode ヒントモード"
          settingDescription=""
          flag={isHintMode}
          handleFlag={handleHintMode}
        />
        <hr className="mt-4 mb-4" />
        <SettingsToggle
          settingName="Hard Mode ハードモード"
          settingDescription="Any revealed hints must be used in subsequent guesses.|開示されたすべてのヒントを満たす単語だけが入力できます。"
          flag={isHardMode}
          handleFlag={handleHardMode}
        />
        <hr className="mt-4 mb-4" />
        <SettingsToggle
          settingName="Dark Mode ダークモード"
          settingDescription=""
          flag={isDarkMode}
          handleFlag={handleDarkMode}
        />
        <hr className="mt-4 mb-4" />
        <SettingsToggle
          settingName="High Contrast Mode ハイコントラストモード"
          settingDescription=""
          flag={isHighContrastMode}
          handleFlag={handleHighContrastMode}
        />
        <hr className="mt-4 mb-4" />
        <div className="flex justify-between items-center gap-8 mt-3">
          <div className="text-left">
            <h2 className="local-font text-base text-gray-600 dark:text-gray-300">Feedback フィードバック</h2>
          </div>
          <div className='w-14 content-start'>
            {' '}<a className="underline text-sm text-gray-600 dark:text-gray-300" href="https://twitter.com/taximanli" rel="noreferrer" target="_blank">Twitter</a>{' '}
          </div>
        </div>
      </div>
      <hr className="mt-4 mb-4" />
      <div className="grid-cols-1 gap-4">
        <div className="flex justify-between items-center gap-8 mt-3">
          <p className="text-left text-sm text-gray-500 dark:text-gray-300">
            This is an
            {' '}<a className="underline text-sm text-gray-600 dark:text-gray-300" href="https://github.com/cwackerfuss/react-wordle" rel="noreferrer" target="_blank">open source version</a>{' '}
            of the word guessing game we all know and love. This game was adapted into Japanese by Desmond Lee.<br />
          </p>
        </div>
        <div className="flex justify-between items-center gap-8 mt-3">
          <p className="text-left local-font text-sm text-gray-500 dark:text-gray-300">
            これは、私たち皆が知っていて大好きな単語パズルゲームの
            {' '}<a className="underline text-sm text-gray-600 dark:text-gray-300" href="https://github.com/cwackerfuss/react-wordle" rel="noreferrer" target="_blank">オープンソース版</a>{' '}
            です。
            このゲームは Desmond Lee が日本語版を作りました。
          </p>
        </div>
      </div>
    </BaseModal>
  )
}
