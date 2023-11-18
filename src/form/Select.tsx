import React, { useState } from "react";
import { ISelectProps, InputOption } from "../types/form";
import { FormControlContainer } from "./FormControlContainer";
import { getControlErrors, getControlValue } from "./helpers";
import { makeCUID } from "@asmfx/ui-kit";

const getChildItems = (tree: any[], parentKey, id, label, seperator) => {
  let options: InputOption[] = [];
  let childItems = tree.filter((o) => o[parentKey] === id);
  for (const child of childItems) {
    const item = {
      id: child.id,
      label: `${label}${seperator}${child.label || child.name || child.text}`,
    };
    options.push(
      item,
      ...getChildItems(tree, parentKey, item.id, item.label, seperator)
    );
  }
  return options;
};
const getTreeOptions = (tree: any[], parentKey, seperator) => {
  let options: InputOption[] = [];
  let childItems = tree.filter((o) => !o[parentKey]);
  for (const child of childItems) {
    const item = {
      id: child.id,
      label: child.label || child.name || child.text,
    };
    options.push(
      item,
      ...getChildItems(tree, parentKey, item.id, item.label, seperator)
    );
  }
  return options;
};

const getOptions = (props: ISelectProps) => {
  return props.parentKey
    ? getTreeOptions(props.options, props.parentKey, props.seperator || " / ")
    : props.options;
};

export const Select: React.FC<ISelectProps> = (props) => {
  const { name, noDefault, controller, placeholder } = props;
  const [refId] = useState(makeCUID());
  const value: string = getControlValue(props);
  const errors = getControlErrors(props);
  const isInvalid = errors.length ? " is-invalid" : "";
  const onChange =
    controller && name
      ? (event: React.ChangeEvent<HTMLSelectElement>) =>
          controller.changeHandler({ name, value: event.target.value })
      : undefined;

  const options = getOptions(props);

  return (
    <>
      <FormControlContainer
        controlKey="select"
        {...{ ...props, errors, refId, isInvalid }}
      >
        <select
          id={refId}
          className={`form-control-input ${isInvalid}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        >
          {!noDefault && (
            <option key="-SELECT-" value="">
              {placeholder || "-Select-"}
            </option>
          )}
          {options &&
            options.map((item: string | InputOption, idx: number) => {
              if (typeof item === "string") {
                return (
                  <option key={item} value={item} selected={value == item}>
                    {item}
                  </option>
                );
              }
              const selected = value == item.id;
              return (
                <option key={item.id} value={item.id} selected={selected}>
                  {item.label || item.name || item.text}
                </option>
              );
            })}
        </select>
      </FormControlContainer>
    </>
  );
};
