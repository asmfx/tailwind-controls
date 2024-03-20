import React from "react";
import { IHTMLControlsProp } from "../types/form";
import { getControlValue } from "../helpers";

export const H3: React.FC<IHTMLControlsProp> = (props) => {
  const { editable, className } = props;

  const value: string = getControlValue(props);

  return (
    <h3 className={className} contentEditable={editable}>
      {value}
    </h3>
  );
};
