import { useNavigate } from "react-router-dom";
import "./NoPlants.css";
import PAGES from "../../../constants/pages";

export default function NoPlants() {
    const navigate = useNavigate();

    return (
        <div className="no-plants-div flex-column-center-center">
            <h1>Wygląda na to że obecnie nie masz żadnych roślin</h1>
            <p>Kliknij <span className="no-plants-link" onClick={() => navigate(PAGES.SEARCH)}>tutaj</span> aby dodać swoją pierwszą roślinę</p>
        </div>
    )
}