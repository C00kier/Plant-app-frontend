import "./RecommendedPlant.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RecommendedPlant({ plant, quiz, open, token }) {
  const [plantToShow, setPlantToShow] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState();
  const [sunIcon, setSunIcon] = useState();
  const [sizeIcon, setSizeIcon] = useState();
  const [difficultyIcon, setDifficultyIcon] = useState();
  const navigate = useNavigate();
  const navigateToPlant = () => {
    navigate("/plant/" + plant.plantId, {
      state: { isLastPageMyPlants: true },
    });
  };

  useEffect(() => {
    if (plantToShow === null) {
      getPlantInfo();
    }
  }, []);

  async function getPlantInfo() {
    try {
      const response = await fetch(
        `http://localhost:8080/plant/${plant.plantId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        console.error(
          "Failed to fetch plant:",
          response.status,
          response.statusText
        );
        return;
      }
      const data = await response.json();
      setPlantToShow(data);
    } catch (error) {
      console.error("Error fetching user plants:", error.message);
    }
  }

  useEffect(() => {
    if (plant !== undefined && plantToShow !== null) {
      try {
        setBackgroundImage(
          require("../../../assets/plants/" +
            plant.botanicalName.replace(/\s/g, "-") +
            "-image.jpg")
        );
      } catch (e) {
        setBackgroundImage(require("../../../assets/common/blank.png"));
      }
      setSunIcon(
        require("../../../assets/recommendation/sun-icon-" +
          plantToShow.sun +
          ".png")
      );
      setSizeIcon(
        require("../../../assets/recommendation/size-icon-" +
          plantToShow.matureSize +
          ".png")
      );
      setDifficultyIcon(
        require("../../../assets/recommendation/difficulty-icon-" +
          plantToShow.careDifficulty +
          ".png")
      );
    }
  }, [plant]);

  return (
    <>
      <div className="recommended-plant">
        <div className="recommended-plant-data-container">
          <div
            className="recommended-plant-picture"
            onClick={() => navigateToPlant()}
            style={{ backgroundImage: `url(${backgroundImage})` }}
          ></div>
          <div className="recommended-plant-name-container">
            <span
              className="recommended-plant-name"
              onClick={() => navigateToPlant()}
            >
              {plant.botanicalName}
            </span>
          </div>
        </div>
        <div
          className="icon-container-recommended"
          style={{ backgroundImage: `url(${sunIcon})` }}
        ></div>
        <div
          className="icon-container-recommended"
          style={{ backgroundImage: `url(${sizeIcon})` }}
        ></div>
        <div
          className="icon-container-recommended"
          style={{ backgroundImage: `url(${difficultyIcon})` }}
        ></div>
        <div
          className={
            plantToShow && plantToShow.airPurifying
              ? "icon-container-recommended checkmark-icon"
              : "icon-container-recommended cross-icon"
          }
        ></div>
        <div
          className={
            plantToShow && plantToShow.toxicity
              ? "icon-container-recommended checkmark-icon"
              : "icon-container-recommended cross-icon"
          }
        ></div>
        <div
          className="recommeneded-plant-add-button add-icon icon-container-recommended"
          id={plant.id}
          onClick={() =>
            open(backgroundImage, plant.botanicalName, plant.plantId)
          }
        ></div>
      </div>
    </>
  );
}
