import { useState, useEffect } from "react";
import "./HomePage.css";

import HomePageDesktop from "../desktop/HomePageDesktop";
import HomePageMobile from "../mobile/HomePageMobile";
import HomePageDesktopLogged from "../desktopLogged/HomePageDesktopLogged";
import HomePageMobileLogged from "../mobileLogged/HomePageMobileLogged";

export default function HomePage() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);


    return (
        <>
            {
                isUserLoggedIn
                    ? (
                        windowWidth < 436
                            ? <HomePageMobileLogged />
                            : <HomePageDesktopLogged />)
                    : (
                        windowWidth < 436
                            ? <HomePageMobile />
                            : <HomePageDesktop />)
            }
        </>
    )
}