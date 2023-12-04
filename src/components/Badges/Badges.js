import React, { useState, useEffect } from "react";
import "./Badges.css";

export default function UserScore({ userId, token }) {
    const [experience, setExperience] = useState(null);
    const [gameTitle, setGameTitle] = useState(null);
    const [pointsLeft, setPointsLeft] = useState(null);
    const [plantImage, setPlantImage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [experienceResponse, gameTitleResponse, pointsLeftResponse] =
                    await Promise.all([
                        fetch(`${process.env.REACT_APP_BASE_URL}user-game-progress/get-exp?userId=${userId}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }),
                        fetch(`${process.env.REACT_APP_BASE_URL}user-game-progress/get-game-title?userId=${userId}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }),
                        fetch(`${process.env.REACT_APP_BASE_URL}user-game-progress/get-exp-left?userId=${userId}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }),
                    ]);

                if (experienceResponse.ok) {
                    const data = await experienceResponse.json();
                    setExperience(data);
                } else {
                    console.error("Failed to fetch user experience");
                }

                if (gameTitleResponse.ok) {
                    const data = await gameTitleResponse.text();
                    setGameTitle(data);
                    setPlantImage(require(`../../assets/gameProgress/${data}.png`));
                } else {
                    console.error("Failed to fetch user game title");
                }

                if (pointsLeftResponse.ok) {
                    const data = await pointsLeftResponse.json();
                    setPointsLeft(data);
                } else {
                    console.error("Failed to fetch points left");
                }
            } catch (error) {
                console.error("Error during fetch:", error);
            }
        };

        fetchData();
    }, [userId, token]);

    return (
        <>
            <div className="user-game-progress-div">
                <div className="score-div">
                    <div className="score-text-div">
                        <h1>Score: {experience}</h1>
                    </div>
                    <div className="user-game-title-div">
                        <h1>
                            {gameTitle &&
                                gameTitle
                                    .split("_")
                                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                                    .join(" ")}
                        </h1>
                        <h5>Brakuje Ci {pointsLeft} pkt do kolejnego poziomu</h5>
                    </div>
                </div>
                <div className="growing-plant-div">
                    <img src={plantImage} alt="Plant" />
                </div>
            </div>
        </>
    );
}
