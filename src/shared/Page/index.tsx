import React, { ReactNode } from "react";
import "./index.scss";

interface Props {
  children: ReactNode;
  className?: string;
}

const Page = ({ className = "", ...props }: Props) => {
  return (
    <div {...props} className={`Page ${className}`}>
      {props.children}
    </div>
  );
};

export default Page;
