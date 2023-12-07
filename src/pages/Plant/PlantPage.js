import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./PlantPage.css";
import PlantDetail from "./sub/PlantDetail/PlantDetail";
import AddPlant from "../../components/AddPlant/AddPlant"

export default function PlantPage() {
  const location = useLocation();
  const url = window.location.href;
  const id = url.split("/")[url.split("/").length - 1];
  const [plant, setPlant] = useState();
  const [plantDownloaded, setPlantDownloaded] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState();
  const isLastPageMyPlants = location.state.isLastPageMyPlants;
  const navigate = useNavigate();
  const [wasAddPlantClicked, setWasAddPlantClicked] = useState(false);

  useEffect(() => {
    if (plant !== undefined) {
      setBackgroundImage(
        require("../../assets/plants/" +
          plant.botanicalName.replace(/\s/g, "-") +
          "-image.jpg")
      );
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
    if (response.status === 401) {
      //todo
    }
  }

  useEffect(() => {
    if (plant !== undefined) {
      setBackgroundImage(
        require("../../assets/plants/" +
          plant.botanicalName.replace(/\s/g, "-") +
          "-image.jpg")
      );
    }
  }, [plant]);

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
    if (response.status === 401) {
      //todo
    }
  }

  useEffect(() => {
    getPlantByID();
  }, []);

  return plantDownloaded ? (

    <>
      {wasAddPlantClicked ? <AddPlant></AddPlant> : <></>}
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
                  prosta
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
                  półcień
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
                  raz w tygodniu
                </span>
                <span id="care" className="plant-card-type">
                  Pielęgnacja
                </span>
              </div>
            </div>
            <div id="add-plant-container">
              <div id="add-plant-button" onClick={() => setWasAddPlantClicked(!wasAddPlantClicked)}>
                <span onClick={() => setWasAddPlantClicked(!wasAddPlantClicked)}>Dodaj rośline</span>
              </div>
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
            description={plant.airPuryfying}
          ></PlantDetail>
          <PlantDetail
            detailName={"toksyczność"}
            description={plant.toxicity}
          ></PlantDetail>
          <PlantDetail
            detailName={"rodzaj"}
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
