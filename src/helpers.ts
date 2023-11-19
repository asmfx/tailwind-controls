import {
  IDataController,
  getControlValidationErrors,
  getValue,
} from "@asmfx/ui-kit";

export const getControlValue = (options: {
  name?: string;
  bind?: any;
  value?: any;
  controller?: IDataController;
}) => {
  const { name, bind, value, controller } = options;

  return controller?.values && name
    ? getValue(controller.values, name)
    : bind && name && typeof bind === "object"
    ? getValue(bind, name) || value
    : value;
};

export const getControlErrors = (options: {
  name?: string;
  errors?: any;
  controller?: IDataController;
}) => {
  const { name, controller, errors } = options;
  const _errors = name && controller ? controller.errors : errors;
  return getControlValidationErrors(_errors, name);
};

export const $class = (options: any): string => {
  if (!options) {
    return "";
  } else if (typeof options === "string") {
    return options;
  } else if (Array.isArray(options)) {
    return options
      .map((option) => $class(option))
      .filter(Boolean)
      .join(" ");
  } else if (typeof options === "object") {
    return Object.entries(options)
      .map(([k, v]) => (v ? k : undefined))
      .filter(Boolean)
      .join(" ");
  }
  return "";
};

export const stopPropagationHandler: React.MouseEventHandler = (e) => {
  e.stopPropagation();
  return false;
};
