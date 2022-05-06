import { MAX_CHALLENGES } from '../../constants/settings'
import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'

type Props = {
  guesses: string[]
  currentGuess: string
  isRevealing?: boolean
  currentRowClassName: string
}

export const Grid = ({
  guesses,
  currentGuess,
  isRevealing,
  currentRowClassName,
}: Props) => {
  const empties =
    guesses.length < MAX_CHALLENGES - 1
      ? Array.from(Array(MAX_CHALLENGES - 1 - guesses.length))
      : []

  return (
    <div className='flex justify-center pb-1 md:pb-2'>
      <div className="grid grid-rows-6 grid-flow-col">
        {guesses.map((guess, i) => (
          <CompletedRow
            key={i}
            guess={guess}
            isRevealing={isRevealing && guesses.length - 1 === i}
            />
        ))}
        {guesses.length < MAX_CHALLENGES && (
          <CurrentRow guess={currentGuess} className={currentRowClassName} />
        )}
        {empties.map((_, i) => (
          <EmptyRow key={i} />
        ))}
      </div>
    </div>
  )
}
