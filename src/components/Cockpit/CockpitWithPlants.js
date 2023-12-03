import "./Cockpit.css";
import { useEffect, useState } from "react";

//constants
import ACTION_PERIODS from "../../constants/cockpitActionPeriods";

//components
import CockpitActionHeader from "./CockpitActionHeader";
import CockpitActionElement from "./CockpitActionElement";


export default function CockpitWithPlants(props) {
    const { userPlants } = props;
    const [sortedPlantsByActionDate, setSortedPlantsByActionDate] = useState({
        Today: [],
        Tommorow: [],
        Week: []
    });

    useEffect(() => {
        sortPlants();
    }, userPlants);


   /**
    * Function that assign user plants to
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
            if (shouldBeCaredToday(userPlant)) {
                sortedPlants.Today.push(userPlant);
            }
            else if (shouldBeCared(userPlant, 1)) {
                sortedPlants.Tommorow.push(userPlant);
            }
            else if (shouldBeCared(userPlant, 7)) {
                sortedPlants.Week.push(userPlant);
            }
        }

        setSortedPlantsByActionDate(sortedPlants);
    }


   /**
    * Returns true if there is action to perform on plant. False otherwise.
    * @param {*} userPlant 
    * @param {*} daysToSubtract number of days we want prediction for
    * @returns {boolean}
    */
    function shouldBeCared(userPlant, daysToSubtract) {
        const monthLength = 30;
        const yearLength = 365;
        if (shouldTakeAction(userPlant.lastFertilized, userPlant.plant.fertilizer * monthLength, daysToSubtract)) {
            return true;
        }
        if (shouldTakeAction(userPlant.lastRepotted, userPlant.plant.repotting * yearLength, daysToSubtract)) {
            return true;
        }
        if (shouldTakeAction(userPlant.lastWatered, userPlant.plant.water, daysToSubtract)) {
            return true;
        }
        return false;
    }


    /**
    * Returns true if there is action to perform on plant today. False otherwise.
    * @param {*} userPlant 
    * @returns {boolean}
    */
    function shouldBeCaredToday(userPlant) {
        const monthLength = 30;
        const yearLength = 365;
        if (shouldTakeActionForToday(userPlant.lastFertilized, userPlant.plant.fertilizer * monthLength)) {
            return true;
        }
        if (shouldTakeActionForToday(userPlant.lastRepotted, userPlant.plant.repotting * yearLength)) {
            return true;
        }
        if (shouldTakeActionForToday(userPlant.lastWatered, userPlant.plant.water)) {
            return true;
        }
        return false;
    }


   /**
    *   Returns true if greater numberOfDays
        has passed since the passed date
        than current date minus days for date 
        we want to get prediction for. Otherwise
        returns false.
    * @param {*} date 
    * @param {*} numberOfDays number of days to add to date
    * @param {*} daysToSubtract number of days we want prediction for
    * @returns 
    */
    function shouldTakeAction(date, numberOfDays, daysToSubtract) {
        if (date === null) {
            return false;
        }
        const currentTimestamp = new Date().getTime();
        const predictedActionTime = addDaysToDateInTimestamp(date, numberOfDays) - convertNumberOfDaysToTimestamp(daysToSubtract);
        return currentTimestamp > predictedActionTime;
    }


    /**
     * Returns true if databaseDate is equal null or shouldTakeAction function returns true
     * @param {Date} date 
     * @param {int} numberOfDays number of days to add to date
     * @returns {boolean}
     */
    function shouldTakeActionForToday(date, numberOfDays) {
        if (date === null) {
            return true;
        }
        shouldTakeAction(date, numberOfDays, 0);
    }


    /**
     * Returns timestamp for adding days to date.
     * @param {Date} date 
     * @param {int} numberOfDays number of days to add to date
     * @returns 
     */
    function addDaysToDateInTimestamp(date, numberOfDays) {
        const numberOfDaysTimestamp = convertNumberOfDaysToTimestamp(numberOfDays);
        const dateTimestamp = new Date(date).getTime();
        return dateTimestamp + numberOfDaysTimestamp;
    }


    /**
     * Returns timestamp for numberOfDays. If numberOfDays isNaN return 0.
     * @param {int} numberOfDays number of dasys to convert 
     * @returns 
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