import { MAX_WORD_LENGTH } from '../../constants/settings'
import { ENTER_TEXT } from '../../constants/strings'

type Props = {
    onEnter: Function
    currentGuess: string
    setCurrentGuess: Function
}

export const WordForm = ({
    onEnter,
    currentGuess,
    setCurrentGuess,
}: Props) => {

    const handleInput: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setCurrentGuess(event.target.value)
    }    

    const handleKeyUp: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
        event.stopPropagation()
    }    

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault()
        onEnter()
    }
            
    return (
    <div className='flex justify-center pb-2 md:pb-3'>
        <form className="" onSubmit={handleSubmit}>
        <input 
            type="text"
            name="word"
            className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600 border-solid border-2 mx-0.5 pl-2 text-lg sm:text-xl text-font rounded dark:text-white"
            size={MAX_WORD_LENGTH * 3}
            maxLength={MAX_WORD_LENGTH}
            placeholder="キーボード入力用"
            value={currentGuess}
            onChange={handleInput}
            onKeyUp={handleKeyUp}
        />
        <input 
            type="submit" 
            className="w-10 h-8 bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 active:bg-slate-400 rounded mx-0.5 text-lg sm:text-xl key-font font-bold cursor-pointer select-none dark:text-white"
            value={ENTER_TEXT}
        />
        </form>
    </div>
    )
}
