import React, { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
  errorMessage: string;
};
const InputWrapper = ({ title, children, errorMessage="" }: Props) => {
  return (
    <div className="flex flex-col w-full mb-4">
      <label className="text-lg">{title}</label>
      {children}
      {errorMessage && <p className="text-error-primary">{errorMessage}</p>}
    </div>
  );
};

export default InputWrapper;
