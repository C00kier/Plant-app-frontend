import { useNavigate } from "react-router-dom";
import "./PlantMenu.css";
import IUserPlant from "../../../models/interfaces/IUserPlant";

export default function PlantMenu(
  { plant, clickEvent } : {
    plant: IUserPlant, clickEvent: () => void
  }) {
  const navigate = useNavigate();
  const navigateToPlant = () : void => {
    navigate("/plant/" + plant.plant.plantId, {
      state: { isLastPageMyPlants: true },
    });
  };

  return (
    <>
      <div className="single-plant-menu">
        <div
          className="icon-container-info"
          onClick={() => navigateToPlant()}
        ></div>
        <div className="icon-container-change" onClick={() => clickEvent}></div>
      </div>
    </>
  );
}
