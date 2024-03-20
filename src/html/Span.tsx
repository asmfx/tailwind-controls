import React from "react";
import { IHTMLControlsProp } from "../types/form";
import { getControlValue } from "../helpers";

export const Span: React.FC<IHTMLControlsProp> = (props) => {
  const { editable, className } = props;

  const value: string = getControlValue(props);

  return (
    <span className={className} contentEditable={editable}>
      {value}
    </span>
  );
};
