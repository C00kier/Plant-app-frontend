import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Cockpit.css";

//constants
import PAGES from "../../constants/pages";
import COMPONENT_STATES from "../../constants/myAccountComponentStates";

//context
import FunctionalityElementContext from "../../context/FunctionalityElementContext";
import { cookiesContext } from "../../App";

export default function CockpitNoPlants() {
    const {functionalityElement, setValue: setFunctionalityElement} = useContext(FunctionalityElementContext);
    const [username, setUsername] = useState<string>("username");
    const cookies = useContext(cookiesContext);

    useEffect(() => {
        try {
            (async () => {
                const response = await fetch("http://localhost:8080/user", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${cookies.token}`
                    },
                    body: JSON.stringify({ "userId": cookies.userId })
                });
                if(response.status === 200){
                    const data = await response.json();
                    setUsername(data.nickName)
                }
            })();
        } catch (error) {
            console.error(`Error fetching data: ${error}`);
        }
    })

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