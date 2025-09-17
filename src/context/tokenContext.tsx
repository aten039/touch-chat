import React, { createContext, useState } from "react";

export type ContextType = {
  auth: {
    auth: boolean;
    token: string;
  };
  setAuth: React.Dispatch<React.SetStateAction<{
    auth: boolean;
    token: string;
  }>>;
};

export const tokenContext = createContext<ContextType | null>(null)

export function TokenContextProvider({children}:{children: React.ReactNode}){

    const [auth , setAuth] = useState({ auth:false, token:''})

    return (
        <tokenContext.Provider
            value={{auth, setAuth}}
        >
            {children}
        </tokenContext.Provider>
    )
}