import React from "react";
import "./index.scss";

type Any = any;

interface Props extends Any {
  className?: string;
}

const Input = (props: Props) => {
  return <input {...props} className={`Input ${props.className}`} />;
};

export default Input;
