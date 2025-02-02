import { ChangeEventHandler } from "react";

export interface CustomInputType {
    size?: "small" | "large";
    placeholder?: string;
    extraClass?: string;
    name?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    type: "text" | "password" | "number";
    value?: string | number
  }
  