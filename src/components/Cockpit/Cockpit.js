import { useState } from "react";
import CockpitWithPlants from "./CockpitWithPlants";
import CockpitNoPlants from "./CockpitNoPlants";

export default function Cockpit() {
    const [numberOfPlants, setNumberOfPlants] = useState(0);

    // useEffect(() => {
    //     try {
    //         (async () => {
    //             const response = await fetch(`http://localhost:8080/plant`);
    //             const data = await response.json();
    //             setAllPlants(data);
    //         })();
    //     } catch (error) {
    //         console.error(`Error fetching data:${error}`)
    //     }
    // }, []);

    return (
        <>
            {
                numberOfPlants > 0
                    ? <CockpitWithPlants />
                    : <CockpitNoPlants />
            }
        </>
    )
}