import { useEffect } from "react";
import { useState } from "react";
import "./SinglePlantRooms.css";

export default function SinglePlantResult({ plantName }) {
  const [backgroundImage, setBackgroundImage] = useState();
  useEffect(() => {
    try {
      const image = require(`../../../assets/plants/${plantName.replace(
        /\s/g,
        "-"
      )}-image.jpg`);
      setBackgroundImage(image);
    } catch (error) {
      console.error(`Image not found for plant: ${plantName}`);
      setBackgroundImage(require("../../../assets/common/blank.png"));
    }
  }, [plantName]);

  return (
    <>
      <div className="single-plant-rooms">
        <div
          className="plant-image-rooms"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>
        <div className="plant-name-rooms">
          <span>{plantName}</span>
        </div>
      </div>
    </>
  );
}
