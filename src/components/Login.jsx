import { useRef, useState, useEffect} from "react";
import { authenticate, isAuthenticatedAtLogin } from "../functions/login-utils";
import { AuthContext, useAuth } from "../functions/auth-utils";
import { ErrorBoundary } from "react-error-boundary";
import LoginErrorFallback from "./LoginErrorFallback";
import { useNavigate } from "react-router";


function Login() {
    const usernameInput = useRef(null);
    const passwordInput = useRef(null);
    const [error, setError] = useState(null);
    const [invalid, setInvalid] = useState(null);
    const navigate = useNavigate();
    const { user, setUser } =  useAuth();
    console.log(user)
    useEffect(() => {
        isAuthenticatedAtLogin(user, navigate, setUser);
    }, [user, navigate, setUser])

    const login = (event) => {
        event.preventDefault();
        let credentials = { 
            username : usernameInput.current.value, 
            password : passwordInput.current.value
        }
        authenticate(credentials, setUser, setError, navigate, setInvalid);
        usernameInput.current.value = '';
        passwordInput.current.value = '';
    }

    if (error) {
        throw new Error()
    }


    return (
        <>
            <p>Login</p>
            <p>{invalid?.message}</p>
            <form className="login-form" onSubmit={login}>
                <input ref={usernameInput} placeholder="username"></input>
                <input ref={passwordInput} placeholder="password"></input>
                <button>login</button>
            </form>
        </>
    )
}

export default Login;

                // <input ref={usernameInput} value={credentials.username} onChange={(event) => setCredentials({...credentials, ['username'] : event.target.value})} placeholder="username"></input>
                // <input ref={passwordInput} value={credentials.password} onChange={(event) => setCredentials({...credentials, ['password'] : event.target.value})} placeholder="password"></input>