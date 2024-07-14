import React from "react";

interface InputProps
  extends Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "value" | "onChange"
  > {
  name: string;
  placeholder: string;
  error?: string;
}

const Input = ({ name, placeholder, error = "", ...args }: InputProps) => {
  return (
    <>
      <input
        placeholder={placeholder}
        name={name}
        className="auth-submit-inputs"
        id={name}
        {...args}
      />
      {error && <div className="alert">{error}</div>}
    </>
  );
};

export default Input;
