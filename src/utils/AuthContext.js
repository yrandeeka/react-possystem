import {createContext, useContext, useState} from 'react';

export const AuthContext=createContext({
    isAuthenticated:false,
    jwtToken:null,
    //user:null,
    login:()=>{},
    logout:()=>{}
});

export const AuthProvider=({children})=>{
    const [isAuthenticated,setIsAuthenticated]=useState(false);
    const [jwtToken,setJwtToken]=useState(null);
    //const [user,setUser]=useState(null);

    const login=(token)=>{
        console.log("token---",token);
        setIsAuthenticated(true);
        setJwtToken(token);
        //setUser(data.user);
        localStorage.setItem('token',token);
    }

    const logout=()=>{
        setIsAuthenticated(false);
        setJwtToken(null);
        //setUser(null);
        localStorage.removeItem('token');
    }

    return(
        <AuthContext.Provider value={{isAuthenticated,jwtToken,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>{
    return useContext(AuthContext);
}