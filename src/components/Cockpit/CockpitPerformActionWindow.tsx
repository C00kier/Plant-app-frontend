import "./Cockpit.css";
import { useCookies } from "react-cookie";
import { MouseEvent, SetStateAction, useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

//interfaces
import IUserPlant from "../../models/interfaces/IUserPlant";
import IRequiredAction from "../../models/interfaces/IRequiredAction";

export default function CockpitPerformActionWindow(
    { setIsActionMenuVisible,
        currentAction,
        userPlant }: {
            setIsActionMenuVisible: (bool: boolean) => void,
            currentAction: IRequiredAction,
            userPlant: IUserPlant
        }) {

    const [isCalendarVisible, setIsCalendarVisible] = useState<boolean>(false);
    const [date, setDate] = useState<Date>(new Date());
    const cookies = useCookies();
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
    const handleRefresh = () : void => {
        window.location.reload();
    };

    /**
     * Patch request with date inside body on url adress
     * @param {String} url 
     * @returns 
     */
    async function updateDateInDatabase(url : string) {
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
    function closeModalOnClickOutside(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) : void {
        const target = e.target as HTMLElement;
    
        if (target.className && target.className.includes("modal-perform-action flex-column-center-center")) {
            setIsActionMenuVisible(false);
        }
    }

    function calendarButtonOnClickEvent() : void {
        setIsCalendarVisible(true);
    }

    function handleDateChange(newDate: SetStateAction<Date>) : void {
        setDate(newDate);
    };

    function backButtonCalendarOnClickEvent() : void {
        setDate(new Date);
        setIsCalendarVisible(false);
    }

    function actionWindowOnClickEvent() : void {
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
                        <button className='calendar-button back-button action-window-button' onClick={() => backButtonCalendarOnClickEvent()}>Wstecz</button>
                        <button className='calendar-button confrim-button action-window-button' onClick={async () => await performActionOnClickEvent()}>Zatwierdź</button>
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