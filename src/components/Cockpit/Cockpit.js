import { useState } from "react";
import CockpitWithPlants from "./CockpitWithPlants";
import CockpitNoPlants from "./CockpitNoPlants";

export default function Cockpit() {
    const [numberOfPlants, setNumberOfPlants] = useState(0);

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