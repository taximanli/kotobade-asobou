import { Bar } from './Bar'
import { Keyboard } from './Keyboard'

type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  setCurrentGuess: Function
  setCurrentInputText: Function
  currentInputText: string
  setActiveAppArea: Function
  activeAppArea: string
  guesses: string[]
  isRevealing?: boolean
}
  
export const AppArea = ({
  onChar,
  onDelete,
  onEnter,
  setCurrentGuess,
  setCurrentInputText,
  currentInputText,
  setActiveAppArea,
  activeAppArea,
  guesses,
  isRevealing,
}: Props) => {

  return (
    <div>
      {activeAppArea === 'Bar,Keyboard' ?
        (
          <Bar
            onDelete={onDelete}
            onEnter={onEnter}
            setCurrentGuess={setCurrentGuess}
            setCurrentInputText={setCurrentInputText}
            currentInputText={currentInputText}
          />
        )
        : activeAppArea === 'Keyboard,Bar' ?
        (
          <Keyboard
            onChar={onChar}
            onDelete={onDelete}
            onEnter={onEnter}
            guesses={guesses}
            isRevealing={isRevealing}
          />
        )
        : null
      }
      <div className='flex justify-center pb-2 md:pb-3'>
      </div>
      {activeAppArea === 'Bar,Keyboard' ?
        (
          <Keyboard
            onChar={onChar}
            onDelete={onDelete}
            onEnter={onEnter}
            guesses={guesses}
            isRevealing={isRevealing}
          />
        )
        : activeAppArea === 'Keyboard,Bar' ?
        (
          <Bar
            onDelete={onDelete}
            onEnter={onEnter}
            setCurrentGuess={setCurrentGuess}
            setCurrentInputText={setCurrentInputText}
            currentInputText={currentInputText}
          />
        )
        : null
      }
    </div>
  )
}