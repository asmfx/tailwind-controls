import React, { useState } from "react";
import { CheckboxListProps, InputOption } from "../types";
import { makeCUID } from "@asmfx/ui-kit";
import { $class, getControlErrors, getControlValue } from "helpers";
import { FormControlContainer } from "./FormControlContainer";

export const RadiobuttonList: React.FC<CheckboxListProps> = (props) => {
  const {
    name,
    label,
    direction = "row",
    col,
    options,
    onChange,
    readOnly,
    controller,
    disabled,
    ...rest
  } = props;

  const [refId] = useState(makeCUID());
  const value: any = getControlValue(props) || [];
  const errors = getControlErrors(props);
  const isInvalid = errors.length ? " is-invalid" : "";

  const changeHandler =
    controller && name
      ? (value: any) => controller.changeHandler({ name, value })
      : (value: any) => onChange?.({ name, value });

  const isChecked = (id: any) => {
    return value == id;
  };

  const radioButtonHandler = (id: any) => (e) => {
    if (e.target.checked) {
      changeHandler(id);
    }
  };

  const _options = options.map((o: string | InputOption) =>
    typeof o === "string"
      ? { id: o, label: o }
      : { id: o.id, label: o.label || o.name || o.text }
  );

  return (
    <FormControlContainer
      controlKey="radiobutton-list"
      {...{ ...props, errors, refId, isInvalid }}
    >
      <div
        className={$class({
          "form-control-radiobutton-list-input-list": true,
          "direction-flex-col": direction === "col" && col === undefined,
          "direction-flex-row": direction === "row" && col === undefined,
          "direction-grid-col": !!col,
          [`grid-cols-${col}`]: !!col,
        })}
      >
        {_options.map((item: InputOption) => (
          <div key={item.id} className="form-control-radiobutton-option">
            <input
              id={`${refId}-option-${item.id}`}
              className={$class([
                `form-control-input`,
                `form-control-input-radio-button`,
                {
                  isInvalid,
                  checked: isChecked(item.id),
                },
              ])}
              checked={isChecked(item.id)}
              type="radio"
              readOnly={readOnly}
              onChange={radioButtonHandler(item.id)}
              disabled={disabled}
            />
            <label
              className="form-control-text"
              htmlFor={`${refId}-option-${item.id}`}
            >
              {item.label}
            </label>
          </div>
        ))}
      </div>
    </FormControlContainer>
  );
};
