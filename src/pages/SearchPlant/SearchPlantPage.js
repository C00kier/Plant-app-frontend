import "./SearchPlantPage.css";
import { useEffect, useState } from "react";
import SinglePlantResult from "./sub/SinglePlantResult/SinglePlantResult";

export default function SearchPlantPage() {
  const [plantName, setPlantName] = useState("");
  const [searchResult, setSearchResult] = useState();
  const [shouldRenderPlants, setShouldRenderPlants] = useState(false);
  const [shouldDisplayMoreButton, setShouldDisplayMoreButton] =
    useState("none");
  const [amountToLoad, setAmountToLoad] = useState(12);

  useEffect (() => {
    search();
  }, [])

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
        if (plantName.length > 0) {
          url = "http://localhost:8080/plant/name/" + plantName;
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
        <div id="search-section" className="flex-column-center-center" >
          <div id="search-bar-section" className="flex-column-center-center">
            <span id="search-communicate">Szukaj rośliny</span>
            <div id="upper-search-row" className="flex-row">
              <input
                type="text"
                id="search-bar"
                onChange={(e) => setPlantName(e.target.value)}
              ></input>
            </div>
            <div id="bottom-search-row" className="flex-row">
              <div id="search-button" onClick={search}>
                <span>Szukaj</span>
              </div>
              <div id='settings-container'>
                <select id='filter-select' onChange={filter}>
                  <option value="0">Filtruj..</option>
                  <option value="1" className='filter-option'>Światłolubne</option>
                  <option value="2" className='filter-option'>Częściowo nasłonecznione</option>
                  <option value="3" className='filter-option'>Cieniolubne</option>
                  <option value="4" className='filter-option'>Dla początkujących</option>
                  <option value="5" className='filter-option'>Dla zaawansowanych</option>
                  <option value="6" className='filter-option'>Dla expertów</option>
                  <option value="7" className='filter-option'>Oczyszczające powietrze</option>
                  <option value="8" className='filter-option'>Bezpieczne dla dzieci</option>
                  <option value="9" className='filter-option'>Bezpieczne dla zwierząt</option>
                </select>
              </div>
            </div>
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
