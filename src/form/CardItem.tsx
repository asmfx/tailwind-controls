import React, { useState } from "react";
import { Button } from "./Button";
import { ICardItemProps } from "../types";
import { Modal } from "../layout";

export const CardItem: React.FC<ICardItemProps> = (props) => {
  const {
    title,
    description,
    icon,
    variant = "warning",
    position = "center",
    actionLabel = "Save",
    actionVariant = "primary",
    cancelLabel = "Cancel",
    cancelVariant = "secondary",
    children,
    controller,
  } = props;
  const [show, setShow] = useState(false);
  const cancelHandler = () => {
    setShow(false);
  };
  const showHandler = () => {
    setShow(true);
  };
  const actionHandler = () => {
    if (controller && "submit" in controller) {
      controller.submit();
    }
    setShow(false);
  };
  return (
    <>
      <Button variant={variant} size="sm" border="circle" onClick={showHandler}>
        {icon}
      </Button>
      <Modal
        show={show}
        onClose={cancelHandler}
        position={position}
        title={title}
        description={description}
        footer={
          <div className="d-flex gap-2">
            <Button
              label={actionLabel}
              variant={actionVariant}
              onClick={actionHandler}
            />
            <Button
              label={cancelLabel}
              variant={cancelVariant}
              onClick={cancelHandler}
            />
          </div>
        }
      >
        {children}
      </Modal>
    </>
  );
};
