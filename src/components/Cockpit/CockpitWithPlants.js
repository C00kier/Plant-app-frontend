import "./CockpitWithPlants.css";

//assets
import blankImage from "../../assets/common/blank.png";

export default function CockpitWithPlants() {
    return (
        <div className="cockpit-with-plants-container flex-column-center-center">
            <p className="cockpit-with-plants-header">Kokpit</p>
            <div className="cockpit-with-plants-action-container flex-row-center-center">
                <div className="cockpit-with-plants-action-container-left flex-column-center-center">
                    <p className="cockpit-with-plants-column-header">Dziś</p>
                    <hr></hr>
                    <div className="cockpit-with-plants-user-plant-container flex-row-center-center">
                        <img className="cockpit-with-plants-plant-image" src={blankImage} alt="plant"/>
                        <p className="cockpit-with-plants-plant-name">Example plant name</p>
                    </div>
                </div>
                <div className="cockpit-with-plants-action-container-right flex-column-center-center">
                    <p className="cockpit-with-plants-column-header">Akcja</p>
                    <div></div>
                    <div className="cockpit-with-plants-action-icons-container flex-row-center-center">
                        <img className="cockpit-with-plants-action-icon" src={blankImage} alt="watering"/>
                        <img className="cockpit-with-plants-action-icon" src={blankImage} alt="fertilizing"/>
                        <img className="cockpit-with-plants-action-icon" src={blankImage} alt="replanting"/>
                        <img className="cockpit-with-plants-action-icon" src={blankImage} alt="warning"/>
                    </div>
                </div>
            </div>
        </div>
    )
}