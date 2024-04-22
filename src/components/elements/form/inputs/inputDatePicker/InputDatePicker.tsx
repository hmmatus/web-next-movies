import InputWrapper from "@/components/wrappers/inputWrapper/InputWrapper"
import { DatePicker, type DatePickerProps } from "antd"
import type React from "react"
import { type ReactElement } from "react"
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form"

interface InputTextI<T extends FieldValues> extends DatePickerProps {
  label: string
  errorMessage: string
  control: Control<T>
  name: Path<T>
}
const InputDatePicker = <T extends FieldValues>(
  props: InputTextI<T>,
): ReactElement => {
  return (
    <InputWrapper label={props.label} error={props.errorMessage}>
      <Controller
        name={props.name}
        control={props.control}
        render={({ field, fieldState }) => (
          <DatePicker
            {...props}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            disabled={field.disabled}
            name={field.name}
            status={fieldState.invalid ? "error" : ""}
          />
        )}
      />
    </InputWrapper>
  )
}

export default InputDatePicker
