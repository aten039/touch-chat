import { tokenContext } from "@/context/tokenContext";
import { useContext } from "react";

export function UseContextHookToken(){

    const context = useContext(tokenContext)

    return context

}