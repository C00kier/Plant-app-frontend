import "./AccountSidebar.css";

import { useContext } from "react";

//assets
import settings_icon from "../../assets/accountSidebar/settings_icon.png";
import medal_star from "../../assets/accountSidebar/medal_star.png";
import plant_icon from "../../assets/accountSidebar/plant_icon.png";
import plant_house_icon from "../../assets/accountSidebar/plant_house_icon.png";
import dashboard_speed_icon from "../../assets/accountSidebar/dashboard_speed_icon.png";

//constants
import COMPONENT_STATE from "../../constants/myAccountComponentStates";

//contexts
import { functionalityElementContext } from "../../pages/Home/loggedUser/HomePageLogged";

export default function AccountSidebar() {
    const setFunctionalityElement = useContext(functionalityElementContext);

    return (
        
        <div className="home-page-logged-sidebar flex-column-center-center">
            <div className="home-page-logged-header">Moje konto</div>
            <div className="home-page-logged-bar-element flex-row-center-center">
                <p className="home-page-logged-bar-element-name" onClick={() => setFunctionalityElement(COMPONENT_STATE.COCKPIT)}>Kokpit</p>
                <img className="home-page-logged-bar-element-icon" onClick={() => setFunctionalityElement(COMPONENT_STATE.COCKPIT)} src={dashboard_speed_icon} alt="cockpit" />
            </div>
            <div className="home-page-logged-bar-element flex-row-center-center">
                <p className="home-page-logged-bar-element-name" onClick={() => setFunctionalityElement(COMPONENT_STATE.RECOMMENDATION)}>Rekomendacje</p>
                <img className="home-page-logged-bar-element-icon" onClick={() => setFunctionalityElement(COMPONENT_STATE.RECOMMENDATION)} src={plant_house_icon} alt="recommendations" />
            </div>
            <div className="home-page-logged-bar-element flex-row-center-center">
                <p className="home-page-logged-bar-element-name" onClick={() => setFunctionalityElement(COMPONENT_STATE.MY_PLANTS)}>Moje rośliny</p>
                <img className="home-page-logged-bar-element-icon" onClick={() => setFunctionalityElement(COMPONENT_STATE.MY_PLANTS)} src={plant_icon} alt="my plants" />
            </div>
            <div className="home-page-logged-bar-element flex-row-center-center">
                <p className="home-page-logged-bar-element-name" onClick={() => setFunctionalityElement(COMPONENT_STATE.BADGES)}>Odznaki</p>
                <img className="home-page-logged-bar-element-icon" onClick={() => setFunctionalityElement(COMPONENT_STATE.BADGES)} src={medal_star} alt="badges" />
            </div>
            <div className="home-page-logged-bar-element flex-row-center-center">
                <p className="home-page-logged-bar-element-name" onClick={() => setFunctionalityElement(COMPONENT_STATE.SETTINGS)}>Ustawienia</p>
                <img className="home-page-logged-bar-element-icon" onClick={() => setFunctionalityElement(COMPONENT_STATE.SETTINGS)} src={settings_icon} alt="settings" />
            </div>
        </div>
    )
}