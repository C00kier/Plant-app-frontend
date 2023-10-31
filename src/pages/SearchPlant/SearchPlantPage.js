import "./SearchPlantPage.css";
import { useEffect, useState } from "react";
import SinglePlantResult from "./sub/SinglePlantResult/SinglePlantResult";
import SettingsButton from "./sub/SettingsButton/SettingsButton";

export default function SearchPlantPage() {
    const [plantName, setPlantName] = useState("");
    const [searchResult, setSearchResult] = useState();
    const [shouldRenderFlowers, setShouldRenderFlowers] = useState(false);
    const [shouldDisplayMoreButton,setShouldDisplayMoreButton]=useState("none");
    const [amountToLoad,setAmountToLoad]=useState(12);
    const [shouldShowSettings,setShouldShowSettings]=useState(false);
    const currentLanguage="en";
    const langugeWritings={
        pl:{
            searchPlant:"Szukaj rośliny",
            search:"Szukaj",
            loadMore:"Załaduj więcej"
        },
        en:{
            searchPlant:"Search plant",
            search:"Search",
            loadMore:"Load more"
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
    function loadMore(){
        setAmountToLoad(amountToLoad+12);
        if(amountToLoad>=searchResult.length-12){
            setShouldDisplayMoreButton("none");
        }
        
    }
    useEffect(()=>{
        console.log("ok");
        if(shouldRenderFlowers){
            setShouldDisplayMoreButton("flex");
        }
    },[shouldRenderFlowers])

    return (
        <>
            <div id="search-page">
                <div id="search-section">
                    {shouldShowSettings ? <SettingsButton></SettingsButton> : <></>}
                    <span id="search-communicate">{langugeWritings[currentLanguage].searchPlant}</span>
                    <div id="search-bar-section">
                        <input type="text" id="search-bar" onChange={(e) => setPlantName(e.target.value)}></input>
                        <div id="search-settings-button" onClick={()=>setShouldShowSettings(!shouldShowSettings)}></div>
                    </div>

                    <div id="search-button" onClick={search}>
                        <span>{langugeWritings[currentLanguage].search}</span>
                    </div>

                </div>
                <div id="search-result-container">

                    {shouldRenderFlowers ?
                        <>{searchResult.map((element,index) =>{
                            if(index<amountToLoad){
                            return <SinglePlantResult plantName={element.botanicalName}></SinglePlantResult>
                            }
                        }
                        )}</> : <></>}
                </div>
                <div id="load-more-button" onClick={()=>loadMore()} style={{display:shouldDisplayMoreButton}}>
                    <span>{langugeWritings[currentLanguage].loadMore}</span>
                </div>
            </div>
        </>
    )
}

