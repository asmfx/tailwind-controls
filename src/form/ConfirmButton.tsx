import React, { useState } from "react";
import { Button } from "./Button";
import { Variant, ValidReturnTypes } from "../types";
import { Modal } from "../layout/Modal";

export const ConfirmButton: React.FC<{
  title?: string;
  message?: string;
  label?: string;
  actionLabel?: string;
  cancelLabel?: string;
  variant?: Variant;
  actionVariant?: Variant;
  cancelVariant?: Variant;
  data?: any;
  disabled?: boolean;
  onAction?: (data?: any) => ValidReturnTypes;
  children?: React.ReactNode;
}> = ({
  title,
  message,
  actionLabel,
  cancelLabel,
  data,
  label,
  variant = "primary",
  actionVariant,
  cancelVariant = "link",
  onAction,
  disabled,
  children,
}) => {
  const [show, setShow] = useState(false);
  title = title || "Confirmation";
  message = message || "Are you sure to continue?";

  const actionHandler = async (data: any) => {
    await onAction?.(data);
    setShow(false);
  };

  return (
    <>
      <Button
        variant={variant}
        disabled={disabled}
        label={label}
        onClick={() => setShow(true)}
      ></Button>
      <Modal show={show} title={title} onClose={() => setShow(false)}>
        {children || message}
        <div className="flex content-end gap-2">
          {onAction && (
            <Button
              label={actionLabel || label}
              variant={actionVariant || variant}
              onClick={actionHandler}
              data={data}
              autoDisabled
            />
          )}
          <Button
            variant={cancelVariant}
            label={cancelLabel || "Return Back"}
            onClick={() => setShow(false)}
          />
        </div>
      </Modal>
    </>
  );
};
