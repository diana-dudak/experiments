import React, { useEffect, useState } from "react";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Responsive, WidthProvider, Layouts, Layout } from "react-grid-layout";
import { v4 as uuid } from "uuid";

import GridItem from "./GridItem";
import useWindowSize from "../../utils/useWindowSize";
import {
  Item,
  KeysOfBreakpoints,
  BREAKPOINTS,
  maxColsAmount,
  DEFAULT_ITEM_WIDTH,
  DEFAULT_ITEM_HEIGHT,
  Coordinates,
} from "./model";

const ResponsiveGridLayout = WidthProvider(Responsive);
const initialItems: Item[] = [
  { id: "1" },
  { id: "2" },
  { id: "3", width: 2, height: 3 },
  { id: "4" },
  { id: "5" },
  { id: "6" },
];

const InventoryGrid = () => {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [layouts, setLayouts] = useState<Layouts>({});

  /* Get current breakpoint */
  const [breakpoint, setBreakpoint] = useState<KeysOfBreakpoints>("xxs");
  const width: number | undefined = useWindowSize().width;
  const [emptyRow, setEmptyRow] = useState<boolean[]>([]);

  useEffect(() => {
    (Object.keys(BREAKPOINTS) as KeysOfBreakpoints[]).forEach((key) => {
      if (width && width >= BREAKPOINTS[key]) {
        setBreakpoint(key);
      }
    });
  }, [width]);

  useEffect(() => {
    setEmptyRow(new Array(maxColsAmount[breakpoint]).fill(false));
  }, [breakpoint]);

  /* TODO Calculate initial position */
  const findEmptyPosition = (
    matrix: boolean[][],
    exclude: Coordinates[] = []
  ) => {
    matrix.forEach((row, y) => {
      row.forEach((item, x) => {
        if (!item) {
          console.log({ x, y });
          return { x, y };
        }
      });
    });
  };

  const calculateInitialPosition = () => {
    let matrix: boolean[][] = [emptyRow];

    console.log("init", matrix);
    findEmptyPosition(matrix, [{ x: 0, y: 0 }]);

    items.forEach((item) => {
      let itemWidth = item.width ?? DEFAULT_ITEM_WIDTH;
      let itemHeight = item.height ?? DEFAULT_ITEM_HEIGHT;

      console.log("item ", item.id, itemWidth, itemHeight);
    });

    let calculatedLayout: Layout[] = [];
    return calculatedLayout;
  };

  useEffect(() => {
    calculateInitialPosition();
  }, []);

  /* TODO Calculate position on items change */

  /* Handlers */
  let onLayoutChange = (_currentLayout: Layout[], allLayouts: Layouts) => {
    setLayouts(allLayouts);
  };

  let onAddItem = () => {
    setItems((p) => [...p, { id: uuid() }]);
  };
  let onRemoveItem = (id: string) => {
    setItems((p) => p.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h1>InventoryGrid</h1>
      <div>
        <button
          onClick={onAddItem}
          style={{ padding: "0.5rem 1rem", fontSize: 24 }}
        >
          Add item
        </button>
      </div>
      <div>
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          breakpoints={BREAKPOINTS}
          cols={maxColsAmount}
          compactType={null}
          onLayoutChange={onLayoutChange}
          preventCollision
        >
          {items.map((item) => (
            <div key={item.id}>
              <GridItem onDelete={onRemoveItem}>{item.id}</GridItem>
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>
    </div>
  );
};

export default InventoryGrid;
