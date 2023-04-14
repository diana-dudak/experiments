import React, { ReactElement } from "react";
import "./index.scss";

interface Props {
  label?: string | ReactElement;
  name?: string;
  className?: string;
  children: React.ReactNode;
}

const FormField = (props: Props) => {
  return (
    <div className={`FormField ${props.className ?? ""}`}>
      {props.label && (
        <label className="FormField__label" htmlFor={props.name}>
          {props.label}
        </label>
      )}
      <div className="FormField__field">{props.children}</div>
    </div>
  );
};

export default FormField;
