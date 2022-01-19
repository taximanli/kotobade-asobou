

type Props = {
  labels: string[]
  values: string[]
}

export const StatLine = ({labels, values}: Props) => {
  return (
    <div className="flex justify-center m-1">
    {values.map((value,i ) => (                  
       <div className="items-center justify-center m-1 w-1/4 bg-blue-300">
         <div className="text-3xl font-bold">{value} </div>
         <div className="text-sm">{labels[i]}</div>
       </div>   
    ))}
    </div>
  )
}
