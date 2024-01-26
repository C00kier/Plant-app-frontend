import { useEffect } from "react";
import { useState } from "react";
import "./SinglePlantResult.css";
import { useNavigate } from "react-router-dom";


export default function SinglePlantResult({ plantName, id }) {
  const [backgroundImage, setBackgroundImage] = useState();
  
  const navigate = useNavigate();
  const navigateToPlant = () => {
    navigate("/plant/" + id, { state: { isLastPageMyPlants: false } });
  };
  useEffect(() => {
    try{
    setBackgroundImage(
      require("../../../../assets/plants/" +
        plantName.replace(/\s/g, "-") +
        "-image.jpg")
    );
    }catch(e){
      setBackgroundImage(require("../../../../assets/common/blank.png"))
    }
  }, [plantName]);

  return (
    <>
      <div className="single-plant" onClick={() => navigateToPlant()}>
        {/* <div
          className="plant-image"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div> */}
        <img className="plant-image" loading='lazy' src={backgroundImage}></img>
        <div className="plant-name">
          <span>{plantName}</span>
        </div>
      </div>
    </>
  );
}
