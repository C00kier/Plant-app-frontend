import "./Cockpit.css";
import { useCookies } from "react-cookie";

//imported context
import { cookiesContext } from "../../App";

export default function CockpitPerformActionWindow(props) {
    const { setIsActionMenuVisible, currentAction, userPlant } = props;
    const cookies = useCookies(cookiesContext);
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    /**
     * Updates last action date in database to current date based on action type
     */
    async function performActionNow() {
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
    async function actionNowOnClickEvent() {
        await performActionNow();
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

    return (
        <div className="modal-perform-action flex-column-center-center" onClick={(e) => closeModalOnClickOutside(e)}>
            <div className="perform-action-content">
                <button id="close-button" onClick={() => setIsActionMenuVisible(false)}>X</button>
                <span id="action-description">{currentAction.DESCRIPTION}</span>
                <button id="action-now-button" className="action-window-button" type="button" onClick={async () => await actionNowOnClickEvent()}>{currentAction.ACTION_NOW}</button>
                <button id="select-date-button" className="action-window-button" type="button">{currentAction.PICK_DATE}</button>
            </div>
        </div>
    )
}