import React, { useEffect, useRef, useState } from "react";
import { Checkbox } from "./Checkbox";
import { CheckboxListProps, InputOption } from "../types";
import { makeCUID } from "@asmfx/ui-kit";
import { $class, getControlErrors, getControlValue } from "helpers";
import { FormControlContainer } from "./FormControlContainer";

export const CheckboxList: React.FC<CheckboxListProps> = (props) => {
  const {
    name,
    label,
    direction = "row",
    col,
    options,
    onChange,
    readOnly,
    controller,
    ...rest
  } = props;

  const [refId] = useState(makeCUID());
  const value: string[] = getControlValue(props) || [];
  const errors = getControlErrors(props);
  const isInvalid = errors.length ? " is-invalid" : "";

  const changeHandler =
    controller && name
      ? (nvalue: string[]) => controller.changeHandler({ name, value: nvalue })
      : (nvalue: string[]) => onChange?.({ name, value: nvalue });

  const add = (v: any) => {
    if (value.indexOf(v) < 0) {
      const nValue = [...value, v];
      changeHandler(nValue);
    }
  };

  const remove = (v: any) => {
    const nValue = value.filter((item) => item !== v);
    changeHandler(nValue);
  };

  const isChecked = (id: any) => {
    return value.indexOf(id) >= 0;
  };

  const checkboxHandler =
    (id: any) =>
    ({ value: state }) => {
      if (state) {
        add(id);
      } else {
        remove(id);
      }
    };

  const _options = options.map((o: string | InputOption) =>
    typeof o === "string"
      ? { id: o, label: o }
      : { id: o.id, label: o.label || o.name || o.text }
  );

  return (
    <FormControlContainer
      controlKey="checkbox-list"
      {...{ ...props, errors, refId, isInvalid }}
    >
      <div
        className={$class({
          "form-control-checkbox-list-input-list": true,
          "direction-flex-col": direction === "col" && col === undefined,
          "direction-flex-row": direction === "row" && col === undefined,
          "direction-grid-col": !!col,
          [`grid-cols-${col}`]: !!col,
        })}
      >
        {_options.map((item: InputOption) => (
          <Checkbox
            layout="raw"
            key={`checkbox-${name}-${item.id}`}
            name={`checkbox-${name}-${item.id}`}
            value={isChecked(item.id)}
            onChange={checkboxHandler(item.id)}
            readOnly={readOnly}
            text={item.label}
          />
        ))}
      </div>
    </FormControlContainer>
  );
};
