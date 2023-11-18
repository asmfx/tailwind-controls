import React from "react";
import { Layout } from "types/common";

export interface IFormControlContainerProps {
  controlKey?: string;
  name?: string;
  refId?: string;
  label?: React.ReactNode;
  layout?: Layout;
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
  } = props;

  const classNames = [
    "form-control",
    `form-control-${controlKey}`,
    ...(layout ? [`form-control-layout-${layout}`] : []),
  ];

  return (
    <>
      <div className={classNames.join(" ")}>
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
