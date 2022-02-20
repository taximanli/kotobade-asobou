import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'
import { MAX_WORD_LENGTH, MAX_CHALLENGES } from '../../constants/settings'
import { getStoredDisplayLanguage, getStoredIsHighContrastMode } from '../../lib/localStorage'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  const isHighContrast = getStoredIsHighContrastMode()
  const displayLanguage = getStoredDisplayLanguage()
  if (displayLanguage === 'en') {
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
          <span className={isHighContrast ? "local-font text-violet-500" : "local-font text-lime-500" }>■</span> indicates that it can be a basic kana, a voiced kana, a semi-voiced kana, or a small kana.
        </p>

        <p className="local-font text-lg leading-6 font-medium text-gray-900 dark:text-gray-100 mt-2 md:mt-4">
          Hint Mode
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
          The kana な has up and down arrows in its tile. It shows that the correct answer is not な but another kana from the same COLUMN in the 50 kana chart (i.e. に/ぬ/ね/の).
        </p>
        <p className="text-left text-sm text-gray-500 dark:text-gray-300 pb-2">
          The kana と has left and right arrows in its tile. It shows that the correct answer is not と but another kana from the same ROW in the 50 kana chart (i.e. お/こ/そ...).
        </p>

        <hr className="mt-4 mb-4" />

        <p className="text-left text-sm font-bold text-gray-500 dark:text-gray-300">
          A new word will be available each day!<br />
        </p>
      </BaseModal>
    )
  } else {
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
          答え「あげだし」
        </p>
        <p className="local-font text-left text-sm text-gray-500 dark:text-gray-300 pb-2">
          「あ」は単語の中にあり、正しい位置にあります。<br />
          「け」はとても惜しいです。これは正しい位置にありますが、正解は「げ」です。
          「し」は単語の中にありますが、違う位置にあります。<br />
          「め」は単語のどこにも含まれていません。
        </p>
        <p className="local-font text-left text-sm text-gray-500 dark:text-gray-300">
          <span className={isHighContrast ? "text-violet-500" : "text-lime-500" }>■</span> は清音、濁音、半濁音、小書き文字のどれかであることを表します。
        </p>

        <p className="local-font text-lg leading-6 font-medium text-gray-900 dark:text-gray-100 mt-2 md:mt-4">
          ヒントモード
        </p>

        <div className="flex justify-center mb-2 mt-2 md:mt-4">
          <Cell value="な" status="consonant" isRevealing={true} isCompleted={true} />
          <Cell value="っ" isRevealing={false} isCompleted={true} />
          <Cell value="と" status="vowel" isRevealing={true} isCompleted={true} />
          <Cell value="う" isRevealing={false} isCompleted={true} />
        </div>
        <p className="local-font text-sm text-gray-500 dark:text-gray-300 pb-2">
          答え「にっこう」
        </p>
        <p className="local-font text-left text-sm text-gray-500 dark:text-gray-300 pb-2">
          「な」の正方形には上下の矢印があります。正解は「な」ではなく、五十音表の同じ行からの別の仮名（に・ぬ・ね・の）であることを示しています。
        </p>
        <p className="local-font text-left text-sm text-gray-500 dark:text-gray-300">
          「と」の正方形には左右の矢印があります。正解は「と」ではなく、五十音表の同じ段からの別の仮名（お・こ・そ等）であることを示しています。<br />
        </p>

        <hr className="mt-4 mb-4" />

        <p className="local-font text-left text-sm font-bold text-gray-500 dark:text-gray-300">
          単語は日替わりです！
        </p>
      </BaseModal>
    )
  }
}
