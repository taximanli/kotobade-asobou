import classnames from 'classnames'
import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'
import { MAX_WORD_LENGTH, MAX_CHALLENGES, PREFERRED_DISPLAY_LANGUAGE } from '../../constants/settings'
import { getStoredDisplayLanguage, getStoredIsHighContrastMode } from '../../lib/localStorage'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  const isHighContrast = getStoredIsHighContrastMode()
  const displayLanguage = getStoredDisplayLanguage()

  const arrowClassNames = classnames(
    {
      'text-orange-500': isHighContrast,
      'text-green-500': !isHighContrast,
    }
  )
  const headingClassNames = 'local-font text-sm font-bold text-gray-500 dark:text-gray-300 border'
  const rowClassNames = ''
  const cellClassNames = 'local-font text-sm text-gray-500 dark:text-gray-300 border align-top'
  const dividerClassNames = 'h-3'

  if (displayLanguage === PREFERRED_DISPLAY_LANGUAGE) {
    return (
      <BaseModal title="更新情報" isOpen={isOpen} handleClose={handleClose}>
        <p className="text-left local-font text-sm text-gray-500 dark:text-gray-300 mb-2">
          ツイートとスレッズとラインのほか、今から結果をブルースカイ (Bluesky) に直接投稿できるようになっています。
        </p>
        <hr className="mt-2 mb-2" />
        <p className="text-left local-font text-sm text-rose-500 dark:text-rose-300 mb-2">
          過去問がすべてアンロックされます！<br />プレイするには画面の右上に「赤いカレンダー」で過去問の日付を選択してください。
        </p>
        <hr className="mt-2 mb-2" />
        <p className="text-left local-font text-sm text-gray-500 dark:text-gray-300 mb-2">
          ゲームの統計情報を新しいデバイスに転送することができます。
        </p>
        <hr className="mt-2 mb-2" />
        <p className="text-left local-font text-sm text-gray-500 dark:text-gray-300 mb-2">
          日替わり単語がカタカナ語である場合、ゲームは自動的にひらがなモードからカタカナモードに切り替わります。
        </p>
        <hr className="mt-2 mb-2" />

        <p className="local-font text-lg leading-6 font-medium text-gray-900 dark:text-gray-100 mt-2 md:mt-4 mb-2">
          遊び方
        </p>

        <p className="text-left local-font text-sm text-gray-500 dark:text-gray-300">
          今日の単語を{MAX_CHALLENGES}回以内に当ててください。それぞれの答えはひらがな{MAX_WORD_LENGTH}文字の単語である必要があります。入力ボタンを押して答えを決定してください。
          答えるたびに正方形の色が変わり、それが次のヒントになります。
        </p>

        <div className="flex justify-center mb-2 mt-2 md:mt-4">
          <Cell value="あ" status="correct" isRevealing={true} isCompleted={true} />
          <Cell value="く" status="present" isRevealing={true} isCompleted={true} />
          <Cell value="し" status="absent" isRevealing={true} isCompleted={true} />
          <Cell value="ゅ" status="absent" isRevealing={true} isCompleted={true} />
        </div>
        <p className="local-font text-sm text-gray-500 dark:text-gray-300 pb-2">
          答えは「あまくち」
        </p>
        <p className="local-font text-left text-sm text-gray-500 dark:text-gray-300 pb-2">
          「あ」は単語の中にあり、正しい位置にあります。<br />
          「く」は単語の中にありますが、違う位置にあります。<br />
          「し」「ゅ」は単語のどこにも含まれていません。
        </p>

        <p className="local-font text-lg leading-6 font-medium text-gray-900 dark:text-gray-100 mt-2 md:mt-4 mb-2">
          ヒントモード（オン/オフ切替可能）
        </p>

        <p className="local-font text-left text-sm text-gray-500 dark:text-gray-300">
          ヒントモードは画面の右上に「設定 ⋮ 」でオン/オフを切り替えることができます。ヒントモードがオンの場合、三種類のヒントが追加で表示されます。
        </p>
        <div className="flex justify-center mb-2 mt-2 md:mt-4">
          <Cell value="た" status="close" isRevealing={true} isCompleted={true} />
          <Cell value="つ" status="close" isRevealing={true} isCompleted={true} />
          <Cell value="ま" status="vowel" isRevealing={true} isCompleted={true} />
          <Cell value="き" status="consonant" isRevealing={true} isCompleted={true} />
        </div>
        <p className="local-font text-sm text-gray-500 dark:text-gray-300 pb-2">
          答えは「だっかく」
        </p>
        <p className="local-font text-left text-sm text-gray-500 dark:text-gray-300 pb-2">
          「た」はとても惜しいです。これは正しい位置にありますが、正解は濁音「だ」です。<br />
          「つ」はとても惜しいです。これは正しい位置にありますが、正解は小書き文字「っ」です。
        </p>      
        <p className="local-font text-left text-sm text-gray-500 dark:text-gray-300 pb-2">
          <span className={isHighContrast ? "text-violet-500" : "text-lime-500" }>⬤</span> は清音、濁音、半濁音、小書き文字のどれかであることを表します。
        </p>
        <p className="local-font text-left text-sm text-gray-500 dark:text-gray-300 pb-2">
          「ま」の正方形には左右の矢印があります。この位置に正解は「ま」ではなく、五十音図内の同じ段に他の仮名（「あ・か・さ・た・な・は・や・ら・わ」「ぁ・が・ざ・だ・ば・ぱ・ゃ」）であることを示しています。<br />
        </p>
        <p className="local-font text-left text-sm text-gray-500 dark:text-gray-300 pb-2">
          「き」の正方形には上下の矢印があります。この位置に正解は「き」ではなく、五十音図内の同じ行に他の仮名（「か・く・け・こ」「が・ぎ・ぐ・げ・ご」）であることを示しています。
        </p>

        <p className="local-font text-left text-sm text-gray-500 dark:text-gray-300 pb-2">
          ヒントモードでは、下の五十音図が使われます。
        </p>

        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className={rowClassNames}>
                    <tr>
                      <td colSpan={11} className={headingClassNames}><span className={arrowClassNames}>↓↑</span> 行の一致 <span className={arrowClassNames}>↓↑</span></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={rowClassNames}>
                      <td className={cellClassNames}>わ</td><td className={cellClassNames}>ら</td><td className={cellClassNames}>や</td><td className={cellClassNames}>ま</td><td className={cellClassNames}>　は</td><td className={cellClassNames}>な</td><td className={cellClassNames}>　た</td><td className={cellClassNames}>さ</td><td className={cellClassNames}>か</td><td className={cellClassNames}>あ</td>
                      <td rowSpan={11} className={headingClassNames}><span className={arrowClassNames}>→<br />←</span><br />段<br />の<br />一<br />致<br /><span className={arrowClassNames}>→<br />←</span></td>
                    </tr>
                    <tr className={rowClassNames}>
                      <td className={cellClassNames}></td><td className={cellClassNames}>り</td><td className={cellClassNames}></td><td className={cellClassNames}>み</td><td className={cellClassNames}>　ひ</td><td className={cellClassNames}>に</td><td className={cellClassNames}>　ち</td><td className={cellClassNames}>し</td><td className={cellClassNames}>き</td><td className={cellClassNames}>い</td>
                    </tr>
                    <tr className={rowClassNames}>
                      <td className={cellClassNames}></td><td className={cellClassNames}>る</td><td className={cellClassNames}>ゆ</td><td className={cellClassNames}>む</td><td className={cellClassNames}>　ふ</td><td className={cellClassNames}>ぬ</td><td className={cellClassNames}>　つ</td><td className={cellClassNames}>す</td><td className={cellClassNames}>く</td><td className={cellClassNames}>う</td>
                    </tr>
                    <tr className={rowClassNames}>
                      <td className={cellClassNames}></td><td className={cellClassNames}>れ</td><td className={cellClassNames}></td><td className={cellClassNames}>め</td><td className={cellClassNames}>　へ</td><td className={cellClassNames}>ね</td><td className={cellClassNames}>　て</td><td className={cellClassNames}>せ</td><td className={cellClassNames}>け</td><td className={cellClassNames}>え</td>
                    </tr>
                    <tr className={rowClassNames}>
                      <td className={cellClassNames}>を</td><td className={cellClassNames}>ろ</td><td className={cellClassNames}>よ</td><td className={cellClassNames}>も</td><td className={cellClassNames}>　ほ</td><td className={cellClassNames}>の</td><td className={cellClassNames}>　と</td><td className={cellClassNames}>そ</td><td className={cellClassNames}>こ</td><td className={cellClassNames}>お</td>
                    </tr>
                    <tr className={rowClassNames}>
                      <td colSpan={10} className={dividerClassNames}></td>
                    </tr>
                    <tr className={rowClassNames}>
                      <td className={cellClassNames}></td><td className={cellClassNames}></td><td className={cellClassNames}>ゃ</td><td className={cellClassNames}></td><td className={cellClassNames}>ぱば</td><td className={cellClassNames}></td><td className={cellClassNames}>　だ</td><td className={cellClassNames}>ざ</td><td className={cellClassNames}>が</td><td className={cellClassNames}>ぁ</td>
                    </tr>
                    <tr className={rowClassNames}>
                      <td className={cellClassNames}></td><td className={cellClassNames}></td><td className={cellClassNames}></td><td className={cellClassNames}></td><td className={cellClassNames}>ぴび</td><td className={cellClassNames}></td><td className={cellClassNames}>　ぢ</td><td className={cellClassNames}>じ</td><td className={cellClassNames}>ぎ</td><td className={cellClassNames}>ぃ</td>
                    </tr>
                    <tr className={rowClassNames}>
                      <td className={cellClassNames}></td><td className={cellClassNames}></td><td className={cellClassNames}>ゅ</td><td className={cellClassNames}></td><td className={cellClassNames}>ぷぶ</td><td className={cellClassNames}></td><td className={cellClassNames}>っづ</td><td className={cellClassNames}>ず</td><td className={cellClassNames}>ぐ</td><td className={cellClassNames}>ぅ</td>
                    </tr>
                    <tr className={rowClassNames}>
                      <td className={cellClassNames}></td><td className={cellClassNames}></td><td className={cellClassNames}></td><td className={cellClassNames}></td><td className={cellClassNames}>ぺべ</td><td className={cellClassNames}></td><td className={cellClassNames}>　で</td><td className={cellClassNames}>ぜ</td><td className={cellClassNames}>げ</td><td className={cellClassNames}>ぇ</td>
                    </tr>
                    <tr className={rowClassNames}>
                      <td className={cellClassNames}></td><td className={cellClassNames}></td><td className={cellClassNames}>ょ</td><td className={cellClassNames}></td><td className={cellClassNames}>ぽぼ</td><td className={cellClassNames}></td><td className={cellClassNames}>　ど</td><td className={cellClassNames}>ぞ</td><td className={cellClassNames}>ご</td><td className={cellClassNames}>ぉ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <p className="local-font text-left text-sm text-gray-500 dark:text-gray-300 pb-2">
          「行」は子音が同じ（または近い）であることを示します。例えば「か行」は「か・き・く・け・こ」と「が・ぎ・ぐ・げ・ご」です。清音、濁音、半濁音は区別しないことに注意してください。
        </p>
        <p className="local-font text-left text-sm text-gray-500 dark:text-gray-300 pb-2">
          「段」は母音が同じであることを示します。例えば「う段」は「う・く・す・つ・ぬ・ふ・む・ゆ・る」と「ぅ・ぐ・ず・づ・っ・ぶ・ぷ・ゅ・ゔ」です。
        </p>
        <p className="local-font text-left text-sm text-gray-500 dark:text-gray-300">
          撥音「ん」と長音符「ー」は他のどの行と段にも一致しません。「ゔ」は他のどの行にも一致しません。
        </p>

        <p className="local-font text-lg leading-6 font-medium text-gray-900 dark:text-gray-100 mt-2 md:mt-4 mb-2">
          単語リストについて
        </p>

        <p className="local-font text-left text-sm text-gray-500 dark:text-gray-300 pb-2">
          単語リストは、名詞、代名詞、形容詞、副詞及び動詞が含まれています。外来語も含まれています。活用語は、基本的に終止形です。
        </p>

        <p className="local-font text-sm font-bold text-gray-500 dark:text-gray-300">
          単語は日替わりです！
        </p>
      </BaseModal>
    )
  } else {
    return (
      <BaseModal title="Latest updates" isOpen={isOpen} handleClose={handleClose}>
        <p className="text-left text-sm text-gray-500 dark:text-gray-300 mb-2">
          In addition to Tweet, Threads and LINE, you can now also post your results directly to Bluesky.
        </p>
        <hr className="mt-2 mb-2" />
        <p className="text-left text-sm text-rose-500 dark:text-rose-300 mb-2">
          All past words are now unlocked!<br />Please click on the red calendar icon on the top right corner of the screen and choose a past date to play.
        </p>
        <hr className="mt-2 mb-2" />
        <p className="text-left text-sm text-gray-500 dark:text-gray-300 mb-2">
          You can now transfer game statistics from your old device to your new device.
        </p>
        <hr className="mt-2 mb-2" />
        <p className="text-left text-sm text-gray-500 dark:text-gray-300 mb-2">
          If the word of the day is a katakana word, the game will switch from hiragana mode to katakana mode.
        </p>
        <hr className="mt-2 mb-2" />

        <p className="local-font text-lg leading-6 font-medium text-gray-900 dark:text-gray-100 mt-2 md:mt-4 mb-2">
          How to play
        </p>

        <p className="text-left text-sm text-gray-500 dark:text-gray-300">
          Guess the word of the day in {MAX_CHALLENGES} tries. Each guess must be a valid {MAX_WORD_LENGTH}-kana word. Hit the enter button to submit.
          After each guess, the colour of the tiles will change to show how close your guess was to the word.
        </p>

        <div className="flex justify-center mb-2 mt-2 md:mt-4">
          <Cell value="あ" status="correct" isRevealing={true} isCompleted={true} />
          <Cell value="く" status="present" isRevealing={true} isCompleted={true} />
          <Cell value="し" status="absent" isRevealing={true} isCompleted={true} />
          <Cell value="ゅ" status="absent" isRevealing={true} isCompleted={true} />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-300 pb-2">
          Answer: <span className="local-font">あまくち</span>
        </p>
        <p className="text-left text-sm text-gray-500 dark:text-gray-300 pb-2">
          The kana あ is in the word and in the correct spot.<br />
          The kana く is in the word but in the wrong spot.<br />
          Both kana し and ゅ are not in the word in any spot.
        </p>

        <p className="local-font text-lg leading-6 font-medium text-gray-900 dark:text-gray-100 mt-2 md:mt-4 mb-2">
          Hint Mode (ON/OFF in Settings)
        </p>

        <p className="text-left text-sm text-gray-500 dark:text-gray-300">
          Hint Mode can be turned ON/OFF in Settings. The Settings icon ⋮ is on top right of screen. Three extra types of hints are available when Hint Mode is on.
        </p>
        <div className="flex justify-center mb-2 mt-2 md:mt-4">
          <Cell value="た" status="close" isRevealing={true} isCompleted={true} />
          <Cell value="つ" status="close" isRevealing={true} isCompleted={true} />
          <Cell value="ま" status="vowel" isRevealing={true} isCompleted={true} />
          <Cell value="き" status="consonant" isRevealing={true} isCompleted={true} />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-300 pb-2">
          Answer: <span className="local-font">だっかく</span>
        </p>
        <p className="text-left text-sm text-gray-500 dark:text-gray-300 pb-2">
          The kana た is close but incorrect. It is in the correct spot but the correct answer is actually voiced kana だ.<br />
        </p>
        <p className="text-left text-sm text-gray-500 dark:text-gray-300 pb-2">
          The kana つ is close but incorrect. It is in the correct spot but the correct answer is actually small kana っ.<br />
        </p>
        <p className="text-left text-sm text-gray-500 dark:text-gray-300 pb-2">
          <span className={isHighContrast ? "local-font text-violet-500" : "local-font text-lime-500" }>■</span> indicates that it can be a basic kana, a voiced kana (゛), a semi-voiced kana (゜), or a small kana (っ).
        </p>
        <p className="text-left text-sm text-gray-500 dark:text-gray-300 pb-2">
          The kana ま has left and right arrows in its tile. It shows that the correct answer in this spot is not ま but another kana from the same ROW in the kana chart (i.e. UPPER row あ か さ た な は や ら わ LOWER row ぁ が ざ だ ば ぱ ゃ are treated as the SAME row).
        </p>
        <p className="text-left text-sm text-gray-500 dark:text-gray-300 pb-2">
          The kana き has up and down arrows in its tile. It shows that the correct answer in this spot is not き but another kana from the same COLUMN in the kana chart (i.e. か く け こ が ぎ ぐ げ ご).
        </p>

        <p className="text-left text-sm text-gray-500 dark:text-gray-300">
          This is the kana chart used in Hint Mode
        </p>

        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className={rowClassNames}>
                    <tr>
                      <td colSpan={11} className={headingClassNames}><span className={arrowClassNames}>↓↑</span> COLUMN <span className={arrowClassNames}>↓↑</span></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={rowClassNames}>
                      <td className={cellClassNames}>わ</td><td className={cellClassNames}>ら</td><td className={cellClassNames}>や</td><td className={cellClassNames}>ま</td><td className={cellClassNames}>　は</td><td className={cellClassNames}>な</td><td className={cellClassNames}>　た</td><td className={cellClassNames}>さ</td><td className={cellClassNames}>か</td><td className={cellClassNames}>あ</td>
                      <td rowSpan={11} className={headingClassNames}><span className={arrowClassNames}>→<br />←</span><br />R<br />O<br />W<br /><span className={arrowClassNames}>→<br />←</span></td>
                    </tr>
                    <tr className={rowClassNames}>
                      <td className={cellClassNames}></td><td className={cellClassNames}>り</td><td className={cellClassNames}></td><td className={cellClassNames}>み</td><td className={cellClassNames}>　ひ</td><td className={cellClassNames}>に</td><td className={cellClassNames}>　ち</td><td className={cellClassNames}>し</td><td className={cellClassNames}>き</td><td className={cellClassNames}>い</td>
                    </tr>
                    <tr className={rowClassNames}>
                      <td className={cellClassNames}></td><td className={cellClassNames}>る</td><td className={cellClassNames}>ゆ</td><td className={cellClassNames}>む</td><td className={cellClassNames}>　ふ</td><td className={cellClassNames}>ぬ</td><td className={cellClassNames}>　つ</td><td className={cellClassNames}>す</td><td className={cellClassNames}>く</td><td className={cellClassNames}>う</td>
                    </tr>
                    <tr className={rowClassNames}>
                      <td className={cellClassNames}></td><td className={cellClassNames}>れ</td><td className={cellClassNames}></td><td className={cellClassNames}>め</td><td className={cellClassNames}>　へ</td><td className={cellClassNames}>ね</td><td className={cellClassNames}>　て</td><td className={cellClassNames}>せ</td><td className={cellClassNames}>け</td><td className={cellClassNames}>え</td>
                    </tr>
                    <tr className={rowClassNames}>
                      <td className={cellClassNames}>を</td><td className={cellClassNames}>ろ</td><td className={cellClassNames}>よ</td><td className={cellClassNames}>も</td><td className={cellClassNames}>　ほ</td><td className={cellClassNames}>の</td><td className={cellClassNames}>　と</td><td className={cellClassNames}>そ</td><td className={cellClassNames}>こ</td><td className={cellClassNames}>お</td>
                    </tr>
                    <tr className={rowClassNames}>
                      <td colSpan={10} className={dividerClassNames}></td>
                    </tr>
                    <tr className={rowClassNames}>
                      <td className={cellClassNames}></td><td className={cellClassNames}></td><td className={cellClassNames}>ゃ</td><td className={cellClassNames}></td><td className={cellClassNames}>ぱば</td><td className={cellClassNames}></td><td className={cellClassNames}>　だ</td><td className={cellClassNames}>ざ</td><td className={cellClassNames}>が</td><td className={cellClassNames}>ぁ</td>
                    </tr>
                    <tr className={rowClassNames}>
                      <td className={cellClassNames}></td><td className={cellClassNames}></td><td className={cellClassNames}></td><td className={cellClassNames}></td><td className={cellClassNames}>ぴび</td><td className={cellClassNames}></td><td className={cellClassNames}>　ぢ</td><td className={cellClassNames}>じ</td><td className={cellClassNames}>ぎ</td><td className={cellClassNames}>ぃ</td>
                    </tr>
                    <tr className={rowClassNames}>
                      <td className={cellClassNames}></td><td className={cellClassNames}></td><td className={cellClassNames}>ゅ</td><td className={cellClassNames}></td><td className={cellClassNames}>ぷぶ</td><td className={cellClassNames}></td><td className={cellClassNames}>っづ</td><td className={cellClassNames}>ず</td><td className={cellClassNames}>ぐ</td><td className={cellClassNames}>ぅ</td>
                    </tr>
                    <tr className={rowClassNames}>
                      <td className={cellClassNames}></td><td className={cellClassNames}></td><td className={cellClassNames}></td><td className={cellClassNames}></td><td className={cellClassNames}>ぺべ</td><td className={cellClassNames}></td><td className={cellClassNames}>　で</td><td className={cellClassNames}>ぜ</td><td className={cellClassNames}>げ</td><td className={cellClassNames}>ぇ</td>
                    </tr>
                    <tr className={rowClassNames}>
                      <td className={cellClassNames}></td><td className={cellClassNames}></td><td className={cellClassNames}>ょ</td><td className={cellClassNames}></td><td className={cellClassNames}>ぽぼ</td><td className={cellClassNames}></td><td className={cellClassNames}>　ど</td><td className={cellClassNames}>ぞ</td><td className={cellClassNames}>ご</td><td className={cellClassNames}>ぉ</td>
                    </tr>
                  </tbody>
                </table>                
              </div>
            </div>
          </div>
        </div>

        <p className="text-left text-sm text-gray-500 dark:text-gray-300 pb-2">
          Each COLUMN contains kana that have the matching (or similar) consonant, e.g. か き く け こ が ぎ ぐ げ ご are in the same column with matching consonant K~G. Notice that basic kana, voiced kana (゛), semi-voiced kana (゜) are treated as they are in the SAME column.
        </p>
        <p className="text-left text-sm text-gray-500 dark:text-gray-300 pb-2">
          Each ROW contains kana that have the matching vowel, e.g. both UPPER row う く す つ ぬ ふ む ゆ る and LOWER row ぅ ぐ ず づ っ ぶ ぷ ゅ ゔ are treated as the SAME row with the matching vowel U.
        </p>
        <p className="text-left text-sm text-gray-500 dark:text-gray-300">
          Both the kana ん and the long sound mark ー do not have any matching rows or columns. And the kana ゔ does not have matching columns.
        </p>

        <p className="local-font text-lg leading-6 font-medium text-gray-900 dark:text-gray-100 mt-2 md:mt-4 mb-2">
          About the word list
        </p>

        <p className="text-left text-sm text-gray-500 dark:text-gray-300 pb-2">
          The word list includes nouns, pronouns, adjectives, adverbs and verbs. Foreign loanwords are also included. Conjugable words are in plain form (i.e. dictionary form).
        </p>

        <p className="text-sm font-bold text-gray-500 dark:text-gray-300">
          A new word will be available each day!<br />
        </p>
      </BaseModal>
    )
  }
}
