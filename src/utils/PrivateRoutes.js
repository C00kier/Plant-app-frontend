import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

//contexts
import { isAuthenticatedContext } from "../App";

//constants
import PAGES from "../constants/pages";

export default function PrivateRoutes(){
    const isAuthenticated = useContext(isAuthenticatedContext);
    let auth = {"token": isAuthenticated}
    return(
        auth.token ? <Outlet/> : <Navigate to={PAGES.LOGIN}/>
    )
}