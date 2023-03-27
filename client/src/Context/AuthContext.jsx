import { useState, useContext, createContext } from "react";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ''
    })

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

//custom hook

export const useAuth = () => useContext(AuthContext);

