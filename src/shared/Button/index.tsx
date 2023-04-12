import React, { ReactNode } from "react";
import "./index.scss";

interface Props {
  children?: ReactNode;
  className?: string;
  onClick: () => void;
}

const Button = (props: Props) => {
  let className = "" || props.className;
  
  return (
    <button {...props} className={`Button ${className}`}>
      {props.children}
    </button>
  );
};

export default Button;
