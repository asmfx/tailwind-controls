import React, { useState } from "react";
import { ITextboxProps } from "../types/form";
import { FormControlContainer } from "./FormControlContainer";
import { getControlErrors, getControlValue } from "./helpers";
import { makeCUID } from "@asmfx/ui-kit";

export const Textbox: React.FC<ITextboxProps> = (props) => {
  const { name, type = "text", controller, placeholder } = props;

  const [refId] = useState(makeCUID());
  const value: string = getControlValue(props);
  const errors = getControlErrors(props);
  const isInvalid = errors.length ? " is-invalid" : "";
  const onChange =
    controller && name
      ? (event: React.ChangeEvent<HTMLInputElement>) =>
          controller.changeHandler({ name, value: event.target.value })
      : undefined;

  return (
    <>
      <FormControlContainer
        controlKey="textbox"
        {...{ ...props, errors, refId, isInvalid }}
      >
        <input
          type={type}
          id={refId}
          className={`form-control-input ${isInvalid}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </FormControlContainer>
    </>
  );
};
