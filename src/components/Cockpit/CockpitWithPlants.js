import "./Cockpit.css";

//constants
import ACTION_PERIODS from "../../constants/cockpitActionPeriods";

//components
import CockpitActionHeader from "./CockpitActionHeader";
import CockpitActionElement from "./CockpitActionElement";

export default function CockpitWithPlants(props) {
    const { userPlants } = props;

    return (
        <div className="cockpit-with-plants-container flex-column-center-center">
            <p className="cockpit-with-plants-header">Kokpit</p>
            <div className="cockpit-with-plants-action-container flex-column">
                <div className="cockpit-with-plants-today-action-container">
                    <CockpitActionHeader timePeriod={ACTION_PERIODS.TODAY} />
                    {userPlants.map((userPlant, index) => 
                        <CockpitActionElement key={`userPlant${index}`} userPlant={userPlant} />
                    )}
                </div>
                <div className="cockpit-with-plants-yesterday-action-container">
                    <CockpitActionHeader timePeriod={ACTION_PERIODS.TOMMOROW} />
                    {userPlants.map((userPlant, index) => 
                        <CockpitActionElement key={`userPlant${index}`} userPlant={userPlant} />
                    )}
                </div>
                <div className="cockpit-with-plants-week-action-container">
                    <CockpitActionHeader timePeriod={ACTION_PERIODS.WEEK} />
                    {userPlants.map((userPlant, index) => 
                        <CockpitActionElement key={`userPlant${index}`} userPlant={userPlant} />
                    )}
                </div>
            </div>
        </div>
    )
}