import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'
import { MAX_CHALLENGES } from '../../constants/settings'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="How to play 遊び方" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-left text-sm text-gray-500 dark:text-gray-300 pb-2">
        Guess the word of the day in {MAX_CHALLENGES} tries. Each guess must be a valid 4-kana word. Hit the enter button to submit.
        After each guess, the colour of the tiles will change to show how close your guess was to the word.
      </p>
      <p className="text-left local-font text-sm text-gray-500 dark:text-gray-300 pb-2">
        今日の単語を{MAX_CHALLENGES}回以内に当ててください。それぞれの答えはひらがな4文字の単語である必要があります。入力ボタンを押して答えを決定してください。
        答えるたびに正方形の色が変わり、それが次のヒントになります。
      </p>

      <div className="flex justify-center mb-1 mt-2 md:mt-4">
        <Cell value="て" status="correct" />
        <Cell value="り" />
        <Cell value="や" />
        <Cell value="き" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The kana て is in the word and in the correct spot.<br />
        <span className='local-font'>「て」は単語の中にあり、正しい位置にあります。</span>
      </p>

      <div className="flex justify-center mb-1 mt-2 md:mt-4">
        <Cell value="か" />
        <Cell value="ん" />
        <Cell value="む" status="present" />
        <Cell value="り" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The kana む is in the word but in the wrong spot.<br />
        <span className='local-font'>「む」は単語の中にありますが、違う位置にあります。</span>
      </p>

      <div className="flex justify-center mb-1 mt-2 md:mt-4">
        <Cell value="ふ" />
        <Cell value="た" />
        <Cell value="た" />
        <Cell value="び" status="absent" />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The kana び is not in the word in any spot.<br />
        <span className='local-font'>「び」は単語のどこにも含まれていません。</span>
      </p>

      <hr className="mt-4 mb-4" />

      <p className="text-left text-sm font-bold text-gray-500 dark:text-gray-300 pb-2">
        A new word will be available each day!<br />
        <span className='local-font'>単語は日替わりです！</span>
      </p>
    </BaseModal>
  )
}
