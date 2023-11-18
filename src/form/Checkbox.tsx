import React, { useState } from "react";
import { getControlErrors, getControlValue } from "./helpers";
import { ICheckboxProps } from "../types/form";
import { FormControlContainer } from "./FormControlContainer";
import { makeCUID } from "@asmfx/ui-kit";

export const Checkbox: React.FC<ICheckboxProps> = (props) => {
  const { name, controller, text, disabled, readOnly, placeholder } = props;

  const [refId] = useState(makeCUID());
  const value: boolean = getControlValue(props);
  const errors = getControlErrors(props);
  const isInvalid = errors.length ? " is-invalid" : "";
  const changeHandler =
    controller && name
      ? (event: React.ChangeEvent<HTMLInputElement>) =>
          controller.changeHandler({ name, value: event.target.checked })
      : undefined;

  return (
    <>
      <FormControlContainer
        controlKey="checkbox"
        {...{ ...props, errors, refId, isInvalid }}
      >
        <input
          className={`form-control-input ${isInvalid}`}
          type="checkbox"
          id={refId}
          readOnly={readOnly}
          placeholder={placeholder}
          onChange={changeHandler}
          checked={!!value}
          disabled={disabled}
        />
        <label className="form-control-text" htmlFor={refId}>
          {text}
        </label>
      </FormControlContainer>
    </>
  );
};
