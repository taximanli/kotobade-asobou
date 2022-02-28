import { Key } from './Key'
import { MAX_WORD_LENGTH } from '../../constants/settings'
import { t, ENTER_TEXT, DELETE_TEXT } from '../../constants/strings'
import { unicodeLength, unicodeSplit } from '../../lib/words'

type Props = {
    onDelete: Function
    onEnter: Function
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
        /*
        const filteredInput = event.target.value.replace(/[^ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろわをんゔー]/, '')
        setCurrentGuess(filteredInput)
        */

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
        }
      }
                
    return (
    <div className='flex justify-center pb-2 md:pb-3'>
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
    </div>
    )
}
