import "./Cockpit.css";
import { useCookies } from "react-cookie";
import { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

//imported context
import { cookiesContext } from "../../App";

export default function CockpitPerformActionWindow(props) {
    const { setIsActionMenuVisible, currentAction, userPlant } = props;
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);
    const [date, setDate] = useState(new Date());
    const cookies = useCookies(cookiesContext);
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    /**
     * Updates last action date in database to current date based on action type
     */
    async function performAction() {
        switch (currentAction.ACTION_TYPE) {
            case 0:
                await updateDateInDatabase(`${BASE_URL}/user-plant/${userPlant.userPlantId}/last-watering`);
                break;
            case 1:
                await updateDateInDatabase(`${BASE_URL}/user-plant/${userPlant.userPlantId}/last-fertilized`);
                break;
            case 2:
                await updateDateInDatabase(`${BASE_URL}/user-plant/${userPlant.userPlantId}/last-repotted`);
                break;
            default:
                break;
        }
        handleRefresh();
    }

    /**
     * Page refresh function
     */
    const handleRefresh = () => {
        window.location.reload();
    };

    /**
     * Patch request with date inside body on url adress
     * @param {String} url 
     * @returns 
     */
    async function updateDateInDatabase(url) {
        try {
            const response = await fetch(`${url}`
                , {
                    method: "PATCH",
                    headers:
                    {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${cookies[0].token}`
                    },
                    body: JSON.stringify({ date })
                });
            if (response.status === 200) {
                return response;
            }
        }
        catch (error) {
            console.error(`Error fetching data: ${error}`);
        }
    }


    /**
     * Function that updates date of action to current date
     * and hide action menu
     */
    async function performActionOnClickEvent() {
        await performAction();
        setIsActionMenuVisible(false);
    }


    /**
     * Disable action menu on clicking outside menu box
     * @param {*} e event
     */
    function closeModalOnClickOutside(e) {
        if (e.target.className === "modal-perform-action flex-column-center-center") {
            setIsActionMenuVisible(false);
        }
    }


    function calendarButtonOnClickEvent() {
        setIsCalendarVisible(true);
    }

    function handleDateChange(newDate) {
        setDate(newDate);
    };

    function backButtonCalendarOnClickEvent() {
        setDate(new Date);
        setIsCalendarVisible(false);
    }

    function actionWindowOnClickEvent(){
        setIsActionMenuVisible(false);
        setIsCalendarVisible(false);
    }


    return (
        <div className="modal-perform-action flex-column-center-center" onClick={(e) => closeModalOnClickOutside(e)}>
            {isCalendarVisible ?
                <div className="cockpit-calendar flex-column-center-center">
                    <Calendar
                        className="calendar"
                        onChange={handleDateChange}
                        value={date}
                        maxDate={new Date()}
                    />
                    <div className="calendar-button-bar flex-row-center-center">
                        <button className='calendar-button back-button' onClick={() => backButtonCalendarOnClickEvent()}>Wstecz</button>
                        <button className='calendar-button confrim-button' onClick={async () => await performActionOnClickEvent()}>Zatwierdź</button>
                    </div>
                </div>
                :
                <div className="perform-action-content">
                    <button id="close-button" onClick={() => actionWindowOnClickEvent()}>X</button>
                    <span id="action-description">{currentAction.DESCRIPTION}</span>
                    <button id="action-now-button" className="action-window-button" type="button" onClick={async () => await performActionOnClickEvent()}>{currentAction.ACTION_NOW}</button>
                    <button id="select-date-button" className="action-window-button" type="button" onClick={() => calendarButtonOnClickEvent()}>{currentAction.PICK_DATE}</button>
                </div>
            }
        </div>
    )
}