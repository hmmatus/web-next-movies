import InputWrapper from "../InputWrapper/InputWrapper";

type OptionsP = {
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
};
const InputSelect = ({
  title,
  errorMessage,
  value,
  onChange,
  name,
  options,
}: Props) => {
  const onChangeValue = (e: React.FormEvent<HTMLSelectElement>) => {
    onChange(e.currentTarget.value);
  };
  return (
    <InputWrapper title={title} errorMessage={errorMessage || ""}>
      <select
        className={`w-100 h-8 border focus:border-blue rounded-md border-${
          errorMessage ? "error" : "slate-950"
        }`}
        name="select"
        onChange={onChangeValue}
        defaultValue={value}
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
