import "./HomePageLogged.css";

import { useContext, useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//constants
import COMPONENT_STATE from "../../../constants/myAccountComponentStates";

//components
import Cockpit from "../../../components/Cockpit/Cockpit";
import Recommendation from "../../../components/Recommendation/Recommendation";
import MyPlants from "../../../components/MyPlants/MyPlants";
import Badges from "../../../components/Badges/Badges";
import Settings from "../../../components/Settings/Settings";
import Quiz from "../../../components/Quiz/Quiz";
import AccountSidebar from "../../../components/AccountSidebar/AccountSidebar";

//context
import FunctionalityElementContext from "../../../context/FunctionalityElementContext";

export default function HomePageDesktopLogged({ userId, token, removeCookie }) {
  const {functionalityElement, setValue: setFunctionalityElement} = useContext(FunctionalityElementContext);
  const location = useLocation();
  const [userPlants, setUserPlants] = useState();
  const [rooms, setRooms] = useState([]);
  const myPlants = location.state ? location.state.myPlants : false;
  const quiz = location.state ? location.state.quiz : false;

  async function getUserPlants() {
    try {
      const response = await fetch(
        "http://localhost:8080/user-plant/" + userId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.error(
          "Failed to fetch user plants:",
          response.status,
          response.statusText
        );
        return;
      }

      const data = await response.json();
      setUserPlants(data);
    } catch (error) {
      console.error("Error fetching user plants:", error.message);
    }
  }

  function getUserRooms() {
    const userRooms = rooms;
    userPlants.forEach((plant) => {
      if (!userRooms.includes(plant.room) && plant.room !== null) {
        userRooms.push(plant.room);
      }
    });
    setRooms(userRooms);
  }

  useEffect(() => {
    if (myPlants) setFunctionalityElement(COMPONENT_STATE.MY_PLANTS);
  }, [myPlants, quiz]);

  useEffect(() => {
    if (userPlants === undefined) getUserPlants();
    if (userPlants !== undefined) getUserRooms();
  }, [userPlants]);

  function renderFunctionalityElement() {
    switch (functionalityElement) {
      case COMPONENT_STATE.COCKPIT: {
        return <Cockpit />;
      }
      case COMPONENT_STATE.RECOMMENDATION: {
        return <Recommendation userId={userId} token={token} rooms={rooms} />;
      }
      case COMPONENT_STATE.MY_PLANTS: {
        return (
          <MyPlants
            userPlants={userPlants}
            rooms={rooms}
            setRooms={setRooms}
            token={token}
            getUserPlants={getUserPlants}
            getUserRooms={getUserRooms}
          />
        );
      }
      case COMPONENT_STATE.BADGES: {
        return <Badges 
        userId={userId}
        token={token} 
        />;
      }
      case COMPONENT_STATE.SETTINGS: {
        return (
          <Settings
            setFunctionalityElement={setFunctionalityElement}
            userId={userId}
            token={token}
            removeCookie={removeCookie}
          />
        );
      }
      case COMPONENT_STATE.QUIZ: {
        return (
          <Quiz
            userId={userId}
            token={token}
            setFunctionalityElement={setFunctionalityElement}
          />
        );
      }
    }
  }

  return (
    <div className="home-page-logged-container">
        <div className="home-page-logged-content flex-row-center-center">
          <div className="home-page-logged-sidebar-container">
            <AccountSidebar />
          </div>
          <div className="home-page-logged-functionality-container">
            {renderFunctionalityElement()}
          </div>
        </div>
    </div>
  );
}
