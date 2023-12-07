import { useState } from "react";
import "./AddRoom.css";

export default function AddRoom({ setIsAddRoomVisible, setRooms, rooms }) {
  const [room, setRoom] = useState(null);

  function save() {
    const isRoomExists = rooms.some((existingRoom) => existingRoom === room);

    if (isRoomExists) {
      alert("Room with the same name already exists!");
    } else {
      // Create a new array and push the room only if it doesn't exist
      const roomsToSet = [...rooms, room];
      setRooms(roomsToSet);
      setIsAddRoomVisible(false);
      
    }
  }

  function close() {
    setIsAddRoomVisible(false);
  }

  return (
    <>
      <div className="add-room-container">
        <div className="add-room-window">
          <div className="close-button-container">
            <div className="close-button" onClick={close}></div>
          </div>
          <div className="add-room-content">
            <h2>Dodaj Pokój</h2>
            <p>*nazwy pokojów muszą być unikalne</p>
            <input
              type="text"
              className="add-room-input"
              placeholder="Nazwa pokoju"
              onChange={(e) => setRoom(e.target.value)}
            ></input>
            <div className="save-button" onClick={save}>
              <span>Zapisz</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
