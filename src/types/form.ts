import { ValidReturnTypes } from "@asmfx/ui-kit";
import { ReactNode } from "react";
import { IBaseControlProps, TextboxType, ButtonType, UniqueValue } from "./common";

export interface IFormControlProps extends IBaseControlProps {
    placeholder?: string;
    value?: any;
    errors?: any;  
    className?: string;
    suffix?: React.ReactNode;
    prefix?: React.ReactNode;
    footer?: React.ReactNode;
    readOnly?: boolean;  
    onChange?: (args: {
      value: string;
      name?: string;
      tag?: any;
    }) => ValidReturnTypes;
  }
  
  export interface ILabelProps extends Omit<IFormControlProps, "onChange"> { }
  export interface IListViewerProps
    extends Omit<IFormControlProps, "onChange" | "value"> {
    value?: any[];
    options?: any[];
    renderItem?: (item: any, index?: number, list?: any[]) => ReactNode;
  }
  
  export interface ITextboxProps
    extends IFormControlProps {
    type?: TextboxType;
    maxLength?: number;
  }
  
  export interface ITextareaProps
    extends IFormControlProps {
    maxLength?: number;
  }
  
  export interface ICheckboxProps
    extends IFormControlProps { }
  
  export interface IButtonProps extends IBaseControlProps {
    type?: ButtonType;
    data?: any;
    disabledLabel?: string;
    autoDisabled?: boolean;
    outline?: boolean;
    onClick?: (data?: any) => ValidReturnTypes;
  }
  
  export interface InputOption {
    id: UniqueValue;
    label?: string;
    name?: string;
    text?: string;
  }
  
  export interface ISelectProps
    extends IFormControlProps {
    options?: InputOption[];
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
  
  export interface IMultiSelectProps
    extends IFormControlProps {
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
  
  export interface ICrossSelectProps
    extends IFormControlProps {
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
  
