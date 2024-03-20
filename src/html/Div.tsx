import React from "react";
import { IHTMLControlsProp } from "../types/form";
import { getControlValue } from "../helpers";

export const Div: React.FC<IHTMLControlsProp> = (props) => {
  const { editable, className } = props;

  const value: string = getControlValue(props);

  return (
    <div className={className} contentEditable={editable}>
      {value}
    </div>
  );
};
