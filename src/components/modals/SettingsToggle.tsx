import classnames from 'classnames'
import { getStoredDisplayLanguage, getStoredIsHighContrastMode } from '../../lib/localStorage'

type Props = {
  settingName: string
  settingDescription: string
  flag: boolean
  handleFlag: Function
}

export const SettingsToggle = ({ settingName, settingDescription, flag, handleFlag }: Props) => {
  const isHighContrast = getStoredIsHighContrastMode()
  const displayLanguage = getStoredDisplayLanguage()
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
    const settingDescriptionClassName = classnames((displayLanguage === 'en' ? '' : 'local-font'), 'text-xs text-gray-500 dark:text-gray-400')
    settingDescriptionJSX = (
      <div className={settingDescriptionClassName}>{settingDescription}</div>
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
