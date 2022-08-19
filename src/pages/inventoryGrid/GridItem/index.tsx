import React from "react";
import "./index.scss";

interface Props {
  children: React.ReactNode;
  onDelete: (id: string) => void;
}

const GridItem = ({ children, onDelete, ...props }: Props) => {
  return (
    <div className="InventoryGridItem" {...props}>
      <button
        onClick={() => {
          onDelete(children as string);
        }}
        className="InventoryGridItem__close"
      >
        ✖
      </button>
      {children}
    </div>
  );
};

export default GridItem;
