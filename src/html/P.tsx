import React from "react";
import { IHTMLControlsProp } from "../types/form";
import { getControlValue } from "../helpers";

export const P: React.FC<IHTMLControlsProp> = (props) => {
  const { editable, className } = props;

  const value: string = getControlValue(props);

  return (
    <p className={className} contentEditable={editable}>
      {value}
    </p>
  );
};
