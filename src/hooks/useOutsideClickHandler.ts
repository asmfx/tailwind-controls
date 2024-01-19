import { useEffect } from "react";
import { DataAction } from "../types";

export interface IUseOutsideClickHandlerOptions {
  ref: React.MutableRefObject<any>;
  data?: any;
  callback: DataAction;
}

export const useOutsideClickHandler = (
  options: IUseOutsideClickHandlerOptions
) => {
  const { ref, data, callback } = options;
  useEffect(() => {
    const clickHandler = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback(data);
      }
    };
    document.addEventListener("mousedown", clickHandler);
    return () => {
      document.removeEventListener("mousedown", clickHandler);
    };
  }, [ref, callback]);
};
