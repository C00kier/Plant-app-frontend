import { useEffect } from "react";
import { useState } from "react";
import "./SinglePlantAll.css";
import PlantMenu from "./PlantMenu";
import EditPlant from "../../EditPlant/EditPlant";

export default function SinglePlantResult({ plant, rooms }) {
  const [backgroundImage, setBackgroundImage] = useState();
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isEditPlantShown, setIsEditPlantShown] = useState(false);
  useEffect(() => {
    try {
      const image = require(`../../../assets/plants/${plant.plant.botanicalName.replace(
        /\s/g,
        "-"
      )}-image.jpg`);
      setBackgroundImage(image);
    } catch (error) {
      console.error(`Image not found for plant: ${plant.plant.botanicalName}`);
      setBackgroundImage(require("../../../assets/common/blank.png"));
    }
  }, [plant.plant.botanicalName]);

  function close() {
    setIsEditPlantShown(false);
  }

  return (
    <>
      {isEditPlantShown ? (
        <EditPlant close={close} plant={plant} rooms={rooms}></EditPlant>
      ) : (
        <></>
      )}
      <div
        className="single-plant-all"
        onMouseEnter={() => setIsMenuActive(true)}
        onMouseLeave={() => setIsMenuActive(false)}
      >
        {isMenuActive ? (
          <PlantMenu plant={plant} clickEvent={setIsEditPlantShown}></PlantMenu>
        ) : (
          <div
            className="plant-image-all"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          ></div>
        )}
        <div className="plant-name-all">
          <p>{plant.plant.botanicalName}</p>
        </div>
        {plant.alias.length > 0 ? (
          <div className="plant-alias-rooms">
            <span>{plant.alias}</span>
          </div>
        ) : (
          <></>
        )}
        <div className="plant-room-all">
          <p>{plant.room}</p>
        </div>
      </div>
    </>
  );
}
