import { useState, useEffect } from "react";
import "./Badges.css";
import ICookie from "../../models/interfaces/ICookie";

export default function UserScore({ userId, token }: ICookie) {
    const [experience, setExperience] = useState<string | null>(null);
    const [gameTitle, setGameTitle] = useState<string | null>(null);
    const [pointsLeft, setPointsLeft] = useState<string | null>(null);
    const [plantImage, setPlantImage] = useState<string>("");
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [experienceResponse, gameTitleResponse, pointsLeftResponse] =
                    await Promise.all([
                        fetch(`${BASE_URL}/user-game-progress/get-exp?userId=${userId}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }),
                        fetch(`${BASE_URL}/user-game-progress/get-game-title?userId=${userId}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }),
                        fetch(`${BASE_URL}/user-game-progress/get-exp-left?userId=${userId}`, {
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
