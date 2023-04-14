import { SelectOption } from "../../shared/Select";

interface GradientStyle {
  backgroundColor: string;
  backgroundImage: string;
  backgroundSize: string;
}

interface ColorStopConfig {
  color: string;
  lengthPercentageStart?: number;
  lengthPercentageStop?: number;
  opacity?: number;
  id: string;
}

enum GradientType {
  linear = "linear",
  radial = "radial",
  conic = "conic",
  repeatingLinear = "repeating-linear",
  repeatingRadial = "repeating-radial",
  repeatingConic = "repeating-conic",
}

const gradientTypeOptions: SelectOption[] = [
  { label: "Linear", value: GradientType.linear },
  { label: "Radial", value: GradientType.radial },
  { label: "Conic", value: GradientType.conic },
  // { label: "Repeating linear", value: GradientType.repeatingLinear },
  // { label: "Repeating radial", value: GradientType.repeatingRadial },
  // { label: "Repeating conic", value: GradientType.repeatingConic },
];

interface GradientLayer {
  id: string;
  type: GradientType;
  angle?: number;
  colorStops: ColorStopConfig[];
}

const defaultGradient: GradientLayer = {
  type: GradientType.linear,
  id: "gradientLayer0",
  colorStops: [
    { color: "#ffffff", id: "colorStop0" },
    { color: "#ffa3d0", id: "colorStop1" },
  ],
};

enum MeasurmentUnit {
  "%" = "%",
  "px" = "px",
  "rem" = "rem",
  "em" = "em",
  "vh" = "vh",
  "vw" = "vw",
}

const measurmentUnitOptions = [
  { value: MeasurmentUnit["%"] },
  { value: MeasurmentUnit.px },
  { value: MeasurmentUnit.rem },
  { value: MeasurmentUnit.em },
  { value: MeasurmentUnit.vw },
  { value: MeasurmentUnit.vh },
];

export {
  type ColorStopConfig,
  type GradientLayer,
  type GradientStyle,
  GradientType,
  gradientTypeOptions,
  defaultGradient,
  MeasurmentUnit,
  measurmentUnitOptions,
};
