import React from "react";
import { Layout } from "../types/common";
import { $class } from "../helpers";

export interface IFormControlContainerProps {
  controlKey?: string;
  name?: string;
  refId?: string;
  label?: React.ReactNode;
  layout?: Layout;
  isInvalid?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

export const FormControlContainer: React.FC<IFormControlContainerProps> = (
  props
) => {
  const {
    label,
    controlKey = "input",
    refId,
    name,
    layout,
    prefix,
    suffix,
    children,
    footer,
    isInvalid,
  } = props;

  const className = $class([
    "form-control",
    `form-control-${controlKey}`,
    ...(layout ? [`form-control-layout-${layout}`] : []),
    isInvalid,
  ]);

  return (
    <>
      <div className={className}>
        {label && (
          <div className="form-control-label">
            <label className="form-control-label-text" htmlFor={refId || name}>
              {label}
            </label>
          </div>
        )}
        <div className="form-control-content">
          {prefix && (
            <span className="form-control-content-prefix">{prefix}</span>
          )}
          {children}
          {suffix && (
            <span className="form-control-content-suffix">{suffix}</span>
          )}
        </div>
        {footer && <div className="form-control-footer">{footer}</div>}
      </div>
    </>
  );
};
