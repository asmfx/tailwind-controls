import React from "react";
import { IHTMLControlsProp } from "../types/form";
import { $class, getControlValue } from "../helpers";

export const Flex: React.FC<IHTMLControlsProp> = (props) => {
  const { editable, className } = props;

  const value: string = getControlValue(props);

  return (
    <div className={$class(["flex", className])} contentEditable={editable}>
      {value}
    </div>
  );
};
