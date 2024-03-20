import React from "react";
import { IHTMLControlsProp } from "../types/form";
import { getControlValue } from "../helpers";

export const H1: React.FC<IHTMLControlsProp> = (props) => {
  const { editable, className } = props;

  const value: string = getControlValue(props);

  return (
    <h1 className={className} contentEditable={editable}>
      {value}
    </h1>
  );
};
