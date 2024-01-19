import { $class } from "../helpers";
import { ICardProps } from "../types/layout";
import React from "react";

export const Card: React.FC<ICardProps> = (props) => {
  const { icon, title, col, description, footer, children, className } = props;
  const classNames =
    col && col > 1
      ? `card-body grid grid-cols-${col}`
      : "card-body flex flex-col";
  return (
    <div className={$class(["card", className])}>
      {title && (
        <div className="card-header">
          {icon && <div className="card-icon">{icon}</div>}
          {title && <div className="card-title">{title}</div>}
        </div>
      )}
      {description && <div className="card-description">{description}</div>}
      {children && <div className={classNames}>{children}</div>}
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};
