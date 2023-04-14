import React from "react";
import Button from "../../shared/Button";
import Input from "../../shared/Input";
import Select from "../../shared/Select";
import { ColorStop } from "./ColorStop";
import { GradientLayer, GradientType, gradientTypeOptions } from "./models";
import { useGradientContext } from "./useGradientContext";
import FormField from "../../shared/FormField";

interface GraidentItemProps {
  layer: GradientLayer;
}
export const GradientItem = ({ layer }: GraidentItemProps) => {
  const {
    removeGradientLayer,
    handleGradientLayerTypeChange,
    handleGradientLayerAngleChange,
    addColorStop,
    deleteColorStop,
    handleColorStopChange,
  } = useGradientContext();

  return (
    <div className="GradientItem">
      <div className="GradientItem__row">
        <Select
          label={"Type"}
          defaultValue={layer.type}
          options={gradientTypeOptions}
          onChange={(e) =>
            handleGradientLayerTypeChange(
              layer.id,
              e.target.value as GradientType
            )
          }
        />
        {layer.type === GradientType.linear && (
          <Input
            label={"Angle"}
            name="angle"
            type="number"
            placeholder="0deg to 360deg"
            onChange={(e) =>
              handleGradientLayerAngleChange(layer.id, parseInt(e.target.value))
            }
          />
        )}
        <FormField className="GradientItem__delete">
          <Button onClick={() => removeGradientLayer(layer.id)}>X</Button>
        </FormField>
      </div>
      {layer.colorStops.map((colorStop) => (
        <ColorStop
          key={colorStop.id}
          config={colorStop}
          isDeletable={layer.colorStops.length <= 2}
          onDelete={() => deleteColorStop(layer.id, colorStop.id)}
          onChange={(e) => {
            handleColorStopChange(layer.id, colorStop.id, e);
          }}
        />
      ))}

      <Button onClick={() => addColorStop(layer.id)}>Add color stop +</Button>
    </div>
  );
};
