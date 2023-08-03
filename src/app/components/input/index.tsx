import { InputHTMLAttributes, useCallback } from "react"
import { percent, currency } from "../masks";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  prefix?: string
}

const Input: React.FC<InputProps> = ({prefix, ...props}) => {


  return (
    <div className="flex w-full justify-center">
      {prefix && <span className="rounded-l-lg h-12 w-14 p-1 flex items-center justify-center bg-stone-200 text-purple-700">{prefix}</span>}
      <input {...props} className='rounded-r-lg p-2 text-lg w-full'/>
    </div>
  )
}

export default Input