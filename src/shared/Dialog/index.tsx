import React from "react";
import Button from "../Button";
import "./index.scss";

interface Props extends React.HTMLProps<HTMLDialogElement> {
  onClose: () => void;
}

const Dialog = ({ open = false, className = "", onClose, children }: Props) => {
  if (open) {
    return (
      <div className={`Dialog ${className}`}>
        <div className="Dialog__backdrop"></div>
        <dialog open={open} className="Dialog__container">
          <Button className="Dialog__close" onClick={onClose}>
            x
          </Button>
          {children}
        </dialog>
      </div>
    );
  }

  return <></>;
};

export default Dialog;
