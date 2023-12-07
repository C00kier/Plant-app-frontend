import { Link } from "react-router-dom";
import "./HomePageDesktop.css";

import PAGES from "../../../constants/pages";

export default function HomePage() {
    return (
        <div className="home-page-desktop-main-container flex-row-center-center">
            <div className="home-page-desktop-left-container flex-column">
                <div className="home-page-desktop-header-text">
                    <p>Odkryj nową aplikację, która uczyni twoje życie roślinnym łatwiejszym i pełniejszym!</p>
                </div>
                <div className="home-page-desktop-lower-text">
                    <p>Dostarczymy spersonalizowane rekomendacje dotyczące najlepszych gatunków roślin do Twojego domu i przypomnimy Ci o ich podlewaniu i nawożeniu.</p>
                </div>
                <Link to={PAGES.REGISTER}><button className="home-page-desktop-start-button" type="button">Rozpocznij!</button></Link>
            </div>
            <div className="home-page-desktop-righ-container">
                <iframe
                    className="home-page-desktop-video"
                    width="480"
                    height="320"
                    src="https://www.youtube.com/embed/RRMcCNbmFWc?si=qhdE-9NPtB4HHlBi"
                    title="Sprout"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen>
                </iframe>
            </div>
        </div>
    )
}