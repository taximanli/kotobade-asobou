import classnames from 'classnames'
import { getStoredIsHighContrastMode } from '../../lib/localStorage'

type Props = {
  settingName: string
  settingDescription: string
  flag: boolean
  handleFlag: Function
}

export const SettingsToggle = ({ settingName, settingDescription, flag, handleFlag }: Props) => {
  const isHighContrast = getStoredIsHighContrastMode()
  const toggleHolder = classnames(
    'w-14 h-8 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out cursor-pointer',
    {
      'bg-orange-400': flag && isHighContrast,
      'bg-green-400': flag && !isHighContrast,
    }
  )
  const toggleButton = classnames(
    'bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out cursor-pointer',
    {
      'translate-x-6': flag,
    }
  )

  let settingDescriptionJSX
  if (settingDescription !== '') {
    const settingDescriptionClassNames = [classnames('text-xs text-gray-500 dark:text-gray-400'), classnames('local-font text-xs text-gray-500 dark:text-gray-400')]
    let splittedSettingDescription = []
    splittedSettingDescription = settingDescription.split('|')
    settingDescriptionJSX = (
      <div>
        <span className={settingDescriptionClassNames[0]}>{splittedSettingDescription[0]}</span>
        <br />
        <span className={settingDescriptionClassNames[1]}>{splittedSettingDescription[1]}</span>
      </div>
      )
  }

  return (
    <div className="flex justify-between items-start gap-8 mt-3 mb-4">
      <div className="text-left">
        <h2 className="local-font text-base text-gray-600 dark:text-gray-300">{settingName}</h2>
        {settingDescription === '' ? '' : settingDescriptionJSX}
      </div>
      <div className='w-14'>
        <div className={toggleHolder} onClick={() => handleFlag(!flag)}>
          <div className={toggleButton} />
        </div>
      </div>
    </div>
  )
}
