import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import "./CockpitNoPlants.css";

//constants
import PAGES from "../../constants/pages";
import COMPONENT_STATES from "../../constants/myAccountComponentStates";

//context
import { functionalityElementContext } from "../../pages/Home/desktopLogged/HomePageDesktopLogged";

export default function CockpitNoPlants() {
    const [username, setUsername] = useState("username");
    const setFunctionalityElement = useContext(functionalityElementContext);

    return (
        <div className="cockpit-no-plants-container flex-column-center-center">
            <div className="cockpit-text flex-column-center-center">
                <p>Witaj {username}!</p>
                <p>Dodaj swoją pierwszą <Link to={PAGES.SEARCH}><span className="green-underscore-text">roślinę!</span></Link></p>
                <p>
                    W <span className="green-underscore-text" onClick={() => setFunctionalityElement(COMPONENT_STATES.SETTINGS)}>ustawieniach</span> swojego 
                    konta możesz dodać swoje zdjęcie, albo zmienić hasło oraz dodać szczegóły konta.
                </p>
                <p>
                    A teraz <span className="green-underscore-text" onClick={() => setFunctionalityElement(COMPONENT_STATES.QUIZ)}> wypełnij quiz</span>, 
                    dzięki czemu dowiesz się z jakimi roślinami będzie Ci najlepiej.
                </p>
            </div>
            <button className="start-quiz-button" type="button" onClick={() => setFunctionalityElement(COMPONENT_STATES.QUIZ)}>Wypełnij quiz!</button>
        </div>
    )
}