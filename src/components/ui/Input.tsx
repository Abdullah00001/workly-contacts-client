import { FC } from "react";

interface IInputField {
  id: string;
  type: string;
  name: string;
  placeholder: string;
  className: string;
  required: Boolean;
}

const Input: FC = ({
  id,
  type,
  name,
  placeholder,
  className,
  required = false,
}: IInputField) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      className={className}
      required={required}
    />
  );
};

export default Input;
