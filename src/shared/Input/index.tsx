import React, { ReactElement } from "react";
import "./index.scss";
import FormField from "../FormField";

interface Props extends React.ComponentPropsWithoutRef<"input"> {
  label?: string | ReactElement;
}

const Input = (props: Props) => {
  return (
    <FormField label={props.label} name={props.name}>
      <input {...props} className={`Input ${props.className ?? ""}`} />
    </FormField>
  );
};

export default Input;
