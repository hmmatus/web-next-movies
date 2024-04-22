import React from "react"
import { type ReactNode } from "react"

interface InputWrapperP {
  children: ReactNode
  label: string
  error?: string
}
const InputWrapper = ({ children, label, error }: InputWrapperP): ReactNode => {
  return (
    <div className="w-full">
      <h4 className="my-2">{label}</h4>
      {children}
      {error != null && <p className="text-error my-2">{error}</p>}
    </div>
  )
}

export default InputWrapper
