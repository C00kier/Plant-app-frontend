import "./HomePageLogged.css";

import React, { useState } from "react";

//constants
import COMPONENT_STATE from "../../../constants/myAccountComponentStates.js";

//components
import Cockpit from "../../../components/Cockpit/Cockpit.js";
import Recommendation from "../../../components/Recommendation/Recommendation.js";
import MyPlants from "../../../components/MyPlants/MyPlants.js";
import Badges from "../../../components/Badges/Badges.js";
import Settings from "../../../components/Settings/Settings.js";
import Quiz from "../../../components/Quiz/Quiz.js";
import AccountSidebar from "../../../components/AccountSidebar/AccountSidebar.js";

export const functionalityElementContext = React.createContext();

export default function HomePageDesktopLogged({userId,token}) {
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
            case COMPONENT_STATE.QUIZ: {
                return <Quiz userId={userId} token={token}/>;
            }
        }
    }

    return (
        <div className="home-page-logged-container flex-column-center-center">
            <functionalityElementContext.Provider value={setFunctionalityElement}>
                <div className="home-page-logged-content flex-row-center-center">
                    <div className="home-page-logged-sidebar-container">
                        <AccountSidebar />
                    </div>
                    <div className="home-page-logged-functionality-container">
                        {renderFunctionalityElement()}
                    </div>
                </div>
            </functionalityElementContext.Provider>
        </div>
    )
}