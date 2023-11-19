import React from "react";
import { ILabelProps } from "../types/form";
import { FormControlContainer } from "./FormControlContainer";
import { $class, getControlErrors, getControlValue } from "../helpers";

export const Label: React.FC<ILabelProps> = (props) => {
  const { name, placeholder } = props;

  const value: string = getControlValue(props);
  const errors = getControlErrors(props);
  const isInvalid = errors.length ? " is-invalid" : "";

  return (
    <>
      <FormControlContainer
        controlKey="label"
        {...{ ...props, errors, isInvalid }}
      >
        <span
          id={name}
          className={$class([
            `form-control-input`,
            {
              isInvalid,
            },
          ])}
          placeholder={placeholder}
        >
          {value}
        </span>
      </FormControlContainer>
    </>
  );
};
