import "./Cockpit.css";

//assets
import exclamationMark from "../../assets/cockpit/exclamation_mark.png";
import fertilizerIcon from "../../assets/cockpit/fertilizer.png";
import repottedIcon from "../../assets/cockpit/repotted.png";
import waterIcon from "../../assets/cockpit/waterdrop.png";
import blankImage from "../../assets/common/blank.png";

export default function CockpitActionElement({userPlant}){

//sprawdzenie dat i wyświetlanie obrazków

    return(
        <>
            <div className="grid-action-container-element">
                <img className="cockpit-userplant-image" src={(userPlant.plant.picture !== null) ? userPlant.plant.picture : blankImage} alt="plant"/>
                <span className="cockpit-userplant-alias">{userPlant.alias}</span>
                <div className="grid-action-icons-container">
                    <img className="action-icon" src={waterIcon} alt="watering"/>
                    <img className="action-icon" src={fertilizerIcon} alt="fertilizer"/>
                    <img className="action-icon" src={repottedIcon} alt="repotted"/>
                    <img className="action-icon" src={exclamationMark} alt="exclamation mark"/>
                </div>
            </div>
        </>
    )
}