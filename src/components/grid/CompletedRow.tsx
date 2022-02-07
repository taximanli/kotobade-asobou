import { getGuessStatuses } from '../../lib/statuses'
import { Cell } from './Cell'

type Props = {
  guess: string
  revealing?: boolean
}

export const CompletedRow = ({ guess, revealing }: Props) => {
  const statuses = getGuessStatuses(guess)

  return (
    <div className="flex justify-center mb-1 completedRow">
      {guess.split('').map((letter, i) => (
        <Cell
          key={i}
          value={letter}
          status={statuses[i]}
          revealing={revealing}
          completed
        />
      ))}
    </div>
  )
}
