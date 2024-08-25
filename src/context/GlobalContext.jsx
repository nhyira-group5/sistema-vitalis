import { createContext } from "react";

export const GlobaContext = createContext();

export const GlobalStorage = ({children}) => {
  <GlobaContext.Provider>
    {children}
  </GlobaContext.Provider>
}