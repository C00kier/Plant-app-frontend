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
    const [plantsRequiredActions, setPlantsRequiredActions] = useState([]);
    
    useEffect(() => {
        sortPlants();
    }, []);

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
        const plantCareArray = [];

        for (const userPlant of userPlants) {
            if (shouldBeCared(userPlant, 0, plantCareArray)) {
                sortedPlants.Today.push(userPlant);
            }
            else if (shouldBeCared(userPlant, 1, plantCareArray)) {
                sortedPlants.Tommorow.push(userPlant);
            }
            else if (shouldBeCared(userPlant, 7, plantCareArray)) {
                sortedPlants.Week.push(userPlant);
            }
        }
        setPlantsRequiredActions(plantCareArray);
        setSortedPlantsByActionDate(sortedPlants);
    }


   /**
    * Returns true if there is action to perform on plant. False otherwise.
    * Saving user plant id with required actions in plantsRequiredActions variable.
    * @param {*} userPlant 
    * @param {*} daysToSubtract number of days we want prediction for
    * @returns {boolean}
    */
    function shouldBeCared(userPlant, daysToSubtract, plantCareArray) {
        const monthLength = 30;
        const yearLength = 365;
        const requiredActionsObj = {
            userPlantId: userPlant.userPlantId,
            watering: false,
            fertilizing: false,
            repotting: false
        }
        
        let needCare = false;
        if (shouldTakeAction(userPlant.lastFertilized, userPlant.plant.fertilizer * monthLength, daysToSubtract)) {
            needCare = true;
            requiredActionsObj.fertilizing = true;
        }
        if (shouldTakeAction(userPlant.lastRepotted, userPlant.plant.repotting * yearLength, daysToSubtract)) {
            needCare = true;
            requiredActionsObj.repotting = true;
        }
        if (shouldTakeAction(userPlant.lastWatered, userPlant.plant.water, daysToSubtract)) {
            needCare = true;
            requiredActionsObj.watering = true;
        }

        if(needCare){
            plantCareArray.push(requiredActionsObj);
        }
        return needCare;
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
            return true;
        }

        const currentTimestamp = new Date().getTime();
        const predictedActionTime = addDaysToDateInTimestamp(date, numberOfDays) - convertNumberOfDaysToTimestamp(daysToSubtract);
        return currentTimestamp > predictedActionTime;
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
     * @param {int} numberOfDays number of days to convert 
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
                            <CockpitActionElement key={`userPlant${index}`} userPlant={userPlant} requiredActions={plantsRequiredActions}/>
                        )}
                    </div>
                }
                {
                    sortedPlantsByActionDate.Tommorow.length > 0 &&
                    <div className="cockpit-with-plants-yesterday-action-container">
                        <CockpitActionHeader timePeriod={ACTION_PERIODS.TOMMOROW} />
                        {sortedPlantsByActionDate.Tommorow.map((userPlant, index) =>
                            <CockpitActionElement key={`userPlant${index}`} userPlant={userPlant} requiredActions={plantsRequiredActions}/>
                        )}
                    </div>
                }
                {
                    sortedPlantsByActionDate.Week.length > 0 &&
                    <div className="cockpit-with-plants-week-action-container">
                        <CockpitActionHeader timePeriod={ACTION_PERIODS.WEEK} />
                        {sortedPlantsByActionDate.Week.map((userPlant, index) =>
                            <CockpitActionElement key={`userPlant${index}`} userPlant={userPlant} requiredActions={plantsRequiredActions}/>
                        )}
                    </div>
                }
            </div>
        </div>
    )
}