import PropTypes from "prop-types";
import { ValidReturnTypes } from "@asmfx/ui-kit";
import { ReactNode } from "react";
import {
  IBaseControlProps,
  TextboxType,
  ButtonType,
  UniqueValue,
  LinkOrDataAction,
} from "./common";

export interface IChangeHandlerArgs {
  value: any;
  name?: string;
  tag?: any;
}
export type ChangeHandler = (args: IChangeHandlerArgs) => ValidReturnTypes;
export type BasicChangeHandler = (value: any) => ValidReturnTypes;

export interface IFormControlProps extends IBaseControlProps {
  inputRef?: any;
  placeholder?: string;
  value?: any;
  errors?: any;
  errorKeys?: string[];
  className?: string;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  footer?: React.ReactNode;
  readOnly?: boolean;
  onChange?: ChangeHandler;
}

export interface ILabelProps extends Omit<IFormControlProps, "onChange"> {}
export interface IListViewerProps
  extends Omit<IFormControlProps, "onChange" | "value"> {
  value?: any[];
  options?: any[];
  renderItem?: (item: any, index?: number, list?: any[]) => ReactNode;
}

export interface ITextboxProps extends IFormControlProps {
  type?: TextboxType;
  inputPattern?: string;
  formatter?: (value: any) => any;
  maxLength?: number;
  autoComplete?: string;
}

export interface ITextareaProps extends IFormControlProps {
  maxLength?: number;
}

export interface ICheckboxProps extends IFormControlProps {
  text?: ReactNode;
}

export interface CheckboxListProps extends IFormControlProps {
  direction?: "row" | "col";
  col?: number;
  options: string[] | InputOption[];
  value?: any[];
}

export interface RadiobuttonListProps extends IFormControlProps {
  direction?: "row" | "col";
  col?: number;
  options: string[] | InputOption[];
}

export interface IButtonProps extends IBaseControlProps {
  type?: ButtonType;
  as?: PropTypes.ReactComponentLike;
  data?: any;
  disabledLabel?: string;
  autoDisabled?: boolean;
  outlined?: boolean;
  onClick?: LinkOrDataAction;
}

export interface InputOption {
  id: UniqueValue;
  label?: string;
  name?: string;
  text?: string;
}

export interface ISelectProps extends IFormControlProps {
  options?: InputOption[];
  type?: "simple" | "select2";
  filter?: boolean | number;
  parentKey?: string;
  rootId?: any;
  seperator?: string;
  visible?: boolean;
  noDefault?: boolean;
  onChange?: (args: {
    value: string;
    intValue?: number;
    name?: string;
    tag?: any;
  }) => ValidReturnTypes;
  dataType?: "int" | "string";
}

export interface IMultiSelectProps extends IFormControlProps {
  options?: InputOption[];
  parentKey?: string;
  rootId?: any;
  seperator?: string;
  visible?: boolean;
  noDefault?: boolean;
  onChange?: (args: {
    value: any;
    name?: string;
    tag?: any;
  }) => ValidReturnTypes;
  dataType?: "int" | "string" | "csv";
}

export interface ICrossSelectProps extends IFormControlProps {
  options?: InputOption[];
  parentKey?: string;
  rootId?: any;
  seperator?: string;
  visible?: boolean;
  noDefault?: boolean;
  lookupRef?: string;
  onChange?: (args: {
    value: any;
    name?: string;
    tag?: any;
  }) => ValidReturnTypes;
  dataType?: "int" | "string";
}
