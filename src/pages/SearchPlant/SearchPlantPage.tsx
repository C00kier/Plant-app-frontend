import "./SearchPlantPage.css";
import { useEffect, useState } from "react";
import SinglePlantResult from "./sub/SinglePlantResult/SinglePlantResult";
import SettingsButton from "./sub/SettingsButton/SettingsButton";
import IPlantDTO from "../../models/interfaces/IPlantDTO";

export default function SearchPlantPage() {
  const [plantName, setPlantName] = useState<string>("");
  const [searchResult, setSearchResult] = useState<IPlantDTO[]>([]);
  const [shouldRenderPlants, setShouldRenderPlants] = useState<boolean>(false);
  const [shouldDisplayMoreButton, setShouldDisplayMoreButton] =
    useState<string>("none");
  const [amountToLoad, setAmountToLoad] = useState<number>(12);
  const [shouldShowSettings, setShouldShowSettings] = useState<boolean>(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL;


  async function filter(e: { target: { value: string; }; }) {
    let filterIndex = e.target.value;
    let url = "";
    switch (filterIndex) {
      case "1": //swiatlolubne
        url = `${BASE_URL}/plant/filter/sun/0?name=` + plantName;
        break;
      case "2": //czesciowo naslonecznione
        url = `${BASE_URL}/plant/filter/sun/1?name=` + plantName;
        break;
      case "3": //cieniolubne
        url = `${BASE_URL}/plant/filter/sun/2?name=` + plantName;
        break;
      case "4": //la poczatkujacych
        url =
          `${BASE_URL}/plant/filter/difficulty/0?name=` + plantName;
        break;
      case "5": // dla zaawansowanych
        url =
          `${BASE_URL}/plant/filter/difficulty/1?name=` + plantName;
        break;
      case "6": //dla expertow
        url =
          `${BASE_URL}/plant/filter/difficulty/2?name=` + plantName;
        break;
      case "7": //oczyszczajace powietrze
        url =
          `${BASE_URL}/plant/filter/airpuryfying?name=` + plantName;
        break;
      case "8": // bezpieczne dla dzieci
        url = `${BASE_URL}/plant/filter/nontoxic?name=` + plantName;
        break;
      case "9": // bezpieczne dla zwierzat
        url = `${BASE_URL}/plant/filter/nontoxic?name=` + plantName;
        break;
      default:
        if (plantName.length > 0) {
          url = `${BASE_URL}/plant/name/` + plantName;
        } else {
          url = `${process.env.REACT_APP_BASE_URL}/plant`;
        }
        break;
    }
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();
    if (res !== undefined) {
      setSearchResult(res);
    }
  }

  async function search() {
    if (plantName.length > 0) {
      const response = await fetch(
        `${BASE_URL}/plant/name/` + plantName,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await response.json();

      if (res !== undefined) {
        setSearchResult(res);
        setShouldRenderPlants(true);
      }
    } else {
      const response = await fetch(`${BASE_URL}/plant`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();

      if (res !== undefined) {
        setSearchResult(res);
        setShouldRenderPlants(true);
      }
    }
  }
  function loadMore() : void{
    if (searchResult) {
      setAmountToLoad(amountToLoad + 12);
      
      if (amountToLoad >= (searchResult.length - 12) || searchResult.length === 0) {
        setShouldDisplayMoreButton("none");
      }
    }
  }
  useEffect(() => {
    if (shouldRenderPlants) {
      if (searchResult.length > 12) setShouldDisplayMoreButton("flex");
    }
  }, [shouldRenderPlants]);

  return (
    <>
      <div id="search-page">
        <div id="search-section">
          {shouldShowSettings ? (
            <SettingsButton filter={filter}></SettingsButton>
          ) : (
            <></>
          )}
          <span id="search-communicate">Szukaj rośliny</span>
          <div id="search-bar-section">
            <input
              type="text"
              id="search-bar"
              onChange={(e) => setPlantName(e.target.value)}
            ></input>
            <div
              id="search-settings-button"
              onClick={() => setShouldShowSettings(!shouldShowSettings)}
            ></div>
          </div>

          <div id="search-button" onClick={search}>
            <span>Szukaj</span>
          </div>
        </div>
        <div id="search-result-container">
          {shouldRenderPlants ? (
            <>
              {searchResult.map((element : IPlantDTO, index : number) => {
                if (index < amountToLoad) {
                  return (
                    <SinglePlantResult
                      plantName={element.botanicalName}
                      id={element.plantId}
                      key={index}
                    ></SinglePlantResult>
                  );
                }
              })}
            </>
          ) : (
            <></>
          )}
        </div>
        <div
          id="load-more-button"
          onClick={() => loadMore()}
          style={{ display: shouldDisplayMoreButton }}
        >
          <span>Załaduj więcej</span>
        </div>
      </div>
    </>
  );
}
