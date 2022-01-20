 import {Progress} from './progress'

type Props = {
  data: number[]
}

export const Histogram = ({ data }: Props) => {
  const min = 10
  const max = Math.ceil(Math.max.apply(null, data)*1.2)
  return(
    <div className="columns-1 justify-left m-2 text-sm">
        { data.map(( value, i ) => (
          <Progress key={i} index={i} size={min+100*value/max}
                    label={String(value)} />
          ))
        }
    </div>
  )
}
