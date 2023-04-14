import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import { v4 as uuid } from "uuid";
import { hexTransparencies } from "./hexTransparencies";
import {
  ColorStopConfig,
  defaultGradient,
  GradientLayer,
  GradientStyle,
  GradientType,
  MeasurmentUnit,
} from "./models";

interface BGSize {
  bgWidth: string;
  bgHeight: string;
  bgSizeUnit: string;
}

interface GradientContextValue {
  style: GradientStyle;
  bgSize: BGSize;
  handleBGSizeChange: (name: string, value: string) => void;
  gradientLayers: GradientLayer[];
  handleBGColorChange: (color: string) => void;
  addGradientLayer: () => void;
  removeGradientLayer: (id: string) => void;
  handleGradientLayerTypeChange: (layerId: string, type: GradientType) => void;
  handleGradientLayerAngleChange: (layerId: string, angle: number) => void;
  addColorStop: (layerId: string) => void;
  deleteColorStop: (layerId: string, colorStopId: string) => void;
  handleColorStopChange: (
    layerId: string,
    colorStopId: string,
    updatedColorStop: ColorStopConfig
  ) => void;
}

const defaultContextValue: GradientContextValue = {
  style: {
    backgroundColor: "#ffffff",
    backgroundImage: "initial",
    backgroundSize: "initial",
  },
  bgSize: {
    bgWidth: "",
    bgHeight: "",
    bgSizeUnit: MeasurmentUnit["%"],
  },
  handleBGSizeChange: () => null,
  gradientLayers: [],
  handleBGColorChange: () => null,
  addGradientLayer: () => null,
  removeGradientLayer: () => null,
  handleGradientLayerTypeChange: () => null,
  handleGradientLayerAngleChange: () => null,
  addColorStop: () => null,
  deleteColorStop: () => null,
  handleColorStopChange: () => null,
};

const GradientContext =
  createContext<GradientContextValue>(defaultContextValue);

interface Props {
  children: React.ReactElement;
}

const GradientContextProvider = ({ children }: Props) => {
  const [style, setStyle] = useState<GradientStyle>(defaultContextValue.style);

  const handleBGColorChange = (color: string) => {
    setStyle((prev) => ({ ...prev, backgroundColor: color }));
  };

  const [bgSize, setBgSize] = useState<BGSize>(defaultContextValue.bgSize);

  const handleBGSizeChange = (name: string, value: string) => {
    setBgSize((prev) => ({ ...prev, [name]: value }));
  };

  /* Layer */
  const [gradientLayers, setGradientLayers] = useState<GradientLayer[]>([]);

  const addGradientLayer = () => {
    setGradientLayers((prev) => [{ ...defaultGradient, id: uuid() }, ...prev]);
  };

  const removeGradientLayer = (id: string) => {
    let filteredLayers = gradientLayers.filter((item) => item.id !== id);
    setGradientLayers(filteredLayers);
  };

  const handleGradientLayerTypeChange = (
    layerId: string,
    type: GradientType
  ) => {
    let updatedLayers = gradientLayers.map((item) =>
      item.id === layerId
        ? {
            ...item,
            type: type,
          }
        : item
    );
    setGradientLayers(updatedLayers);
  };

  const handleGradientLayerAngleChange = (layerId: string, angle: number) => {
    let updatedLayers = gradientLayers.map((item) =>
      item.id === layerId && item.type === GradientType.linear
        ? {
            ...item,
            angle: angle,
          }
        : item
    );
    setGradientLayers(updatedLayers);
  };

  /* Color stop */

  const addColorStop = (layerId: string) => {
    let updatedLayers = gradientLayers.map((item) =>
      item.id === layerId
        ? {
            ...item,
            colorStops: [...item.colorStops, { color: "#ffffff", id: uuid() }],
          }
        : item
    );

    setGradientLayers(updatedLayers);
  };

  const deleteColorStop = (layerId: string, colorStopId: string) => {
    let updatedLayers = gradientLayers.map((item) =>
      item.id === layerId
        ? {
            ...item,
            colorStops: item.colorStops.filter(
              (item) => item.id !== colorStopId
            ),
          }
        : item
    );
    setGradientLayers(updatedLayers);
  };

  const handleColorStopChange = (
    layerId: string,
    colorStopId: string,
    updatedColorStop: ColorStopConfig
  ) => {
    let updatedLayers = gradientLayers.map((item) =>
      item.id === layerId
        ? {
            ...item,
            colorStops: item.colorStops.map((colorStop) =>
              colorStop.id === colorStopId ? updatedColorStop : colorStop
            ),
          }
        : item
    );
    setGradientLayers(updatedLayers);
  };

  /* Convert everything to CSS style */

  const generateSingleColorStopCSSRule = (colorStop: ColorStopConfig) => {
    let rule = colorStop.color;
    if (colorStop.opacity) {
      rule += hexTransparencies[colorStop.opacity];
    }

    if (colorStop.lengthPercentageStart) {
      rule += ` ${colorStop.lengthPercentageStart}%`;
    }

    if (colorStop.lengthPercentageStart && colorStop.lengthPercentageStop) {
      rule += ` ${colorStop.lengthPercentageStop}%`;
    }
    return rule;
  };

  const generateColorStopsCSSRule = useCallback(
    (colorStops: ColorStopConfig[]) => {
      let colorStopRule = colorStops
        .reduce((rule: string, colorStop: ColorStopConfig) => {
          return rule + generateSingleColorStopCSSRule(colorStop) + ",";
        }, "")
        .slice(0, -1);

      return colorStopRule;
    },
    []
  );

  const convertGradientLayersToCSSGradientValue = useCallback(
    (layers: GradientLayer[]) => {
      let cssrule = layers
        .reduce((rule: string, layer: GradientLayer) => {
          let layerRule = rule;

          /* Add type */
          layerRule += `${layer.type}-gradient(`;

          /* Add angle for linear gradient */
          if (layer.type === GradientType.linear && layer.angle) {
            layerRule += `${layer.angle}deg,`;
          }

          /* Add color stops */
          layerRule += generateColorStopsCSSRule(layer.colorStops);

          /* Close the css gradient function parentesis */
          layerRule += "),";

          return layerRule;
        }, "")
        .slice(0, -1); //remove last extra comma;

      setStyle((prev) => ({ ...prev, backgroundImage: cssrule }));
    },
    [generateColorStopsCSSRule]
  );

  useEffect(() => {
    convertGradientLayersToCSSGradientValue(gradientLayers);
  }, [gradientLayers, convertGradientLayersToCSSGradientValue]);

  useEffect(() => {
    let width = bgSize.bgWidth
      ? `${bgSize.bgWidth}${bgSize.bgSizeUnit}`
      : "100%";
    let height = bgSize.bgHeight
      ? `${bgSize.bgHeight}${bgSize.bgSizeUnit}`
      : "100%";

    setStyle((prev) => ({
      ...prev,
      backgroundSize: `${width} ${height}`,
    }));
  }, [bgSize]);

  const value = {
    style,
    handleBGColorChange,
    bgSize,
    handleBGSizeChange,
    /* Single layer */
    gradientLayers,
    addGradientLayer,
    removeGradientLayer,
    handleGradientLayerTypeChange,
    handleGradientLayerAngleChange,
    /* Single color stop */
    addColorStop,
    deleteColorStop,
    handleColorStopChange,
  };

  return (
    <GradientContext.Provider value={value}>
      {children}
    </GradientContext.Provider>
  );
};

const useGradientContext = () => {
  return useContext(GradientContext);
};

export { GradientContextProvider, useGradientContext };
