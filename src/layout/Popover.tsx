import { $class } from "helpers";
import { useOutsideClickHandler } from "hooks/useOutsideClickHandler";
import React, { useRef, useState } from "react";
import { DataAction } from "types";
export interface IPopoverProps {
  label: React.ReactNode;
  position?: "bottom-left" | "bottom-right";
  children: React.ReactNode;
  className?: string;
  onClosing?: DataAction;
  onOpening?: DataAction;
}

export const Popover: React.FC<IPopoverProps> = (props) => {
  const { label, className, children, position, onClosing, onOpening } = props;
  const [expanded, setExpanded] = useState(false);
  const refContainer = useRef(null);

  const closeHandler = async () => {
    if (expanded) {
      if (onClosing && (await onClosing()) === false) {
        return;
      }
      setExpanded(false);
    }
  };

  const openHandler = async () => {
    if (!expanded) {
      if (onOpening && (await onOpening()) === false) {
        return;
      }
      setExpanded(true);
    }
  };

  useOutsideClickHandler({
    ref: refContainer,
    callback: closeHandler,
  });

  return (
    <div
      ref={refContainer}
      className={$class(["ax-popover-container", className, { expanded }])}
    >
      <div onClick={expanded ? closeHandler : openHandler}>{label}</div>
      <div
        className={$class(["ax-popover-children", position])}
        role="menu"
        aria-orientation="vertical"
        style={!expanded ? { display: "none" } : {}}
        tabIndex={-1}
        onClick={closeHandler}
      >
        {children}
      </div>
    </div>
  );
};
