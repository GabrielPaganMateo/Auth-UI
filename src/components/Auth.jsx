import { useState } from "react";
import { AuthContext } from "../functions/auth-utils";

export function Auth({ children }) {
    const [token, setToken] = useState('');
    const [user, setUser] = useState('');

    return (
        <>
            <AuthContext.Provider value={{token, user, setToken, setUser}}>
                {children}
            </AuthContext.Provider>
        </>
    )
}
