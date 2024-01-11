import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./PlantPage.css";
import PlantDetail from "./sub/PlantDetail/PlantDetail";
import AddPlant from "../../components/AddPlant/AddPlant"

//imported context
import { cookiesContext } from "../../App";
import { useCookies } from "react-cookie";

export default function PlantPage({ userId, token }) {
  const location = useLocation();
  const url = window.location.href;
  const id = url.split("/")[url.split("/").length - 1];
  const cookies = useCookies(cookiesContext);
  const [plant, setPlant] = useState();
  const [plantDownloaded, setPlantDownloaded] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState();
  const isLastPageMyPlants = location.state.isLastPageMyPlants;;
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const [wasAddPlantClicked, setWasAddPlantClicked] = useState(false);

  useEffect(() => {
    if (plant !== undefined) {
      try {
        setBackgroundImage(
          require("../../assets/plants/" +
            plant.botanicalName.replace(/\s/g, "-") +
            "-image.jpg")
        );
      } catch (e) {
        setBackgroundImage(require("../../assets/common/blank.png"))
      }
    }
  }, [plant]);

  const navigateToMyPlants = () => {
    navigate("/", { state: { myPlants: true } });
  };

  const navigateToSearch = () => {
    navigate("/search");
  };

  async function getPlantByID() {
    const response = await fetch("http://localhost:8080/plant/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      setPlant(await response.json());
      setPlantDownloaded(true);
    }
  }

  function close() {
    setWasAddPlantClicked(!setWasAddPlantClicked)
  }

  useEffect(() => {
    getPlantByID();
  }, []);

  function getCareDifficultyText(careDifficulty) {
    switch (careDifficulty) {
      case 0:
        return "Proste";
      case 1:
        return "Średnie";
      case 2:
        return "Trudne";
      default:
        return "Nieznane";
    }
  }

  function getSun(sunValue) {
    switch (sunValue) {
      case 0:
        return "Pełne słońce";
      case 1:
        return "Półcień";
      case 2:
        return "Cieniolubne";
      default:
        return "Brak danych";
    }
  }

  function getWaterFrequency(days) {
    if (days === 7) {
      return "Raz w tygodniu";
    } else if (days === 14) {
      return "Co dwa tygodnie";
    } else {
      return "Brak danych";
    }
  }

  return plantDownloaded ? (

    <>
      {wasAddPlantClicked ? <AddPlant userId={userId} token={token} close={close} plantId={plant.plantId} name={plant.botanicalName} rooms={rooms}></AddPlant> : <></>}
      <div
        className="back-btn"
        onClick={() =>
          isLastPageMyPlants ? navigateToMyPlants() : navigateToSearch()
        }
      >
        <span>Wróć</span>
      </div>
      <div id="plant-page-container">
        <div id="plant-container-main">
          <div id="plant-main-left">
            <div id="plant-image-container">
              <div
                id="plant-image"
                style={{ backgroundImage: `url(${backgroundImage})` }}
              ></div>
            </div>
          </div>
          <div id="plant-main-right">
            <div id="plant-name-container">
              <span id="plant-name">{plant.botanicalName}</span>
              <span id="common-name">{plant.commonName}</span>
            </div>
            <div id="plant-info-images">
              <div id="plant-care-difficulty-card" className="plant-image-card">
                <div id="care-difficulty-card-container" className="card-image">
                  <div id="care-difficulty-card-image"></div>
                </div>
                <span
                  id="plant-care-difficulty"
                  className="plant-card-description"
                >
                  {getCareDifficultyText(plant.careDifficulty)}
                </span>
                <span id="care-difficulty" className="plant-card-type">
                  Pielęgnacja
                </span>
              </div>
              <div id="plant-sun-card" className="plant-image-card">
                <div id="sun-card-image-container" className="card-image">
                  <div id="sun-card-image"></div>
                </div>
                <span id="plant-sun" className="plant-card-description">
                {getSun(plant.sun)}
                </span>
                <span id="sun" className="plant-card-type">
                  Nasłonecznienie
                </span>
              </div>
              <div id="plant-care-card" className="plant-image-card">
                <div
                  id="plant-care-card-image-container"
                  className="card-image"
                >
                  <div id="plant-care-card-image"></div>
                </div>
                <span id="plant-care" className="plant-card-description">
                  {getWaterFrequency(plant.water)}
                </span>
                <span id="care" className="plant-card-type">
                  Podlewanie
                </span>
              </div>
            </div>
            <div id="add-plant-container">
              {
                cookies[0].token !== undefined &&
                <div id="add-plant-button" onClick={() => setWasAddPlantClicked(!wasAddPlantClicked)}>
                  <span onClick={() => setWasAddPlantClicked(!wasAddPlantClicked)}>Dodaj rośline</span>
                </div>
              }
            </div>
          </div>
        </div>
        <div id="plant-details-container">
          <PlantDetail
            detailName={"podstawowe informacje"}
            description={plant.plantOverview}
          ></PlantDetail>
          <PlantDetail
            detailName={"rodzaj"}
            description={plant.plantType}
          ></PlantDetail>
          <PlantDetail
            detailName={"kraj pochodzenia"}
            description={plant.nativeArea}
          ></PlantDetail>
          <PlantDetail
            detailName={"wielkość dorosłej rośliny"}
            description={plant.matureSize + " m"}
          ></PlantDetail>
          <PlantDetail
            detailName={"właściwości oczyszczania powietrza"}
            description={plant.airPurifying}
          ></PlantDetail>
          <PlantDetail
            detailName={"toksyczność"}
            description={plant.toxicity}
          ></PlantDetail>
          <PlantDetail
            detailName={"rodzina"}
            description={plant.plantType}
          ></PlantDetail>
          <PlantDetail
            detailName={"pielęgnacja"}
            description={plant.careDescription}
          ></PlantDetail>
          <PlantDetail
            detailName={"podlewanie"}
            description={plant.waterExtended}
          ></PlantDetail>
          <PlantDetail
            detailName={"nasłonecznienie"}
            description={plant.sunExtended}
          ></PlantDetail>
          <PlantDetail
            detailName={"temperatura"}
            description={plant.temperature}
          ></PlantDetail>
          <PlantDetail
            detailName={"wilgotność"}
            description={plant.humidity}
          ></PlantDetail>
          <PlantDetail
            detailName={"Nawożenie"}
            description={plant.fertilizerExtended}
          ></PlantDetail>
          <PlantDetail
            detailName={"rozkwit"}
            description={plant.repottingExtended}
          ></PlantDetail>
          <PlantDetail
            detailName={"rodzaj ziemi"}
            description={plant.soilType}
          ></PlantDetail>
          <PlantDetail
            detailName={"ph ziemi"}
            description={plant.soilPh}
          ></PlantDetail>
          <PlantDetail
            detailName={"rozmnażanie"}
            description={plant.propagating}
          ></PlantDetail>
          <PlantDetail
            detailName={"choroby i szkodniki"}
            description={plant.pestsAndDiseases}
          ></PlantDetail>
          <PlantDetail
            detailName={"przycinanie"}
            description={plant.pruning}
          ></PlantDetail>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}
