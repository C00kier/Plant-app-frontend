import "./HomePageMobile.css";
import { Link } from "react-router-dom";

//assets
import blankImage from "./../../../assets/common/blank.png";

//constants
import PAGES from "../../../constants/pages";

export default function HomePageMobile(){
    return(
        <div className="home-page-mobile-main-container flex-column-center-center">
            <div className="home-page-mobile-upper-container flex-row-center-center">
                <div className="home-page-mobile-upper-left-container flex-column-center-center">
                    <p>Odkryj nową aplikację, która uczyni twoje życie roślinnym, łatwiejszym i pełniejszym!</p>
                    <Link to={PAGES.REGISTER}><button className="home-page-mobile-register-button" type="button">Zarejestruj się!</button></Link>
                </div>
            </div>
            <div className="home-page-mobile-lower-container flex-column-center-center">
                <div className="horizontal-thin-grey-line"/>
                <div className="home-page-mobile-lower-text-box flex-column-center-center">
                    <p className="home-page-mobile-lower-text-box-description">Dostarczymy spersonalizowane rekomendacje dotyczące najlepszych gatunków roślin do Twojego domu i przypomnimy Ci o ich podlewaniu i nawożeniu.</p>
                </div>
                <iframe
                    className="home-page-mobile-video"
                    width="300"
                    height="240"
                    src="https://www.youtube.com/embed/RRMcCNbmFWc?si=qhdE-9NPtB4HHlBi"
                    title="Sprout"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
                    allowFullScreen>
                </iframe>
            </div>
        </div>
    )
}