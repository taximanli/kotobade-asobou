import classnames from 'classnames'
import { BaseModal } from './BaseModal'
import { PREFERRED_DISPLAY_LANGUAGE } from '../../constants/settings'
import { getStoredIsHighContrastMode, getStoredDisplayLanguage } from '../../lib/localStorage'
import { t, TOP_SUPPORTER_NAME, SUPPORTER_NAME } from '../../constants/strings';
import coffeeLogo from '../../images/ko-fi-com-taximanli.png';

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

      {(displayLanguage === PREFERRED_DISPLAY_LANGUAGE) && (
        <div>
          <p className="local-font text-lg leading-6 font-medium text-gray-900 dark:text-gray-100 mt-2 md:mt-4 mb-2">
            過去の更新
          </p>

          <p className="text-left local-font text-sm text-gray-500 dark:text-gray-300 mb-2">
            正しくないヒントが表示されるバグを修正しました。
          </p>
          <hr className="mt-2 mb-2" />
          <p className="text-left local-font text-sm text-gray-500 dark:text-gray-300 mb-2">
            キーボードと音図は画面の右上に「設定 ⋮ 」でレイアウトを選択することができます。
          </p>
          <hr className="mt-2 mb-2" />
          <p className="text-left local-font text-sm text-gray-500 dark:text-gray-300 mb-2">
            慎重に検討した後、ゲーム体験を向上させるため、ABABパターンの単語（「われわれ」とか「そろそろ」とか）が答えに選ばれなくなりました。
          </p>
          <hr className="mt-2 mb-2" />
          <p className="text-left local-font text-sm text-gray-500 dark:text-gray-300 mb-2">
            ひらがなのほかに、ローマ字やカタカナで答えをキーボード入力することもできます。入力ボタンを押すと答えは自動的にひらがなに変換されます。
          </p>
          <hr className="mt-2 mb-2" />
          <p className="text-left local-font text-sm text-gray-500 dark:text-gray-300 mb-2">
            新機能「タイムゾーンの設定」が追加されています。
          </p>
          <p className="text-left local-font text-sm text-gray-500 dark:text-gray-300">
            海外の友達と同じ単語でゲームをしたい場合は、ゲームを同じタイムゾーンに設定してください。
            例えば、あなたとニューヨークの友達は両方ともゲームのタイムゾーンを日本時間に設定できます。
          </p>
        </div>
      )}

      {(displayLanguage !== PREFERRED_DISPLAY_LANGUAGE) && (
        <div>
          <p className="local-font text-lg leading-6 font-medium text-gray-900 dark:text-gray-100 mt-2 md:mt-4 mb-2">
            Past updates
          </p>

          <p className="text-left text-sm text-gray-500 dark:text-gray-300 mb-2">
            Fixed a bug regarding the keyboard displaying the incorrect hints for certain guess combinations.
          </p>
          <hr className="mt-2 mb-2" />
          <p className="text-left text-sm text-gray-500 dark:text-gray-300 mb-2">
            You can now select the positions of text box and kana chart in Settings.
          </p>
          <hr className="mt-2 mb-2" />
          <p className="text-left text-sm text-gray-500 dark:text-gray-300 mb-2">
            After careful consideration, in order to enhance the gaming experience, words in ABAB pattern (われわれ, そろそろ...) will be no longer chosen as answers.
          </p>
          <hr className="mt-2 mb-2" />
          <p className="text-left text-sm text-gray-500 dark:text-gray-300 mb-2">
            In addition to hiragana, now you can also directly type your guesses in romaji or katakana. Your guesses will be automatically converted to hiragana after hitting the enter button.
          </p>
          <hr className="mt-2 mb-2" />
          <p className="text-left text-sm text-gray-500 dark:text-gray-300 mb-2">
            New feature "Set timezone" is now available in Settings.
          </p>
          <p className="text-left text-sm text-gray-500 dark:text-gray-300">
            If you want to play the same word with a friend living overseas, you both can choose the same timezone to play the game.
            E.g. you are in Japan and your friend is in New York, you both can set the timezone in the game to Japan time to play the same word.
          </p>
      </div>
      )}

    </BaseModal>
  )
}
