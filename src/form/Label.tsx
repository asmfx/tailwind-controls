import React from "react";
import { ILabelProps } from "../types/form";
import { FormControlContainer } from "./FormControlContainer";
import { getControlErrors, getControlValue } from "./helpers";

export const Label: React.FC<ILabelProps> = (props) => {
    const {
        name,
        controller,
        placeholder,
    } = props;

    const value: string = getControlValue(props);
    const errors = getControlErrors(props);
    const isInvalid = errors.length ? " is-invalid" : "";
    const onChange = controller && name ? 
        (event: React.ChangeEvent<HTMLInputElement>) => 
            controller.changeHandler({ name, value: event.target.value })
        : undefined;

    return (
        <>
            <FormControlContainer
                controlKey="label"
                {...{...props, errors, isInvalid}}
            >
                <span
                    id={name}
                    className={`form-control-input ${isInvalid}`}
                    placeholder={placeholder}
                >{value}</span>
            </FormControlContainer>
        </>
    );
};
