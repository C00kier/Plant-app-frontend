import "./EditPlant.css";
import { useState } from "react";
import { useEffect } from "react";

export default function AddPlant({ close, plant, rooms }) {
  const [todaysDate, setTodaysDate] = useState(getCurrentDate());
  const [alias, setAlias] = useState(plant.alias);
  const [lastWater, setLastWater] = useState();
  const [lastFertilizer, setLastFertilizer] = useState();
  const [lastRepotted, setLastRepotted] = useState();
  const [image, setImage] = useState();
  const [wasPlantAdded, setWasPlantAdded] = useState(false);
  useEffect(() => {
    if (plant.alias !== undefined) {
      try {
        setImage(
          require("../../assets/plants/" +
            plant.alias.replace(/\s/g, "-") +
            "-image.jpg")
        );
      } catch (e) {
        setImage(require("../../assets/common/blank.png"));
      }
    }
  }, [plant.alias]);

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const day = today.getDate().toString().padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  function manageFertilizerDate(e) {
    if (e.target.value === null) {
      setLastFertilizer(null);
    } else if (e.target.value === "-20") {
      const result = new Date(getCurrentDate());
      result.setDate(result.getDate() - 20);
      setLastFertilizer(result);
    } else if (e.target.value === "-100") {
      const result = new Date(getCurrentDate());
      result.setDate(result.getDate() - 100);
      setLastFertilizer(result);
    }
  }

  function manageReportDate(e) {
    if (e.target.value === null) {
      setLastRepotted(null);
    } else if (e.target.value === "-365") {
      const result = new Date(getCurrentDate());
      result.setDate(result.getDate() - 365);
      setLastRepotted(result);
    } else if (e.target.value === "-1000") {
      const result = new Date(getCurrentDate());
      result.setDate(result.getDate() - 1000);
      setLastRepotted(result);
    }
  }

  async function submit() {
    console.log(lastWater);
    const response = await fetch("http://localhost:8080/user-plant/add", {
      // method: 'POST',
      // headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`
      // },
      // body: JSON.stringify({
      //     user: {
      //         userId: userId
      //     },
      //     plant: {
      //         plantId: plantId
      //     },
      //     alias: alias,
      //     lastWater: new Date(lastWater),
      //     lastFertilizer: lastFertilizer,
      //     lastRepotted: lastRepotted
      // })
    });

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
            <div id="plant-edit-image"></div>
            <div id="plant-edit-message-container">
              <span id="plant-edit-message">Zauktualizowano roślinę!</span>
            </div>
          </div>
        ) : (
          <div id="edit-plant-container">
            <div id="edit-plant-message-container">
              <span id="edit-plant-message">Zaktualizuj roślinę</span>
            </div>
            <div id="edit-plant-main-container">
              <div id="restore-password-close-bttn" onClick={close}></div>
              <div id="room-container" className="edit-plant-input-container">
                <span>Pokój (opcjonalnie):</span>
                <select
                  id="room-input"
                  className="edit-plant-input-dropdown"
                  disabled={!rooms.length === 0}
                >
                  {rooms.map((room) => (
                    <option value={room}>
                      {room.charAt(0).toUpperCase() +
                        room.slice(1, room.length)}
                    </option>
                  ))}
                  <option value="">Bez pokoju</option>
                </select>
              </div>
              <div
                id="last-water-container"
                className="edit-plant-input-container"
              >
                <span>Ostatnio podlewane:</span>
                <input
                  type="date"
                  onChange={(e) => setLastWater(e.target.value)}
                  defaultValue={todaysDate}
                  id="last-water-input"
                ></input>
              </div>
              <div
                id="last-fertilizer-container"
                className="edit-plant-input-container"
              >
                <span>Ostatnie nawożenie: </span>
                <select
                  id="last-fertilizer-input"
                  className="edit-plant-input-dropdown"
                  onChange={(e) => manageFertilizerDate(e)}
                >
                  <option value={null}>Nigdy</option>
                  <option value={"-20"}>W ciągu ostatniego miesiąca</option>
                  <option value={"-100"}>Dłużej niż miesiąc temu</option>
                </select>
              </div>
              <div
                id="last-repotted-container"
                className="edit-plant-input-container"
              >
                <span>Ostatnie przesadzenie:</span>
                <select
                  id="last-repotted-input"
                  className="edit-plant-input-dropdown"
                  onChange={(e) => manageReportDate(e)}
                >
                  <option value={null}>Nigdy</option>
                  <option value={"-365"}>W ciągu ostatniego roku</option>
                  <option value={"-1000"}>Dłużej niż rok temu</option>
                </select>
              </div>
              <div id="alias-container" className="edit-plant-input-container">
                <span>Nazwa rośliny (opcjonalnie): </span>
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
