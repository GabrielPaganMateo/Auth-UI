import { Outlet, useNavigate } from "react-router";
import { isAuthenticatedAtUI } from "../functions/login-utils";
import { useAuth } from "../functions/auth-utils";
import { useEffect } from "react";

function Navbar() {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    useEffect(() => {
        isAuthenticatedAtUI(user, navigate, setUser);
    }, [user?.refreshToken, user, navigate, setUser]);

    const changeView = (view) => {
        navigate(`/ui${view}`)
    }

    return(
        <>
            <p>Navbar</p>
            <button onClick={() => {changeView("/profile")}}>Profile</button>
            <button onClick={() => {changeView("/list")}}>List</button>
            <Outlet/>
        </>
    )
}

export default Navbar;