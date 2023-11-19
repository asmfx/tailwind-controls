import React, { useEffect, useRef, useState } from "react";
import { ISelectProps, InputOption } from "../types/form";
import { FormControlContainer } from "./FormControlContainer";
import {
  $class,
  getControlErrors,
  getControlValue,
  stopPropagationHandler,
} from "../helpers";
import { makeCUID } from "@asmfx/ui-kit";
import { Popover } from "../layout/Popover";
import { DataAction, UniqueValue } from "../types/common";
import { Textbox } from "./Textbox";
import { IconArrowDown } from "icons/IconArrowDown";

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
  const _options = props.parentKey
    ? getTreeOptions(props.options, props.parentKey, props.seperator || " / ")
    : props.options;

  return _options?.map((i: any) =>
    typeof i === "string"
      ? { id: i, label: i }
      : {
          id: i.id,
          label: i.label || i.name || i.text,
        }
  );
};

const Select1: React.FC<any> = (props) => {
  const { refId, isInvalid, placeholder, value, onChange, noDefault, options } =
    props;
  return (
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
        options.map((item: InputOption) => (
          <option key={item.id} value={item.id} selected={value == item.id}>
            {item.label}
          </option>
        ))}
    </select>
  );
};

interface Select2OptionProps {
  value: UniqueValue;
  text?: string;
  selected?: boolean;
  onSelected?: DataAction;
}

const Select2Option: React.FC<Select2OptionProps> = ({
  value,
  text,
  selected,
  onSelected,
}) => {
  return (
    <div
      className={$class(["ax-select2-option", { selected }])}
      tabIndex={-1}
      id={`${value}`}
      onClick={() => onSelected?.(value)}
    >
      {text || `${value}`}
    </div>
  );
};

const Select2: React.FC<any> = (props) => {
  const { refId, filter, placeholder, value, onChange, noDefault, options } =
    props;

  const isFilterEnabled =
    filter !== undefined
      ? typeof filter === "boolean"
        ? filter
        : options.length > filter
      : options.length > 10;

  const [filterValue, setFilterValue] = useState("");
  const refFilter = useRef(null);
  const [optionList, setOptionList] = useState(options || []);

  const selected = options?.find((i: any) => i.id == value);

  const reset = () => {
    setFilterValue("");
    setOptionList(options || []);
  };

  const openingHandler = isFilterEnabled
    ? () => {
        setTimeout(() => refFilter?.current?.focus(), 100);
      }
    : undefined;

  const selectHandler = (value: any) => {
    reset();
    onChange?.({ target: { value } });
  };

  const filterChangedHandler = (filterData) => {
    setFilterValue(filterData.value);
    setOptionList(
      options?.filter((i) => RegExp(filterData.value, "i").test(i.label))
    );
  };

  useEffect(() => {
    reset();
  }, [options]);

  return (
    <>
      <Popover
        className="form-control-input ax-select2"
        onClosing={reset}
        onOpening={openingHandler}
        label={
          <div
            className="ax-select2-label"
            id={refId}
            aria-expanded="true"
            aria-haspopup="true"
          >
            <span>{selected?.label || placeholder || "-Select-"}</span>
            <IconArrowDown className="ax-select2-label-icon" />
          </div>
        }
      >
        <div className="ax-select2-menu-container">
          {isFilterEnabled && (
            <div className="ax-select2-filter" onClick={stopPropagationHandler}>
              <Textbox
                inputRef={refFilter}
                layout="raw"
                placeholder="Filter..."
                value={filterValue}
                onChange={filterChangedHandler}
              />
            </div>
          )}
          <div className="ax-select2-options-container">
            {!noDefault && !filterValue && (
              <Select2Option
                value={""}
                text={placeholder || "-Select-"}
                selected={!selected}
                onSelected={selectHandler}
              />
            )}

            {optionList?.map((item: InputOption) => (
              <Select2Option
                key={item.id}
                value={item.id}
                text={item.label}
                selected={value == item.id}
                onSelected={selectHandler}
              />
            ))}
            {!!filterValue && optionList?.length === 0 && (
              <div className="ax-select2-no-result">No result found...</div>
            )}
          </div>
        </div>
      </Popover>
    </>
  );
};

export const Select: React.FC<ISelectProps> = (props) => {
  const { name, type, noDefault, controller, filter, placeholder } = props;
  const [refId] = useState(makeCUID());
  const value: string = getControlValue(props);
  const errors = getControlErrors(props);
  const isInvalid = errors.length ? " is-invalid" : "";
  const onChange =
    controller && name
      ? (event: React.ChangeEvent<HTMLSelectElement>) =>
          controller.changeHandler({ name, value: event.target.value })
      : (event: React.ChangeEvent<HTMLSelectElement>) =>
          onChange?.({ name, value: event.target.value });

  const options = getOptions(props);

  const Component = type === "simple" ? Select1 : Select2;

  return (
    <>
      <FormControlContainer
        controlKey="select"
        {...{ ...props, errors, refId, isInvalid }}
      >
        <Component
          {...{
            refId,
            filter,
            isInvalid,
            placeholder,
            value,
            onChange,
            noDefault,
            options,
          }}
        />
      </FormControlContainer>
    </>
  );
};
