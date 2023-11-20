import "./SearchPlantPage.css";
import { useEffect, useState } from "react";
import SinglePlantResult from "./sub/SinglePlantResult/SinglePlantResult";
import SettingsButton from "./sub/SettingsButton/SettingsButton";
import { Navigate, useNavigate } from "react-router-dom";

export default function SearchPlantPage() {
    const [plantName, setPlantName] = useState("");
    const [searchResult, setSearchResult] = useState();
    const [shouldRenderFlowers, setShouldRenderFlowers] = useState(false);
    const [shouldDisplayMoreButton, setShouldDisplayMoreButton] = useState("none");
    const [amountToLoad, setAmountToLoad] = useState(12);
    const [shouldShowSettings, setShouldShowSettings] = useState(false);
    const currentLanguage = "pl";

    const langugeWritings = {
        pl: {
            searchPlant: "Szukaj rośliny",
            search: "Szukaj",
            loadMore: "Załaduj więcej"
        },
        en: {
            searchPlant: "Search plant",
            search: "Search",
            loadMore: "Load more"
        }
    }

    async function filter(e) {
        let filterIndex = e.target.value;
        let url = "";
        switch (filterIndex) {
            case "1": //swiatlolubne
                url = "http://localhost:8080/plant/filter/sun/0?name=" + plantName
                break;
            case "2": //czesciowo naslonecznione
                url = "http://localhost:8080/plant/filter/sun/1?name=" + plantName
                break;
            case "3": //cieniolubne
                url = "http://localhost:8080/plant/filter/sun/2?name=" + plantName
                break;
            case "4": //la poczatkujacych
                url = "http://localhost:8080/plant/filter/difficulty/0?name=" + plantName
                break;
            case "5": // dla zaawansowanych
                url = "http://localhost:8080/plant/filter/difficulty/1?name=" + plantName
                break;
            case "6": //dla expertow
                url = "http://localhost:8080/plant/filter/difficulty/2?name=" + plantName
                break;
            case "7": //oczyszczajace powietrze
                url = "http://localhost:8080/plant/filter/airpuryfying?name=" + plantName
                break;
            case "8": // bezpieczne dla dzieci
                url = "http://localhost:8080/plant/filter/nontoxic?name=" + plantName
                break;
            case "9": // bezpieczne dla zwierzat
                url = "http://localhost:8080/plant/filter/nontoxic?name=" + plantName
                break;
            default:
                url = "http://localhost:8080/plant/name/" + plantName;
                break;


        }
        console.log(url);
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log('ok');
        const res = await response.json();
        if (res != undefined) {
            console.log('ok1');
            console.log(res);
            setSearchResult(res);
        }
    }

    async function search() {

        if (plantName.length > 0) {
            const response = await fetch('http://localhost:8080/plant/name/' + plantName, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const res = await response.json();

            if (res != undefined) {
                setSearchResult(res);
                console.log(searchResult);
                setShouldRenderFlowers(true);
            }
            console.log(searchResult);
            console.log(shouldRenderFlowers);
        }
    }
    function loadMore() {
        setAmountToLoad(amountToLoad + 12);
        if (amountToLoad >= searchResult.length - 12 || searchResult.length===0) {
            setShouldDisplayMoreButton("none");
        }

    }
    useEffect(() => {
        console.log("ok");
        if (shouldRenderFlowers) {
            setShouldDisplayMoreButton("flex");
        }
    }, [shouldRenderFlowers])

    return (
        <>
            <div id="search-page">
                <div id="search-section">
                    {shouldShowSettings ? <SettingsButton filter={filter}></SettingsButton> : <></>}
                    <span id="search-communicate">{langugeWritings[currentLanguage].searchPlant}</span>
                    <div id="search-bar-section">
                        <input type="text" id="search-bar" onChange={(e) => setPlantName(e.target.value)}></input>
                        <div id="search-settings-button" onClick={() => setShouldShowSettings(!shouldShowSettings)}></div>
                    </div>

                    <div id="search-button" onClick={search}>
                        <span>{langugeWritings[currentLanguage].search}</span>
                    </div>

                </div>
                <div id="search-result-container">

                    {shouldRenderFlowers ?
                        <>{searchResult.map((element, index) => {
                            if (index < amountToLoad) {
                                return <SinglePlantResult plantName={element.botanicalName} id={element.id}></SinglePlantResult>
                            }
                        }
                        )}</> : <></>}
                </div>
                <div id="load-more-button" onClick={() => loadMore()} style={{ display: shouldDisplayMoreButton }}>
                    <span>{langugeWritings[currentLanguage].loadMore}</span>
                </div>
            </div>
        </>
    )
}

