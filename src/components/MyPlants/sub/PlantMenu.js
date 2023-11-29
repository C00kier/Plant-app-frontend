import { useNavigate } from "react-router-dom";
import "./PlantMenu.css";

export default function PlantMenu({ plant, clickEvent }) {
  const navigate = useNavigate();
  const navigateToPlant = () => {
    navigate("/plant/" + plant.userPlantId);
  };

  return (
    <>
      <div className="single-plant-menu">
        <div className="icon-container-info" onClick={navigateToPlant}></div>
        <div className="icon-container-change" onClick={clickEvent}></div>
      </div>
    </>
  );
}
