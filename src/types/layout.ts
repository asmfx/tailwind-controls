import { ReactNode } from "react";
import { Variant } from "./common";

export interface ILayoutControlProps {
  children?: React.ReactNode;
  col?: number;
}

export interface ICardProps extends ILayoutControlProps {
  variant?: Variant;
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
}

export type ModalPosition = "center" | "right" | "left";

export interface IModalProps extends ICardProps {
  show?: boolean;
  position?: ModalPosition;
  transitionDuration?: number;
  raw?: boolean;
  noBackground?: boolean;
  onClose?: () => void;
}
