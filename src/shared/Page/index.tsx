import React, { ReactNode } from "react";
import "./index.scss";

interface Props {
  children: ReactNode;
  className?: string;
  type?: "error" | "loading";
}

const Page = ({ className = "", type, ...props }: Props) => {
  if (type === "loading") {
    return (
      <div {...props} className={`Page Page--loading ${className}`}>
        Loading...
      </div>
    );
  }
  if (type === "error") {
    return (
      <div {...props} className={`Page Page--error ${className}`}>
        <h1>:c</h1>
        <code>{props.children}</code>
      </div>
    );
  }
  return (
    <div {...props} className={`Page ${className}`}>
      {props.children}
    </div>
  );
};

export default Page;
