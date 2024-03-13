import { ReactNode } from "react";

type InputWrapperP = {
  children: ReactNode;
  label: string;
  error?: string;
};
const InputWrapper = ({ children, label, error }: InputWrapperP) => {
  return (
    <div>
      <h4 className="my-2">{label}</h4>
      {children}
      {error && <p className="text-error my-2">{error}</p>}
    </div>
  );
};

export default InputWrapper;
