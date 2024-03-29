import React, { useEffect, useState } from "react";
import { IModalProps } from "../types/layout";
import { useOpacityTransition, Portal } from "@asmfx/ui-kit";
import { Card } from "./Card";
import { stopPropagationHandler } from "../helpers";

export const Modal: React.FC<IModalProps> = (props) => {
  const {
    show,
    position,
    onClose,
    transitionDuration,
    raw,
    noBackground,
    ...modalProps
  } = props;

  const [init, setInit] = useState(false);
  const animatedAppear = useOpacityTransition({
    initialState: show,
    transitionDuration,
  });

  const readModalCount = (): number => {
    try {
      const value = parseInt(
        document.body.getAttribute("asmfx:modal-count") || "0"
      );
      return value > 0 ? value : 0;
    } catch {
      return 0;
    }
  };

  const writeModalCount = (value: number): number => {
    value = value > 0 ? value : 0;
    document.body.setAttribute("asmfx:modal-count", `${value}`);
    return value;
  };

  const increaseModalCount = (): number => {
    return writeModalCount(readModalCount() + 1);
  };

  const decreaseModalCount = () => {
    return writeModalCount(readModalCount() - 1);
  };

  const popBodyOverflow = () => {
    if (!decreaseModalCount()) {
      document.body.classList.remove("overflow-hidden");
    }
  };

  const pushBodyOverflow = () => {
    increaseModalCount();
    document.body.classList.add("overflow-hidden");
  };

  useEffect(() => {
    animatedAppear.setState(show);
    if (show) {
      pushBodyOverflow();
    } else if (init && !show) {
      popBodyOverflow();
    }
    setInit(true);
  }, [show]);

  if (!animatedAppear.visible) {
    return null;
  }

  return (
    <Portal>
      <div style={animatedAppear.style} className="modal-container">
        {!noBackground && <div className="modal-background"></div>}
        <div
          onClick={onClose}
          className={`modal-item-container ${position || "center"}`}
        >
          <div onClick={stopPropagationHandler} className="modal-item">
            {!!raw ? (
              modalProps.children
            ) : (
              <Card className="modal-card" {...modalProps} />
            )}
          </div>
        </div>
      </div>
    </Portal>
  );
};
