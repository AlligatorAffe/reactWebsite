import { ReactNode, createContext, useState } from "react";

const AuthContext = createContext({});

/*
interface AuthProviderProps {
    children: ReactNode; // Specificera typen för children som ReactNode
}
*/

export const AuthProvider = ({ children } /*: AuthProviderProps*/)=>{
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContext;