import React from "react"
import InputWrapper from "@/components/wrappers/inputWrapper/InputWrapper"
import { InputNumber, type InputNumberProps } from "antd"
import { type ReactElement } from "react"
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form"

interface CustomInputNumberI<T extends FieldValues> extends InputNumberProps {
  label: string
  errorMessage: string
  control: Control<T>
  name: Path<T>
}
const CustomInputNumber = <T extends FieldValues>(
  props: CustomInputNumberI<T>,
): ReactElement => {
  return (
    <InputWrapper label={props.label} error={props.errorMessage}>
      <Controller
        name={props.name}
        control={props.control}
        render={({ field, fieldState }) => (
          <InputNumber
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

export default CustomInputNumber
