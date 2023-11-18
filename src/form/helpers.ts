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
