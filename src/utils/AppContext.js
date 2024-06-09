import { createContext, useState } from "react";

export const AppContext=createContext({
    isAuthenticated:false,
    jwtToken:null,
    user:null,
});

export const AppProvider = ({ children }) => {
    const [state, setState] = useState({
        isAuthenticated:false,
        jwtToken:null,
        user:null,
    });
   
    return (
      <AppContext.Provider value={{ state, setState }}>
        {children}
      </AppContext.Provider>
    );
  };