import React, { ReactElement } from "react";
import "./index.scss";
import FormField from "../FormField";

export interface SelectOption {
  label?: string;
  value: any;
}

interface Props extends React.ComponentPropsWithoutRef<"select"> {
  label?: string | ReactElement;
  options: SelectOption[];
}

const Select = (props: Props) => {
  return (
    <FormField label={props.label} name={props.name}>
      <select {...props} className={`Select ${props.className ?? ""}`}>
        {props.options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label ?? option.value}
          </option>
        ))}
      </select>
    </FormField>
  );
};

export default Select;
