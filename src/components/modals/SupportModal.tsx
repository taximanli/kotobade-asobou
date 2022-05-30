import classnames from 'classnames'
import { BaseModal } from './BaseModal'
import { PREFERRED_DISPLAY_LANGUAGE } from '../../constants/settings'
import { getStoredIsHighContrastMode, getStoredDisplayLanguage } from '../../lib/localStorage'
import { t, TOP_SUPPORTER_NAME, SUPPORTER_NAME } from '../../constants/strings';
import coffeeLogo from '../../images/ko-fi-com-taximanli.png';

export type shareStatusType = 'text' | 'clipboard' | 'tweet'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const SupportModal = ({ isOpen, handleClose }: Props) => {
  const isHighContrast = getStoredIsHighContrastMode()
  const displayLanguage = getStoredDisplayLanguage()
  const aboutClassName = classnames((displayLanguage === PREFERRED_DISPLAY_LANGUAGE ? 'local-font' : ''), 'text-left text-sm text-gray-500 dark:text-gray-300')
  const linkClassName = classnames((isHighContrast ? 'text-orange-600' : 'text-green-600'), 'underline text-sm')

  return (
    <BaseModal
      title={t('SUPPORT_TITLE')}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <div className="flex mt-5">
        <p className={aboutClassName}>
          {t('own passion project')}
        </p>
      </div>
      <div className="flex justify-between items-center gap-3 mt-3">
        <p className={aboutClassName}>
          {t('If you enjoy')}<br />
          {' '}<a className={linkClassName} href={t('KOFI_LINK')} rel="noreferrer" target="_blank">{t('buying me a coffee')}</a>{' '}
          {t('if you wish')}
          {' '}
          {t('do my best')}
        </p>
        <img className="w-9 h-9 wiggle cursor-pointer" src={coffeeLogo} title={t('Buy me a coffee?')} alt={t('Buy me a coffee?')} onClick={()=> window.open(t('KOFI_LINK'), "_blank")} />
      </div>
      <div className="flex mt-3">
        <p className={aboutClassName}>
          {t('much love to')}
        </p>
      </div>
      <div className="flex mt-3">
        <textarea className="local-font text-xs text-gray-500 dark:text-gray-400 w-full border-solid border-2 rounded bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600"
          rows={5}
          value={TOP_SUPPORTER_NAME} />
      </div>
      <div className="flex mt-3">
        <textarea className="local-font text-xs text-gray-400 dark:text-gray-500 w-full border-solid border-2 rounded bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600"
          rows={6}
          value={SUPPORTER_NAME} />
      </div>
    </BaseModal>
  )
}
