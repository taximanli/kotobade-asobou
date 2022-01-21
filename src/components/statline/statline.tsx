

type Props = {
  labels: string[]
  values: string[]
}

export const StatLine = ({labels, values}: Props) => {
  return (
    <div className="flex justify-center m-1">
    {values.map((value,i ) => (
       <div key={i} className="items-center justify-center m-1 w-1/4">
         <div className="text-3xl font-bold">{value} </div>
         <div className="text-sm">{labels[i]}</div>
       </div>
    ))}
    </div>
  )
}
