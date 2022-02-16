import { BaseModal } from './BaseModal'
import { SettingsToggle } from './SettingsToggle'

type Props = {
  isOpen: boolean
  handleClose: () => void
  isHardMode: boolean
  handleHardMode: Function
  isDarkMode: boolean
  handleDarkMode: Function
  isHighContrastMode: boolean
  handleHighContrastMode: Function
}

export const SettingsModal = ({
  isOpen,
  handleClose,
  isHardMode,
  handleHardMode,
  isDarkMode,
  handleDarkMode,
  isHighContrastMode,
  handleHighContrastMode,
}: Props) => {
  return (
    <BaseModal title="Settings 設定" isOpen={isOpen} handleClose={handleClose}>
      <div className="grid-cols-2 gap-4">
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
