import React from "react";

export interface CustomButtonType {
    title?: string;
    size?: "large" | "small";
    extraClass?: string;
    type: "button" | "submit";
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
