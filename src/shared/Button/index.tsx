import React from "react";
import "./index.scss";

interface Props extends React.ComponentPropsWithoutRef<"button"> {}

const Button = (props: Props) => {
  let className = "" || props.className;

  return (
    <button {...props} className={`Button ${className}`}>
      {props.children}
    </button>
  );
};

export default Button;
