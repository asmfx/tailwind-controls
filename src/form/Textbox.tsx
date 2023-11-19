import React, { useState } from "react";
import { ITextboxProps } from "../types/form";
import { FormControlContainer } from "./FormControlContainer";
import { $class, getControlErrors, getControlValue } from "../helpers";
import { makeCUID } from "@asmfx/ui-kit";

export const Textbox: React.FC<ITextboxProps> = (props) => {
  const {
    name,
    inputRef,
    type = "text",
    controller,
    onChange,
    placeholder,
  } = props;

  const [refId] = useState(makeCUID());
  const value: string = getControlValue(props);
  const errors = getControlErrors(props);
  const isInvalid = errors.length ? " is-invalid" : "";
  const changeHandler =
    controller && name
      ? (event: React.ChangeEvent<HTMLInputElement>) =>
          controller.changeHandler({ name, value: event.target.value })
      : (event: React.ChangeEvent<HTMLInputElement>) =>
          onChange?.({ name, value: event.target.value });

  return (
    <>
      <FormControlContainer
        controlKey="textbox"
        {...{ ...props, errors, refId, isInvalid }}
      >
        <input
          ref={inputRef}
          type={type}
          id={refId}
          className={$class([
            `form-control-input`,
            {
              isInvalid,
            },
          ])}
          placeholder={placeholder}
          value={value}
          onChange={changeHandler}
        />
      </FormControlContainer>
    </>
  );
};
