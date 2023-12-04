import { useContext, useEffect, useState } from "react";
import CockpitWithPlants from "./CockpitWithPlants";
import CockpitNoPlants from "./CockpitNoPlants";

//context import
import { cookiesContext } from "../../App";

export default function Cockpit() {
    const cookies = useContext(cookiesContext);
    const [userPlants, setUserPlants] = useState([]);

    useEffect(() => {
        try {
            (async () => {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}user-plant/${cookies.userId}`
                , {
                    method: "GET",
                    headers: 
                    {"Content-Type" : "application/json",
                    "Authorization" : `Bearer ${cookies.token}`}
                });
                if(response.status === 200){
                    const data = await response.json();
                    setUserPlants(data);
                }
            })();
        } catch (error) {
            console.error(`Error fetching data: ${error}`);
        }
    }, []);


    return (
        <>
            {
                userPlants.length > 0
                    ? <CockpitWithPlants userPlants={userPlants}/>
                    : <CockpitNoPlants />
            }
        </>
    )
}