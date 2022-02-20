import { useTranslation } from 'react-i18next';
import { Key } from './Key'
import { MAX_WORD_LENGTH } from '../../constants/settings'
import { ENTER_TEXT, DELETE_TEXT } from '../../constants/strings'

type Props = {
    onDelete: Function
    onEnter: Function
    currentGuess: string
    setCurrentGuess: Function
}

export const Bar = ({
    onDelete,
    onEnter,
    currentGuess,
    setCurrentGuess,
}: Props) => {

    const { t } = useTranslation();

    const handleInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const filteredInput = event.target.value.replace(/[^ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろわをんゔー]/, '')
        setCurrentGuess(filteredInput)
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
            name="word"
            className="h-7 xs:h-8 sm:h-10 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600 border-solid border-2 mx-0.5 pl-2 text-lg sm:text-xl local-font rounded dark:text-white"
            size={10}
            maxLength={MAX_WORD_LENGTH}
            placeholder={t('For keyboard input')}
            value={currentGuess}
            onChange={handleInput}
            onKeyUp={handleKeyUp}
        />
        <Key value="DELETE" onClick={onClick}>
          {DELETE_TEXT}
        </Key>
    </div>
    )
}
