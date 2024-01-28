import React, { useCallback, useState } from "react";
import {
  BasicChangeHandler,
  ChangeHandler,
  ITextboxProps,
} from "../types/form";
import { FormControlContainer } from "./FormControlContainer";
import { $class, getControlErrors, getControlValue } from "../helpers";
import { IDataController, makeCUID } from "@asmfx/ui-kit";

const useChangeHandler = (props: {
  name?: string;
  controller?: IDataController;
  onChange?: ChangeHandler;
  inputPattern?: string;
  formatter?: (value: any) => any;
}): BasicChangeHandler => {
  const { name, controller, inputPattern, onChange, formatter } = props;
  const rgx = inputPattern ? RegExp(inputPattern, "g") : undefined;
  const _changeHandler = useCallback(
    (value: any) => {
      console.log("_changeHandler", rgx, inputPattern, typeof value, value);
      if (rgx && typeof value === "string" && !rgx.test(value)) {
        console.log("short return");
        return;
      }
      console.log("continue");
      if (formatter) {
        value = formatter(value);
      }
      if (name && controller) {
        controller.changeHandler({ name, value });
      } else {
        onChange?.({ name, value });
      }
    },
    [name, controller, onChange, rgx]
  );
  return _changeHandler;
};

export const Textbox: React.FC<ITextboxProps> = (props) => {
  const {
    inputRef,
    type = "text",
    placeholder,
    maxLength,
    autoComplete,
  } = props;

  const [refId] = useState(makeCUID());
  const value: string = getControlValue(props);
  const errors = getControlErrors(props);
  const isInvalid = errors.length ? " is-invalid" : "";
  const changeHandler = useChangeHandler(props);

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
          value={value || ""}
          maxLength={maxLength}
          onChange={(e) => changeHandler(e.target.value)}
          autoComplete={autoComplete}
        />
      </FormControlContainer>
    </>
  );
};
