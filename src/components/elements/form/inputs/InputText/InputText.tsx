import React, { ChangeEventHandler, InputHTMLAttributes, useState } from "react";
import InputWrapper from "../InputWrapper/InputWrapper";

type Props = {
  title: string;
  errorMessage?: string;
  type?: React.HTMLInputTypeAttribute;
  value: string | number;
  onChange(value: string): void;
  name: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
};
const InputText = ({
  title,
  errorMessage,
  type = "text",
  value,
  onChange,
  name,
  inputProps
}: Props) => {
  const onChangeValue = (e: React.FormEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value);
  };
  return (
    <InputWrapper title={title} errorMessage={errorMessage || ""}>
      <input
        {...inputProps}
        name={name}
        className={`w-100 h-8 pl-2 border focus:border-blue rounded-md border-${errorMessage ? "error" : "slate-950"} ${inputProps?.className}`}
        type={type}
        value={value}
        onChange={onChangeValue}
      />
    </InputWrapper>
  );
};

export default InputText;
