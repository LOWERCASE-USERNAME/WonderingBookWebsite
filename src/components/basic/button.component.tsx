import { CommonComponentProps } from "../../lib/props";

interface ButtonProps extends CommonComponentProps {
}

export function Button({ children, className }: ButtonProps) {
  return (
    <>
      {children}
    </>
  );
}
