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
                const response = await fetch("http://localhost:8080/user-plants"
                , {
                    method: "POST",
                    headers: 
                    {"Content-Type" : "application/json",
                    Authorization : `Bearer ${cookies.token}`},
                    body: JSON.stringify({userId : cookies.userId})
                }
                );
                console.log(response);
                if(response.status === 200){
                    const data = await response.json();
                    setUserPlants(data);
                    console.log("ok")
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
                    ? <CockpitWithPlants />
                    : <CockpitNoPlants />
            }
        </>
    )
}