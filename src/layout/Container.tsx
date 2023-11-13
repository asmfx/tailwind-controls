import { ILayoutControlProps } from "../types/layout";
import React from "react";


export const Container: React.FC<ILayoutControlProps> = (props) => {
    const { children } = props;
    return <div className="container mx-auto">
        {children}
    </div>
}