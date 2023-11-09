import { Navigate, Outlet } from "react-router-dom";

//constants
import PAGES from "../constants/pages";

export default function PrivateRoutes(props){
    const {isAuthenticated} = props;
    let auth = {"token": isAuthenticated}

    return(
        auth.token ? <Outlet/> : <Navigate to={PAGES.LOGIN}/>
    )
}