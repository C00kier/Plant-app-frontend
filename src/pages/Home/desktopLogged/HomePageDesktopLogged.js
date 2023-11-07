import "./HomePageDesktopLogged.css";

import React, { useState } from "react";

//assets
import blankImage from "../../../assets/common/blank.png";

//constants
import COMPONENT_STATE from "../../../constants/myAccountComponentStates.js";

//components
import Cockpit from "../../../components/Cockpit/Cockpit";
import Recommendation from "../../../components/Recommendation/Recommendation";
import MyPlants from "../../../components/MyPlants/MyPlants";
import Badges from "../../../components/Badges/Badges";
import Settings from "../../../components/Settings/Settings";
import Quiz from "../../../components/Quiz/Quiz.js";

export const functionalityElementContext = React.createContext();

export default function HomePageDesktopLogged() {
    const [functionalityElement, setFunctionalityElement] = useState(COMPONENT_STATE.COCKPIT);

    function renderFunctionalityElement() {
        switch (functionalityElement) {
            case COMPONENT_STATE.COCKPIT: {
                return <Cockpit />;
            }
            case COMPONENT_STATE.RECOMMENDATION: {
                return <Recommendation />;
            }
            case COMPONENT_STATE.MY_PLANTS: {
                return <MyPlants />;
            }
            case COMPONENT_STATE.BADGES: {
                return <Badges />;
            }
            case COMPONENT_STATE.SETTINGS: {
                return <Settings />;
            }
            case COMPONENT_STATE.QUIZ:{
                return <Quiz />;
            }
        }
    }

    return (
        <div className="home-page-desktop-logged-container flex-column-center-center">
            <div className="home-page-desktop-logged-header">Moje konto</div>
            <div className="home-page-desktop-logged-content flex-row-center-center">
                <div className="home-page-desktop-logged-sidebar flex-column-center-center">
                    <div className="home-page-desktop-logged-bar-element flex-row-center-center">
                        <p className="home-page-desktop-logged-bar-element-name" onClick={() => setFunctionalityElement(COMPONENT_STATE.COCKPIT)}>Kokpit</p>
                        <img className="home-page-desktop-logged-bar-element-icon" onClick={() => setFunctionalityElement(COMPONENT_STATE.COCKPIT)} src={blankImage} alt="icon" />
                    </div>
                    <div className="home-page-desktop-logged-bar-element flex-row-center-center">
                        <p className="home-page-desktop-logged-bar-element-name" onClick={() => setFunctionalityElement(COMPONENT_STATE.RECOMMENDATION)}>Rekomendacje</p>
                        <img className="home-page-desktop-logged-bar-element-icon" onClick={() => setFunctionalityElement(COMPONENT_STATE.RECOMMENDATION)} src={blankImage} alt="icon" />
                    </div>
                    <div className="home-page-desktop-logged-bar-element flex-row-center-center">
                        <p className="home-page-desktop-logged-bar-element-name" onClick={() => setFunctionalityElement(COMPONENT_STATE.MY_PLANTS)}>Moje rośliny</p>
                        <img className="home-page-desktop-logged-bar-element-icon" onClick={() => setFunctionalityElement(COMPONENT_STATE.MY_PLANTS)} src={blankImage} alt="icon" />
                    </div>
                    <div className="home-page-desktop-logged-bar-element flex-row-center-center">
                        <p className="home-page-desktop-logged-bar-element-name" onClick={() => setFunctionalityElement(COMPONENT_STATE.BADGES)}>Odznaki</p>
                        <img className="home-page-desktop-logged-bar-element-icon" onClick={() => setFunctionalityElement(COMPONENT_STATE.BADGES)} src={blankImage} alt="icon" />
                    </div>
                    <div className="home-page-desktop-logged-bar-element flex-row-center-center">
                        <p className="home-page-desktop-logged-bar-element-name" onClick={() => setFunctionalityElement(COMPONENT_STATE.SETTINGS)}>Ustawienia</p>
                        <img className="home-page-desktop-logged-bar-element-icon" onClick={() => setFunctionalityElement(COMPONENT_STATE.SETTINGS)} src={blankImage} alt="icon" />
                    </div>
                </div>
                <div className="home-page-desktop-logged-functionality-container">
                    <functionalityElementContext.Provider value={setFunctionalityElement}>
                        {renderFunctionalityElement()}
                    </functionalityElementContext.Provider>
                </div>
            </div>
        </div>
    )
}