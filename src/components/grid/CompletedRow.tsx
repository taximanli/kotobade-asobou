import { getGuessStatuses } from '../../lib/statuses'
import { Cell } from './Cell'
import { solution, unicodeSplit } from '../../lib/words'
import { JISHO_SEARCH_LINK } from '../../constants/strings'

type Props = {
  key: number
  guess: string
  isRevealing?: boolean
}

export const CompletedRow = ({ guess, isRevealing }: Props) => {
  const statuses = getGuessStatuses(guess, solution)
  const splitGuess = unicodeSplit(guess)

  const onClick = () => {
    window.open(JISHO_SEARCH_LINK + guess, "_blank")
  }

  return (
    <div className="flex justify-center mb-1 mx-1 cursor-zoom-in" onClick={onClick} >
      {splitGuess.map((letter, i) => (
        <Cell
          key={i}
          value={letter}
          status={statuses[i]}
          position={i}
          isRevealing={isRevealing}
          isCompleted
        />
      ))}
    </div>
  )
}
