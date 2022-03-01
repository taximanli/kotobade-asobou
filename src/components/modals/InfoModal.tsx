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

  if (displayLanguage === PREFERRED_DISPLAY_LANGUAGE) {
    return (
      <BaseModal title="遊び方" isOpen={isOpen} handleClose={handleClose}>
        <p className="text-left local-font text-sm text-gray-500 dark:text-gray-300">
          今日の単語を{MAX_CHALLENGES}回以内に当ててください。それぞれの答えはひらがな{MAX_WORD_LENGTH}文字の単語である必要があります。入力ボタンを押して答えを決定してください。
          答えるたびに正方形の色が変わり、それが次のヒントになります。
        </p>

        <div className="flex justify-center mb-2 mt-2 md:mt-4">
          <Cell value="あ" status="correct" isRevealing={true} isCompleted={true} />
          <Cell value="け" status="close" isRevealing={true} isCompleted={true} />
          <Cell value="し" status="present" isRevealing={true} isCompleted={true} />
          <Cell value="め" status="absent" isRevealing={false} isCompleted={true} />
        </div>
        <p className="local-font text-sm text-gray-500 dark:text-gray-300 pb-2">
          答えは「あげだし」
        </p>
        <p className="local-font text-left text-sm text-gray-500 dark:text-gray-300 pb-2">
          「あ」は単語の中にあり、正しい位置にあります。<br />
          「け」はとても惜しいです。これは正しい位置にありますが、正解は「げ」です。<br />
          「し」は単語の中にありますが、違う位置にあります。<br />
          「め」は単語のどこにも含まれていません。
        </p>
        <p className="local-font text-left text-sm text-gray-500 dark:text-gray-300">
          <span className={isHighContrast ? "text-violet-500" : "text-lime-500" }>■</span> は清音、濁音、半濁音、小書き文字のどれかであることを表します。
        </p>

        <p className="local-font text-lg leading-6 font-medium text-gray-900 dark:text-gray-100 mt-2 md:mt-4 mb-2">
          ヒントモード（オン/オフ切替可能）
        </p>
        <p className="local-font text-left text-sm text-gray-500 dark:text-gray-300">
          ヒントモードは画面の右上に「設定 ⋮ 」でオン/オフを切り替えることができます。ヒントモードがオンの場合、二種類のヒントが追加で表示されます。
        </p>
        <div className="flex justify-center mb-2 mt-2 md:mt-4">
          <Cell value="な" status="consonant" isRevealing={true} isCompleted={true} />
          <Cell value="っ" isRevealing={false} isCompleted={true} />
          <Cell value="と" status="vowel" isRevealing={true} isCompleted={true} />
          <Cell value="う" isRevealing={false} isCompleted={true} />
        </div>
        <p className="local-font text-sm text-gray-500 dark:text-gray-300 pb-2">
          答えは「にっこう」
        </p>
        <p className="local-font text-left text-sm text-gray-500 dark:text-gray-300 pb-2">
          「な」の正方形には上下の矢印があります。正解は「な」ではなく、五十音図内の同じ行に他の仮名（に・ぬ・ね・の）であることを示しています。
        </p>
        <p className="local-font text-left text-sm text-gray-500 dark:text-gray-300 pb-2">
          「と」の正方形には左右の矢印があります。正解は「と」ではなく、五十音図内の同じ段に他の仮名（お・こ・そ等）であることを示しています。<br />
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
                      <td colSpan={16} className={headingClassNames}><span className={arrowClassNames}>↓↑</span> 行の一致 <span className={arrowClassNames}>↓↑</span></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={rowClassNames}>
                      <td className={cellClassNames}>ぱ</td><td className={cellClassNames}>ば</td><td className={cellClassNames}>だ</td><td className={cellClassNames}>ざ</td><td className={cellClassNames}>が</td><td className={cellClassNames}>わ</td><td className={cellClassNames}>ら</td><td className={cellClassNames}>や<br />ゃ</td><td className={cellClassNames}>ま</td><td className={cellClassNames}>は</td><td className={cellClassNames}>な</td><td className={cellClassNames}>た</td><td className={cellClassNames}>さ</td><td className={cellClassNames}>か</td><td className={cellClassNames}>あ<br />ぁ</td>
                      <td rowSpan={5} className={headingClassNames}><span className={arrowClassNames}>→<br />←</span><br />段<br />の<br />一<br />致<br /><span className={arrowClassNames}>→<br />←</span></td>
                    </tr>
                    <tr className={rowClassNames}>
                      <td className={cellClassNames}>ぴ</td><td className={cellClassNames}>び</td><td className={cellClassNames}>ぢ</td><td className={cellClassNames}>じ</td><td className={cellClassNames}>ぎ</td><td className={cellClassNames}></td><td className={cellClassNames}>り</td><td className={cellClassNames}></td><td className={cellClassNames}>み</td><td className={cellClassNames}>ひ</td><td className={cellClassNames}>に</td><td className={cellClassNames}>ち</td><td className={cellClassNames}>し</td><td className={cellClassNames}>き</td><td className={cellClassNames}>い<br />ぃ</td>
                    </tr>
                    <tr className={rowClassNames}>
                      <td className={cellClassNames}>ぷ</td><td className={cellClassNames}>ぶ</td><td className={cellClassNames}>づ</td><td className={cellClassNames}>ず</td><td className={cellClassNames}>ぐ</td><td className={cellClassNames}></td><td className={cellClassNames}>る</td><td className={cellClassNames}>ゆ<br />ゅ</td><td className={cellClassNames}>む</td><td className={cellClassNames}>ふ</td><td className={cellClassNames}>ぬ</td><td className={cellClassNames}>つ<br />っ</td><td className={cellClassNames}>す</td><td className={cellClassNames}>く</td><td className={cellClassNames}>う<br />ぅ</td>
                    </tr>
                    <tr className={rowClassNames}>
                      <td className={cellClassNames}>ぺ</td><td className={cellClassNames}>べ</td><td className={cellClassNames}>で</td><td className={cellClassNames}>ぜ</td><td className={cellClassNames}>げ</td><td className={cellClassNames}></td><td className={cellClassNames}>れ</td><td className={cellClassNames}></td><td className={cellClassNames}>め</td><td className={cellClassNames}>へ</td><td className={cellClassNames}>ね</td><td className={cellClassNames}>て</td><td className={cellClassNames}>せ</td><td className={cellClassNames}>け</td><td className={cellClassNames}>え<br />ぇ</td>
                    </tr>
                    <tr className={rowClassNames}>
                      <td className={cellClassNames}>ぽ</td><td className={cellClassNames}>ぼ</td><td className={cellClassNames}>ど</td><td className={cellClassNames}>ぞ</td><td className={cellClassNames}>ご</td><td className={cellClassNames}>を</td><td className={cellClassNames}>ろ</td><td className={cellClassNames}>よ<br />ょ</td><td className={cellClassNames}>も</td><td className={cellClassNames}>ほ</td><td className={cellClassNames}>の</td><td className={cellClassNames}>と</td><td className={cellClassNames}>そ</td><td className={cellClassNames}>こ</td><td className={cellClassNames}>お<br />ぉ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <p className="local-font text-left text-sm text-gray-500 dark:text-gray-300 pb-2">
          「行」は子音が同じであることを示します。<br />例えば「さ行」は「さ・し・す・せ・そ」です。清音、濁音、半濁音は区別することに注意してください。
        </p>
        <p className="local-font text-left text-sm text-gray-500 dark:text-gray-300 pb-2">
          「段」は母音が同じであることを示します。<br />例えば「う段」は「う・く・す・つ・ぬ・ふ・む・ゆ・る・ぐ・ず・づ・ぶ・ぷ」です。
        </p>
        <p className="local-font text-left text-sm text-gray-500 dark:text-gray-300">
          撥音「ん」と長音符「ー」は他のどの行と段にも一致しません。
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
      <BaseModal title="How to play" isOpen={isOpen} handleClose={handleClose}>
        <p className="text-left text-sm text-gray-500 dark:text-gray-300">
          Guess the word of the day in {MAX_CHALLENGES} tries. Each guess must be a valid {MAX_WORD_LENGTH}-kana word. Hit the enter button to submit.
          After each guess, the colour of the tiles will change to show how close your guess was to the word.
        </p>

        <div className="flex justify-center mb-2 mt-2 md:mt-4">
          <Cell value="あ" status="correct" isRevealing={true} isCompleted={true} />
          <Cell value="け" status="close" isRevealing={true} isCompleted={true} />
          <Cell value="し" status="present" isRevealing={true} isCompleted={true} />
          <Cell value="め" status="absent" isRevealing={false} isCompleted={true} />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-300 pb-2">
          Answer: <span className="local-font">あげだし</span>
        </p>
        <p className="text-left text-sm text-gray-500 dark:text-gray-300 pb-2">
          The kana あ is in the word and in the correct spot.<br />
          The kana け is close but incorrect. It is in the correct spot but the correct answer should be げ.<br />
          The kana し is in the word but in the wrong spot.<br />
          The kana め is not in the word in any spot.<br />
        </p>
        <p className="text-left text-sm text-gray-500 dark:text-gray-300">
          <span className={isHighContrast ? "local-font text-violet-500" : "local-font text-lime-500" }>■</span> indicates that it can be a basic kana, a voiced kana (゛), a semi-voiced kana (゜), or a small kana (っ).
        </p>

        <p className="local-font text-lg leading-6 font-medium text-gray-900 dark:text-gray-100 mt-2 md:mt-4 mb-2">
          Hint Mode
        </p>

        <p className="text-left text-sm text-gray-500 dark:text-gray-300">
          Hint Mode can be switched ON/OFF in Settings. The Settings icon ⋮ is on top right of screen. Two extra types of hints are available when Hint Mode is switched on.
        </p>
        <div className="flex justify-center mb-2 mt-2 md:mt-4">
          <Cell value="な" status="consonant" isRevealing={true} isCompleted={true} />
          <Cell value="っ" isRevealing={false} isCompleted={true} />
          <Cell value="と" status="vowel" isRevealing={true} isCompleted={true} />
          <Cell value="う" isRevealing={false} isCompleted={true} />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-300 pb-2">
          Answer: <span className="local-font">にっこう</span>
        </p>
        <p className="text-left text-sm text-gray-500 dark:text-gray-300 pb-2">
          The kana な has up and down arrows in its tile. It shows that the correct answer in this spot is not な but another kana from the same COLUMN in the kana chart (i.e. に/ぬ/ね/の).
        </p>
        <p className="text-left text-sm text-gray-500 dark:text-gray-300 pb-2">
          The kana と has left and right arrows in its tile. It shows that the correct answer in this spot is not と but another kana from the same ROW in the kana chart (i.e. お/こ/そ...).
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
                      <td colSpan={16} className={headingClassNames}><span className={arrowClassNames}>↓↑</span> COLUMN <span className={arrowClassNames}>↓↑</span></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={rowClassNames}>
                      <td className={cellClassNames}>ぱ</td><td className={cellClassNames}>ば</td><td className={cellClassNames}>だ</td><td className={cellClassNames}>ざ</td><td className={cellClassNames}>が</td><td className={cellClassNames}>わ</td><td className={cellClassNames}>ら</td><td className={cellClassNames}>や<br />ゃ</td><td className={cellClassNames}>ま</td><td className={cellClassNames}>は</td><td className={cellClassNames}>な</td><td className={cellClassNames}>た</td><td className={cellClassNames}>さ</td><td className={cellClassNames}>か</td><td className={cellClassNames}>あ<br />ぁ</td>
                      <td rowSpan={5} className={headingClassNames}><span className={arrowClassNames}>→<br />←</span><br />R<br />O<br />W<br /><span className={arrowClassNames}>→<br />←</span></td>
                    </tr>
                    <tr className={rowClassNames}>
                      <td className={cellClassNames}>ぴ</td><td className={cellClassNames}>び</td><td className={cellClassNames}>ぢ</td><td className={cellClassNames}>じ</td><td className={cellClassNames}>ぎ</td><td className={cellClassNames}></td><td className={cellClassNames}>り</td><td className={cellClassNames}></td><td className={cellClassNames}>み</td><td className={cellClassNames}>ひ</td><td className={cellClassNames}>に</td><td className={cellClassNames}>ち</td><td className={cellClassNames}>し</td><td className={cellClassNames}>き</td><td className={cellClassNames}>い<br />ぃ</td>
                    </tr>
                    <tr className={rowClassNames}>
                      <td className={cellClassNames}>ぷ</td><td className={cellClassNames}>ぶ</td><td className={cellClassNames}>づ</td><td className={cellClassNames}>ず</td><td className={cellClassNames}>ぐ</td><td className={cellClassNames}></td><td className={cellClassNames}>る</td><td className={cellClassNames}>ゆ<br />ゅ</td><td className={cellClassNames}>む</td><td className={cellClassNames}>ふ</td><td className={cellClassNames}>ぬ</td><td className={cellClassNames}>つ<br />っ</td><td className={cellClassNames}>す</td><td className={cellClassNames}>く</td><td className={cellClassNames}>う<br />ぅ</td>
                    </tr>
                    <tr className={rowClassNames}>
                      <td className={cellClassNames}>ぺ</td><td className={cellClassNames}>べ</td><td className={cellClassNames}>で</td><td className={cellClassNames}>ぜ</td><td className={cellClassNames}>げ</td><td className={cellClassNames}></td><td className={cellClassNames}>れ</td><td className={cellClassNames}></td><td className={cellClassNames}>め</td><td className={cellClassNames}>へ</td><td className={cellClassNames}>ね</td><td className={cellClassNames}>て</td><td className={cellClassNames}>せ</td><td className={cellClassNames}>け</td><td className={cellClassNames}>え<br />ぇ</td>
                    </tr>
                    <tr className={rowClassNames}>
                      <td className={cellClassNames}>ぽ</td><td className={cellClassNames}>ぼ</td><td className={cellClassNames}>ど</td><td className={cellClassNames}>ぞ</td><td className={cellClassNames}>ご</td><td className={cellClassNames}>を</td><td className={cellClassNames}>ろ</td><td className={cellClassNames}>よ<br />ょ</td><td className={cellClassNames}>も</td><td className={cellClassNames}>ほ</td><td className={cellClassNames}>の</td><td className={cellClassNames}>と</td><td className={cellClassNames}>そ</td><td className={cellClassNames}>こ</td><td className={cellClassNames}>お<br />ぉ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <p className="text-left text-sm text-gray-500 dark:text-gray-300 pb-2">
          Each COLUMN contains kana that have the matching consonant e.g. か/き/く/け/こ are in the same column with the same consonant K. Notice that basic kana, voiced kana (゛), semi-voiced kana (゜) are seen as separate columns.
        </p>
        <p className="text-left text-sm text-gray-500 dark:text-gray-300 pb-2">
          Each ROW contains kana that have the matching vowel e.g. う/く/す/つ/ぬ/ふ/む/ゆ/る/ぐ/ず/づ/ぶ/ぷ are in the same row with the same vowel U.
        </p>
        <p className="text-left text-sm text-gray-500 dark:text-gray-300">
          Both the kana ん and the long sound mark ー do not have any matching rows or columns.
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
