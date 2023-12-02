import "./Cockpit.css";

//constants
import ACTION_PERIODS from "../../constants/cockpitActionPeriods";

//components
import CockpitActionHeader from "./CockpitActionHeader";
import CockpitActionElement from "./CockpitActionElement";
import { useEffect, useState } from "react";

export default function CockpitWithPlants(props) {
    const { userPlants } = props;
    const [sortedPlantsByActionDate, setSortedPlantsByActionDate] = useState({
        Today: [],
        Tommorow: [],
        Week: []
    });

    console.log(userPlants);


    useEffect(() => {
        sortPlants();
    }, userPlants);

    /*
        Function that assign user plants to
        correct period of time in 
        sortedPlantsByActionDate variable.
        If period of time is more than Week
        plant will be not assigned.
    */
    function sortPlants() {
        const sortedPlants = {
            Today: [],
            Tommorow: [],
            Week: []
        }

        for (const userPlant of userPlants) {
            if (shouldBeCareOfToday(userPlant)) {
                sortedPlants.Today.push(userPlant);
            }
        }

        setSortedPlantsByActionDate(sortedPlants);
    }

    /*
        Returns true if there is action to perform
        on plant today. False otherwise.
    */

    function shouldBeCareOfToday(userPlant) {
        const monthLength = 30;
        const yearLength = 365;
        if (shouldTakeActionToday(userPlant.lastFertilized, userPlant.plant.fertilizer * monthLength)) {
            return true;
        }
        if (shouldTakeActionToday(userPlant.lastRepotted, userPlant.plant.repotting * yearLength)) {
            return true;
        }
        if (shouldTakeActionToday(userPlant.lastWatered, userPlant.plant.water)) {
            return true;
        }
        return false;
    }

    /*
        Returns true if greater than numberOfDays
        has passed since the start date. Otherwise
        returns false. If startingDate is not instanceof Date
        or numberOfDays isNaN returns true.
    */
    function shouldTakeActionToday(startingDate, numberOfDays) {
        const currentTimestamp = new Date().getTime();

        if (!(startingDate instanceof Date) || Number.isNaN(numberOfDays)) {
            return true;
        }

        const predictedActionTime = addDaysToDateInTimestamp(startingDate, numberOfDays);

        return currentTimestamp > predictedActionTime;
    }

    /*
        Returns timestamp for adding days
        to date.
    */
    function addDaysToDateInTimestamp(startingDate, numberOfDays) {
        const numberOfDaysTimestamp = convertNumberOfDaysToTimestamp(numberOfDays);
        const startingDateTimestamp = startingDate.getTime();
        return startingDateTimestamp + numberOfDaysTimestamp;
    }


    /*
        Returns timestamp for numberOfDays.
        If numberOfDays isNaN return 0.
    */
    function convertNumberOfDaysToTimestamp(numberOfDays) {
        if (Number.isNaN(numberOfDays)) {
            return 0;
        }

        const millisecondsInDay = 24 * 60 * 60 * 1000;
        return numberOfDays * millisecondsInDay;
    }

    //dodać info jeżeli wszystko jest zadbane.
    return (
        <div className="cockpit-with-plants-container flex-column-center-center">
            <p className="cockpit-with-plants-header">Kokpit</p>
            <div className="cockpit-with-plants-action-container flex-column">
                {
                    sortedPlantsByActionDate.Today.length > 0 &&
                    <div className="cockpit-with-plants-today-action-container">
                        <CockpitActionHeader timePeriod={ACTION_PERIODS.TODAY} />
                        {sortedPlantsByActionDate.Today.map((userPlant, index) =>
                            <CockpitActionElement key={`userPlant${index}`} userPlant={userPlant} />
                        )}
                    </div>
                }
                {
                    sortedPlantsByActionDate.Tommorow.length > 0 &&
                    <div className="cockpit-with-plants-yesterday-action-container">
                        <CockpitActionHeader timePeriod={ACTION_PERIODS.TOMMOROW} />
                        {sortedPlantsByActionDate.Tommorow.map((userPlant, index) =>
                            <CockpitActionElement key={`userPlant${index}`} userPlant={userPlant} />
                        )}
                    </div>
                }
                {
                    sortedPlantsByActionDate.Week.length > 0 &&
                    <div className="cockpit-with-plants-week-action-container">
                        <CockpitActionHeader timePeriod={ACTION_PERIODS.WEEK} />
                        {sortedPlantsByActionDate.Week.map((userPlant, index) =>
                            <CockpitActionElement key={`userPlant${index}`} userPlant={userPlant} />
                        )}
                    </div>
                }
            </div>
        </div>
    )
}