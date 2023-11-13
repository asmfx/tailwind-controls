import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from "react";
import { IDataController } from "@asmfx/ui-kit";

export type Variant =
  | "none"
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "light"
  | "dark"
  | "link"
  | "link-light";

export type BorderType = "square" | "rounded" | "circle";

export type ButtonType = "submit" | "button";

export type TextboxType = "text" | "password" | "number";

export type Layout = "form-control" | "raw";

export type Size = "lg" | "md" | "sm" | "xs";

export type ValidReturnTypes = Promise<void | boolean> | void | boolean;

export type UniqueValue = string | number;

export type HTMLInput = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export interface IBaseControlProps {
    label?: any;
    icon?: ReactNode;
    controller?: IDataController;
    name?: string;
    variant?: Variant;
    border?: BorderType;
    layout?: Layout;
    size?: Size;
    bind?: any;
    tag?: any;
    disabled?: boolean;
    children?: ReactNode;
  }