import { useState, useEffect } from "react";
import "./HomePage.css";

import HomePageDesktop from "../desktop/HomePageDesktop";
import HomePageMobile from "../mobile/HomePageMobile";

export default function HomePage() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
                windowWidth < 436
                    ? <HomePageMobile />
                    : <HomePageDesktop />
            }
        </>
    )
}