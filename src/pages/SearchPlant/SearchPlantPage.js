import "./SearchPlantPage.css";
import { useEffect, useState } from "react";
import SinglePlantResult from "./sub/SinglePlantResult/SinglePlantResult";

export default function SearchPlantPage() {
    const [plantName, setPlantName] = useState("");
    const [searchResult, setSearchResult] = useState();
    const [shouldRenderFlowers, setShouldRenderFlowers] = useState(false);
    const [shouldDisplayMoreButton,setShouldDisplayMoreButton]=useState("none");
    const [amountToLoad,setAmountToLoad]=useState(12);
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
                setShouldRenderFlowers(true);
            }
            console.log(searchResult);
            console.log(shouldRenderFlowers);
        }
    }
    function loadMore(){
        if(amountToLoad>searchResult.length){
            setShouldDisplayMoreButton("none");
        }
        setAmountToLoad(amountToLoad+12);
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
                    <span id="search-communicate">Szukaj rośliny</span>
                    <div id="search-bar-section">
                        <input type="text" id="search-bar" onChange={(e) => setPlantName(e.target.value)}></input>
                        <div id="search-settings-button"></div>
                    </div>

                    <div id="search-button" onClick={search}>
                        <span>Szukaj</span>
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
                    <span>Załaduj więcej </span>
                </div>
            </div>
        </>
    )
}

