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
  handleHighConstrastMode: Function  
}

export const SettingsModal = ({
  isOpen,
  handleClose,
  isHardMode,
  handleHardMode,
  isDarkMode,
  handleDarkMode,
  isHighContrastMode,
  handleHighConstrastMode,
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
        <SettingsToggle
          settingName="Dark Mode ダークモード"
          settingDescription=""
          flag={isDarkMode}
          handleFlag={handleDarkMode}
        />
        <SettingsToggle
          settingName="High Contrast Mode ハイコントラストモード"
          settingDescription=""
          flag={isHighContrastMode}
          handleFlag={handleHighConstrastMode}
        />
        <div className="flex justify-between items-center gap-8 mt-3">
          <div className="text-left">
            <h2 className="text-font text-lg text-gray-600 dark:text-gray-300">Feedback フィードバック</h2>
          </div>
          <div className='w-14 content-start'>
            <a className="underline text-gray-600 dark:text-gray-300" href="https://twitter.com/taximanli" rel="noreferrer" target="_blank">Twitter</a>
          </div>
        </div>
      </div>
    </BaseModal>
  )
}
