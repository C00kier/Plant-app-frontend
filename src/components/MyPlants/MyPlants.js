import "./MyPlants.css";
import React, { useEffect, useState } from "react";
import SinglePlantRooms from "./sub/SinglePlantRooms";
import SinglePlantAll from "./sub/SinglePlantAll";
import AddRoom from "./sub/AddRoom";

export default function MyPlants({
  userPlants,
  rooms,
  setRooms,
  token,
  getUserPlants,
  getUserRooms,
}) {
  const [plantsToShow, setPlantsToShow] = useState(userPlants);
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);

  useEffect(() => {
    setPlantsToShow(userPlants);
  }, [userPlants]);

  function onSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    setPlantsToShow(
      userPlants.filter((plant) =>
        plant.plant.botanicalName.toLowerCase().includes(searchTerm) || plant.alias.toLowerCase().includes(searchTerm)
      )
    );
  }

  return (
    <>
      <div className="my-plants-container">
        <div className="search-bar-container">
          <h1>Moje rośliny</h1>
          <div className="search-container">
            <span className="search-communicate">Szukaj rośliny</span>
            <input
              type="text"
              className="search-bar"
              onChange={(e) => onSearch(e)}
            ></input>
          </div>
        </div>
        <div className="my-rooms-container">
          <h1>Moje pokoje</h1>
          <div className="headers-container">
            <p className="header-room-name">Pokoje</p>
            <div
              className="add-room"
              onClick={() => setIsAddRoomVisible(true)}
            ></div>
          </div>
          {rooms &&
            rooms.map((room, index) => {
              const filteredPlants = plantsToShow.filter(
                (plantToShow) => plantToShow.room === room
              );
              return (
                <div className="room-container" key={index}>
                  <p className="room-header">{room}</p>
                  <div className="plants-by-room-container">
                    {filteredPlants &&
                      filteredPlants.map((filteredPlant, plantIndex) => (
                        <SinglePlantRooms
                          className="single-plant-room"
                          key={plantIndex}
                          plant={filteredPlant}
                          rooms={rooms}
                          token={token}
                          getUserPlants={getUserPlants}
                          getUserRooms={getUserRooms}
                        ></SinglePlantRooms>
                      ))}
                  </div>
                </div>
              );
            })}
        </div>
        <div className="all-plants-container">
          <h1>Wszystkie rośliny</h1>
          <div className="headers-container-all">
            <p className="header-plant-name">Rośliny</p>
          </div>
          {plantsToShow &&
            plantsToShow.map((plant, index) => (
              <SinglePlantAll
                className="single-plant-all"
                key={index}
                plant={plant}
                rooms={rooms}
                token={token}
                getUserRooms={getUserRooms}
              ></SinglePlantAll>
            ))}
        </div>
      </div>
      {isAddRoomVisible && (
        <AddRoom
          setRooms={setRooms}
          setIsAddRoomVisible={setIsAddRoomVisible}
          rooms={rooms}
        ></AddRoom>
      )}
    </>
  );
}
