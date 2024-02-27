import { InputHTMLAttributes } from "react";
import InputWrapper from "../InputWrapper/InputWrapper";

export type OptionsP = {
  name: string;
  value: string;
};
type Props = {
  title: string;
  errorMessage?: string;
  value: string | number;
  onChange(value: string): void;
  name: string;
  options: Array<OptionsP>;
  selectStyleProps?: InputHTMLAttributes<HTMLSelectElement>;
};
const InputSelect = ({
  title,
  errorMessage,
  value,
  onChange,
  name,
  options,
  selectStyleProps
}: Props) => {
  const onChangeValue = (e: React.FormEvent<HTMLSelectElement>) => {
    onChange(e.currentTarget.value);
  };
  return (
    <InputWrapper title={title} errorMessage={errorMessage || ""}>
      <select
        className={`w-100 h-8 border focus:border-blue rounded-md focus:outline-none border-${
          errorMessage ? "error" : "slate-950"
        }`}
        name="select"
        onChange={onChangeValue}
        defaultValue={value}
        style={selectStyleProps}
      >
        {options.map((option) => (
          <option key={option.name} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </InputWrapper>
  );
};

export default InputSelect;
