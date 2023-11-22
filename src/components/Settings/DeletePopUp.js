import React from "react";
import "./DeletePopUp.css";

const DeletePopUp = ({ confirmDelete, cancelDelete }) => {
  return (
    <div className="delete-popup-container">
      <div className="delete-popup-content">
        <p>
          Jesteś pewny/a, że chcesz usunąć konto? Ta czynność jest
          nieodwracalna.
        </p>
        <div className="delete-buttons-container">
          <div className="delete-popup-button" onClick={confirmDelete}>
            <span>TAK</span>
          </div>
          <div className="delete-popup-button" onClick={cancelDelete}>
            <span>NIE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePopUp;
