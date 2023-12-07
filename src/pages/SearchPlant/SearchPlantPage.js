import "./SearchPlantPage.css";
import { useEffect, useState } from "react";
import SinglePlantResult from "./sub/SinglePlantResult/SinglePlantResult";
import SettingsButton from "./sub/SettingsButton/SettingsButton";

export default function SearchPlantPage() {
  const [plantName, setPlantName] = useState("");
  const [searchResult, setSearchResult] = useState();
  const [shouldRenderPlants, setShouldRenderPlants] = useState(false);
  const [shouldDisplayMoreButton, setShouldDisplayMoreButton] =
    useState("none");
  const [amountToLoad, setAmountToLoad] = useState(12);
  const [shouldShowSettings, setShouldShowSettings] = useState(false);

  async function filter(e) {
    let filterIndex = e.target.value;
    let url = "";
    switch (filterIndex) {
      case "1": //swiatlolubne
        url = "http://localhost:8080/plant/filter/sun/0?name=" + plantName;
        break;
      case "2": //czesciowo naslonecznione
        url = "http://localhost:8080/plant/filter/sun/1?name=" + plantName;
        break;
      case "3": //cieniolubne
        url = "http://localhost:8080/plant/filter/sun/2?name=" + plantName;
        break;
      case "4": //la poczatkujacych
        url =
          "http://localhost:8080/plant/filter/difficulty/0?name=" + plantName;
        break;
      case "5": // dla zaawansowanych
        url =
          "http://localhost:8080/plant/filter/difficulty/1?name=" + plantName;
        break;
      case "6": //dla expertow
        url =
          "http://localhost:8080/plant/filter/difficulty/2?name=" + plantName;
        break;
      case "7": //oczyszczajace powietrze
        url =
          "http://localhost:8080/plant/filter/airpuryfying?name=" + plantName;
        break;
      case "8": // bezpieczne dla dzieci
        url = "http://localhost:8080/plant/filter/nontoxic?name=" + plantName;
        break;
      case "9": // bezpieczne dla zwierzat
        url = "http://localhost:8080/plant/filter/nontoxic?name=" + plantName;
        break;
      default:
        url = "http://localhost:8080/plant/name/" + plantName;
        break;
    }
    console.log(url);
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
        "http://localhost:8080/plant/name/" + plantName,
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
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/plant`, {
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
      console.log(res);
    }
  }
  function loadMore() {
    setAmountToLoad(amountToLoad + 12);
    if (amountToLoad >= searchResult.length - 12 || searchResult.length === 0) {
      setShouldDisplayMoreButton("none");
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
              {searchResult.map((element, index) => {
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
