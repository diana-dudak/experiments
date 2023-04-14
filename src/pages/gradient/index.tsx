import React from "react";
import Button from "../../shared/Button";
import Input from "../../shared/Input";
import Page from "../../shared/Page";
import { GradientItem } from "./GradientItem";
import "./index.scss";
import {
  GradientContextProvider,
  useGradientContext,
} from "./useGradientContext";
import Select from "../../shared/Select";
import FormField from "../../shared/FormField";
import { MeasurmentUnit } from "./models";

const GradientInner = () => {
  const {
    style,
    handleBGColorChange,
    gradientLayers,
    addGradientLayer,
    handleBGSizeChange,
  } = useGradientContext();

  return (
    <Page className="Gradient">
      <div className="Gradient__preview" style={style}></div>
      <div className="Gradient__controls">
        <Input
          label={"Background color"}
          type="color"
          name="bgc"
          value={style.backgroundColor}
          onChange={(e) => handleBGColorChange(e.target.value)}
        />
        <div>Background size</div>
        <div className="Gradient__row">
          <Input
            label={"Width"}
            name="bgWidth"
            onChange={(e) => handleBGSizeChange(e.target.name, e.target.value)}
            placeholder="100%"
          />
          <Input
            label={"Height"}
            name="bgHeight"
            onChange={(e) => handleBGSizeChange(e.target.name, e.target.value)}
            placeholder="100%"
          />
          <Select
            name="bgSizeUnit"
            options={[
              { value: MeasurmentUnit["%"] },
              { value: MeasurmentUnit.px },
              { value: MeasurmentUnit.rem },
            ]}
            onChange={(e) => handleBGSizeChange(e.target.name, e.target.value)}
          />
        </div>
        <Button onClick={addGradientLayer}>Add gradient layer +</Button>
        {gradientLayers.map((layer) => (
          <GradientItem key={layer.id} layer={layer} />
        ))}
      </div>
    </Page>
  );
};

const Gradient = () => {
  return (
    <GradientContextProvider>
      <GradientInner />
    </GradientContextProvider>
  );
};

export default Gradient;
