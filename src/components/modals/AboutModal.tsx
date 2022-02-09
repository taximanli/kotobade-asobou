import {
  SunIcon,
  MoonIcon,
} from '@heroicons/react/outline'
import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  isDark: boolean
  handleDark: (dark: boolean) => void
  handleClose: () => void
}

export const AboutModal = ({ isOpen, isDark, handleDark, handleClose }: Props) => {
  return (
    <BaseModal title="Settings 設定" isOpen={isOpen} handleClose={handleClose}>
      <div className="mt-5 sm:mt-6 grid grid-cols-4 gap-4 dark:text-white">

        <div className='col-span-3'>
          <p className="text-left text-font text-sm md:text-base text-gray-500 dark:text-gray-300">
            Hard Mode ハードモード
          </p>
          <p className="text-left text-font text-xs md:text-sm text-gray-500 dark:text-gray-300">
            Any revealed hints must be used in subsequent guesses.<br />
            開示されたすべてのヒントを満たす単語だけが入力できます。
          </p>
        </div>
        <div className='col-span-1'>
        </div>

        <div className='col-span-3'>
          <p className="text-left text-font text-base md:text-lg text-gray-500 dark:text-gray-300">
            Dark Theme ダークテーマ
          </p>
        </div>
        <div className='col-span-1 justify-items-end'>
          {isDark ? (
            <SunIcon
              className="h-6 w-6 mr-2 cursor-pointer dark:stroke-white"
              onClick={() => handleDark(!isDark)}
            />
          ) : (
            <MoonIcon
              className="h-6 w-6 mr-2 cursor-pointer"
              onClick={() => handleDark(!isDark)}
            />
          )}
        </div>

        <div className='col-span-3'>
          <p className="text-left text-font text-base md:text-lg text-gray-500 dark:text-gray-300">
            Colour Blind Mode 色覚特性モード
          </p>
          <p className="text-left text-font text-xs md:text-sm text-gray-500 dark:text-gray-300">
            High contrast colours<br/>
            色がハイコントラストになります
          </p>
        </div>
        <div className='col-span-1'>
        </div>

        <div className='col-span-3'>
          <p className="text-left text-font text-base md:text-lg text-gray-500 dark:text-gray-300">
            Feedback フィードバック
          </p>
        </div>
        <div className='col-span-1'>
          {' '}<a href="https://twitter.com/taximanli" className="underline font-bold" target="blank" >Twitter</a>{' '}
        </div>

      </div>
    </BaseModal>
  )
}
