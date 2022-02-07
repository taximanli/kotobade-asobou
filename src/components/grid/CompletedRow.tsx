import { getGuessStatuses } from '../../lib/statuses'
import { Cell } from './Cell'

type Props = {
  guess: string
  revealing?: boolean
}

export const CompletedRow = ({ guess, revealing }: Props) => {
  const statuses = getGuessStatuses(guess)

  return (
    <div className="flex justify-center mb-1">
      {guess.split('').map((letter, i) => (
        <Cell
          key={i}
          value={letter}
          status={statuses[i]}
          position={i}
          revealing={revealing}
          completed
        />
      ))}
    </div>
  )
}
