import "./HomePageMobile.css";
import blankImage from "./../../../assets/common/blank.png";

export default function HomePageMobile(){
    return(
        <div className="home-page-mobile-main-container flex-column-center-center">
            <div className="home-page-mobile-upper-container flex-row-center-center">
                <div className="home-page-mobile-upper-left-container flex-column-center-center">
                    <p>Odkryj nową aplikację, która uczyni twoje życie roślinnym, łatwiejszym i pełniejszym!</p>
                    <button className="home-page-mobile-register-button" type="button">Zarejestruj się!</button>
                </div>
                <div className="home-page-mobile-upper-right-container">
                    <img className="home-page-mobile-image" src={blankImage} alt="plant"/>
                </div>
            </div>
            <div className="home-page-mobile-lower-container flex-column-center-center">
                <div className="horizontal-thin-grey-line"/>
                <div className="home-page-mobile-lower-text-box flex-column-center-center">
                    <p className="home-page-mobile-lower-text-box-header">Odkryj z nami świat roślin!</p>
                    <p className="home-page-mobile-lower-text-box-description">Dostarczymy spersonalizowane rekomendacje dotyczące najlepszych gatunków roślin do Twojego domu i przypomnimy Ci o ich podlewaniu i nawożeniu.</p>
                </div>
                <iframe
                    className="home-page-mobile-video"
                    width="300"
                    height="240"
                    src="https://www.youtube.com/embed/plwwJsWiO6U"
                    title="Canterbury Park Corgi Races August 1, 2021"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
                    allowFullScreen>
                </iframe>
            </div>
        </div>
    )
}