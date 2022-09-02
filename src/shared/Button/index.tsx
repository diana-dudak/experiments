import React, { ReactNode } from "react";
import "./index.scss";

interface Props {
  children?: ReactNode;
  className?: string;
  onClick: () => void;
}

const Button = (props: Props) => {
  return (
    <button {...props} className={`Button ${props.className}`}>
      {props.children}
    </button>
  );
};

export default Button;
