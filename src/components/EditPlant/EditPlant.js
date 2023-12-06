import "./EditPlant.css";
import { useState, useEffect } from "react";

export default function EditPlant({
  close,
  plant,
  token,
  rooms,
  getUserPlants,
  getUserRooms,
}) {
  const [alias, setAlias] = useState(plant.alias);
  const [wasPlantAdded, setWasPlantAdded] = useState(false);
  const [room, setRoom] = useState(plant.room);
  const [wasPageUpdated, setWasPageUpdated] = useState(false);

  async function submit() {
    if (room) {
      const responseRoom = await fetch(
        `http://localhost:8080/user-plant/${plant.userPlantId}/room?roomName=${room}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(responseRoom);
    }

    if (alias !== plant.alias) {
      const responseAlias = await fetch(
        `http://localhost:8080/user-plant/${plant.userPlantId}/alias?alias=${alias}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(responseAlias);
    }

    getUserPlants();
    getUserRooms();
    setWasPageUpdated(!wasPageUpdated);
    setWasPlantAdded(true);
    setTimeout(() => {
      close();
    }, 1000);
  }

  return (
    <>
      <div id="background-shade">
        {wasPlantAdded ? (
          <div id="edit-plant-container">
            <p id="plant-edit-message">Zauktualizowano roślinę!</p>
          </div>
        ) : (
          <div id="edit-plant-container">
            <div id="edit-plant-message-container">
              <span id="edit-plant-message">Zaktualizuj roślinę</span>
            </div>
            <div id="edit-plant-main-container">
              <div id="restore-password-close-bttn" onClick={close}></div>
              <div id="room-container" className="edit-plant-input-container">
                <span>Pokój:</span>
                <select
                  id="room-input"
                  className="edit-plant-input-dropdown"
                  disabled={!rooms.length === 0}
                  onChange={(e) => setRoom(e.target.value)}
                  value={room}
                >
                  {rooms.map((room, index) => (
                    <option value={room} key={index}>
                      {room.charAt(0).toUpperCase() +
                        room.slice(1, room.length)}
                    </option>
                  ))}
                </select>
              </div>
              <div id="alias-container" className="edit-plant-input-container">
                <span>Alias: </span>
                <input
                  type="text"
                  placeholder={plant.alias}
                  onChange={(e) => setAlias(e.target.value)}
                  id="alias-input"
                ></input>
              </div>
            </div>
            <div id="edit-plant-bttn-container">
              <div id="edit-plant-bttn" onClick={submit}>
                <span id="edit-plant-bttn-message" onClick={submit}>
                  Zaktualizuj roślinę
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
