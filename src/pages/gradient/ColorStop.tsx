import React, { useState, useEffect } from "react";
import Button from "../../shared/Button";
import Input from "../../shared/Input";
import { ColorStopConfig } from "./models";
import FormField from "../../shared/FormField";

interface ColorStopProps {
  config: ColorStopConfig;
  onDelete: () => void;
  isDeletable: boolean;
  onChange: (value: ColorStopConfig) => void;
}
export const ColorStop = ({
  config: propsConfig,
  onDelete,
  isDeletable,
  onChange,
}: ColorStopProps) => {
  const [config, setConfig] = useState<ColorStopConfig>(propsConfig);

  useEffect(() => {
    if (config !== propsConfig) {
      onChange(config);
    }
  }, [config, propsConfig, onChange]);

  const handleChange = (e: any) => {
    setConfig((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="ColorStop">
      <Input
        type="color"
        name={"color"}
        onChange={handleChange}
        value={config.color}
      />
      <Input
        label={"Start %"}
        name="lengthPercentageStart"
        onChange={handleChange}
        type="number"
        placeholder="0 to 100%"
      />
      <Input
        label={"Stop %"}
        name="lengthPercentageStop"
        onChange={handleChange}
        type="number"
        placeholder="0 to 100%"
      />
      <Input
        label={"Opacity %"}
        name="opacity"
        onChange={handleChange}
        type="number"
        placeholder="0 to 100%"
      />
      <FormField>
        <Button
          onClick={onDelete}
          title={isDeletable ? "Minimum 2 color stops" : undefined}
          disabled={isDeletable}
        >
          X
        </Button>
      </FormField>
    </div>
  );
};
