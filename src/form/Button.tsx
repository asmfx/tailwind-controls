import React, { useState } from "react";
import { IButtonProps } from "../types/form";
import { Size } from "types/common";

export const Button: React.FC<IButtonProps> = ({
  controller,
  as,
  icon,
  bind,
  data,
  type = "button",
  onClick,
  label,
  variant = "primary",
  disabled,
  border,
  size,
  outline,
  disabledLabel,
  autoDisabled,
  children,
}) => {
  const [innerDisabled, setInnerDisabled] = useState(false);

  if (controller) {
    bind = controller.values;
    if (!onClick && type === "submit") {
      disabled =
        disabled || (controller.errors.validate && !controller.errors.isValid);
      onClick =
        "submitHandler" in controller
          ? (controller.submitHandler as any)
          : undefined;
    }
  }

  let style = {};
  if (border === "circle") {
    const csizes: Record<Size, string> = {
      xs: "1.6em",
      sm: "2em",
      md: "3em",
      lg: "4em",
    };
    const csize = csizes[size || "md"];
    style = {
      ...style,
      borderRadius: csize,
      width: csize,
      height: csize,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0",
    };
  }
  const className = `btn btn-${outline ? "outline-" : ""}${variant}${
    size ? ` btn-${size}` : ``
  }`;

  const onClickHandler = async () => {
    if (onClick && typeof onClick === "function") {
      if (autoDisabled || autoDisabled === undefined) {
        setInnerDisabled(true);
        await onClick(data);
        setInnerDisabled(false);
      } else {
        await onClick(data);
      }
    }
  };

  const isLink = onClick && typeof onClick === "string";
  const defaultComponent = isLink ? "a" : "div";
  const Component = as || defaultComponent;
  return (
    <Component
      style={style}
      className={className}
      {...(isLink
        ? {
            href: onClick,
          }
        : { onClick: onClickHandler })}
    >
      {children || (
        <>
          {icon}
          {innerDisabled || disabled ? disabledLabel ?? label : label}
        </>
      )}
    </Component>
  );
};
