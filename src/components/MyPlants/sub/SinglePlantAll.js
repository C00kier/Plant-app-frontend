import { useEffect } from "react";
import { useState } from "react";
import "./SinglePlantAll.css";

export default function SinglePlantResult({ plantName, plantRoom }) {
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
      <div className="single-plant-all">
        <div
          className="plant-image-all"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>
        <div className="plant-name-all">
          <span>{plantName}</span>
        </div>
        <div className="plant-room-all">
          <span>{plantRoom}</span>
        </div>
      </div>
    </>
  );
}
