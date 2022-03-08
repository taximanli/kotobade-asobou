import classnames from 'classnames'
import { PREFERRED_DISPLAY_LANGUAGE } from '../../constants/settings'
import { getStoredDisplayLanguage, getStoredIsHighContrastMode } from '../../lib/localStorage'

type Props = {
  settingName: string
  flag: boolean
  handleFlag: Function
  description?: string
}

export const SettingsToggle = ({
  settingName,
  flag,
  handleFlag,
  description,
}: Props) => {
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

  let descriptionJSX
  if (description !== '') {
    const settingDescriptionClassName = classnames((displayLanguage === PREFERRED_DISPLAY_LANGUAGE ? 'local-font' : ''), 'text-xs text-gray-500 dark:text-gray-400')
    descriptionJSX = (
      <div className={settingDescriptionClassName}>{description}</div>
      )
  }

  return (
    <div className="flex justify-between items-start gap-8 mt-3 mb-4">
      <div className="text-left">
        <h2 className="local-font text-base text-gray-600 dark:text-gray-300">{settingName}</h2>
        {description === '' ? '' : descriptionJSX}
      </div>
      <div className='w-14'>
        <div className={toggleHolder} onClick={() => handleFlag(!flag)}>
          <div className={toggleButton} />
        </div>
      </div>
    </div>
  )
}
