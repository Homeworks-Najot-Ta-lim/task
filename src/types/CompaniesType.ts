import { ReactNode } from "react";

export interface CompanyType{
    id: string,
    name: string,
    count: number,
    actions?:ReactNode,
    key?:number,
}