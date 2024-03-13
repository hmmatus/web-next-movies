import InputWrapper from "@/components/wrappers/inputWrapper/InputWrapper";
import { Input, InputProps } from "antd";
import { Control, Controller, FieldPath, FieldValues, Path } from "react-hook-form";

interface InputPasswordI<T extends FieldValues> extends InputProps {
  label: string;
  errorMessage: string;
  control: Control<T>;
  name: Path<T>;
}
const InputPassword =  <T extends FieldValues>(props: InputPasswordI<T>) => {
  return (
    <InputWrapper label={props.label} error={props.errorMessage}>
      <Controller
        name={props.name}
        control={props.control}
        render={({ field, fieldState }) => (
          <Input.Password
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
  );
};

export default InputPassword;
