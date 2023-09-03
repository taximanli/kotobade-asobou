import {
  SearchIcon,
} from '@heroicons/react/outline'
import { Key } from './Key'
import { MAX_WORD_LENGTH } from '../../constants/settings'
import { t, ENTER_TEXT, DELETE_TEXT, JISHO_SEARCH_LINK } from '../../constants/strings'
import { unicodeLength, unicodeSplit } from '../../lib/words'

type Props = {
    onDelete: () => void
    onEnter: () => void
    setCurrentGuess: Function
    setCurrentInputText: Function
    currentInputText: string
}

export const Bar = ({
    onDelete,
    onEnter,
    setCurrentGuess,
    setCurrentInputText,
    currentInputText,
}: Props) => {

    const handleInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        let inputText = event.target.value

        if (unicodeLength(inputText) > MAX_WORD_LENGTH) {
          inputText = unicodeSplit(inputText).slice(0, MAX_WORD_LENGTH).join('')
        }

        setCurrentGuess(inputText)
        setCurrentInputText(event.target.value)
    }    

    const handleKeyUp: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
        event.stopPropagation()
        if (event.code === 'Enter') {
          onEnter()
        }
    }    

    const onClick = (value: string) => {
        if (value === 'ENTER') {
          onEnter()
        } else if (value === 'DELETE') {
          onDelete()
        } else if (value === 'SEARCH') {
          if (currentInputText !== '') {
            window.open(JISHO_SEARCH_LINK + currentInputText, "_blank")
          }
        }
      }
                
    return (
    <div className='flex justify-center'>
        <Key value="ENTER" onClick={onClick}>
          {ENTER_TEXT}
        </Key>
        <input 
            type="text"
            name="inputText"
            className="h-7 xs:h-8 sm:h-10 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600 border-solid border-2 mx-0.5 pl-2 text-lg sm:text-xl local-font rounded dark:text-white"
            size={10}
            placeholder={t('For keyboard input')}
            value={currentInputText}
            onChange={handleInput}
            onKeyUp={handleKeyUp}
        />
        <Key value="DELETE" onClick={onClick}>
          {DELETE_TEXT}
        </Key>
        <Key value="SEARCH" onClick={onClick}>
          <SearchIcon
            className="h-6 w-6 cursor-pointer dark:stroke-white"
          />
        </Key>
    </div>
    )
}
