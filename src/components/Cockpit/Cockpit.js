import { useContext, useEffect, useState } from "react";
import CockpitWithPlants from "./CockpitWithPlants";
import CockpitNoPlants from "./CockpitNoPlants";

//context import
import { cookiesContext } from "../../App";

export default function Cockpit() {
    const cookies = useContext(cookiesContext);
    const [userPlants, setUserPlants] = useState([]);

    useEffect(() => {
        (async () => setUserPlants(await fetchUserPlants()))();
    }, []);


    async function fetchUserPlants() {
        try {
            const response = await fetch(`http://localhost:8080/user-plant/${cookies.userId}`
                , {
                    method: "GET",
                    headers:
                    {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${cookies.token}`
                    }
                });
            if (response.status === 200) {
                const data = await response.json();
                return data;
            }
        } catch (error) {
            console.error(`Error fetching data: ${error}`);
        }
    }

    return (
        <>
            {
                userPlants && userPlants.length > 0
                    ? <CockpitWithPlants userPlants={userPlants} />
                    : <CockpitNoPlants />
            }
        </>
    )
}