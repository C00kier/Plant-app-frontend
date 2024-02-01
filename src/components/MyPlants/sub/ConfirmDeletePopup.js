import "./ConfirmDeletePopup.css";
import { useState, useEffect } from "react";

export default function ConfirmDeletePopup({ plant, deletePlant, closePopup }) {
  const [wasPlantDeleted, setWasPlantDeleted] = useState(false);

  async function confirm() {
    setWasPlantDeleted(true);
    setTimeout(() => {
      deletePlant(plant);
      closePopup();
    }, 1000);
  }

  return (
    <>
      <div id="background-shade">
        {wasPlantDeleted ? (
          <div className="delete-plant-container">
            <p id="plant-delete-message">Usunięto roślinę!</p>
          </div>
        ) : (
          <div className="delete-plant-container">
            <div id="delete-plant-message-container">
              <span id="delete-plant-message">
                Czy jesteś pewien że chcesz usunąć roślinę?
              </span>
            </div>
            <div id="delete-plant-close-container">
              <div id="close-bttn" onClick={closePopup}></div>
            </div>
            <div className="confirm-delete-bttn-container">
              <div className="confirm-delete-bttn" onClick={confirm}>
                <span id="confirm-delete-message" onClick={confirm}>
                  Usuń
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
