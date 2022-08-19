export const maxColsAmount = { lg: 8, md: 6, sm: 4, xs: 2, xxs: 1 };

export const BREAKPOINTS = {
  xxs: 0,
  xs: 480,
  sm: 768,
  md: 996,
  lg: 1200,
};
export type KeysOfBreakpoints = keyof typeof BREAKPOINTS;

export const DEFAULT_ITEM_WIDTH = 1;
export const DEFAULT_ITEM_HEIGHT = 1;

export interface Item {
  id: string;
  width?: number;
  height?: number;
}

export interface Coordinates {
  x: number;
  y: number;
}
