import InputWrapper from "@/components/wrappers/inputWrapper/InputWrapper"
import { Switch, type InputProps } from "antd"
import type React from "react"
import { type ReactElement } from "react"
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form"

interface InputTextI<T extends FieldValues> extends InputProps {
  label: string
  errorMessage: string
  control: Control<T>
  name: Path<T>
}
const InputSwitch = <T extends FieldValues>(
  props: InputTextI<T>,
): ReactElement => {
  return (
    <InputWrapper label={props.label} error={props.errorMessage}>
      <Controller
        name={props.name}
        control={props.control}
        render={({ field }) => (
          <Switch
            value={field.value}
            onChange={field.onChange}
            disabled={field.disabled}
            size="default"
            defaultValue={field.value}
          />
        )}
      />
    </InputWrapper>
  )
}

export default InputSwitch
