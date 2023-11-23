import './AddPlant.css';
import { useState } from 'react';
import { useEffect } from 'react';

export default function AddPlant({ close, token, userId, plantId, name, rooms }) {
    const [todaysDate, setTodaysDate] = useState(getCurrentDate());
    const [alias, setAlias] = useState(name);
    const [lastWater, setLastWater] = useState();
    const [lastFertilizer, setLastFertilizer] = useState();
    const [lastRepotted, setLastRepotted] = useState();
    const [image, setImage] = useState();
    const [wasPlantAdded, setWasPlantAdded] = useState(false);
    useEffect(() => {
        if (name !== undefined) {
            try {
                setImage(require("../../assets/plants/" + name.replace(/\s/g, "-") + "-image.jpg"));
            } catch (e) {
                setImage(require("../../assets/common/blank.png"));
            }
        }
    }, [name])

    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = today.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }

    function manageFertilizerDate(e) {
        if (e.target.value === null) {
            setLastFertilizer(null);
        } else if (e.target.value === '-20') {
            const result = new Date(getCurrentDate());
            result.setDate(result.getDate() - 20);
            setLastFertilizer(result);
        } else if (e.target.value === '-100') {
            const result = new Date(getCurrentDate());
            result.setDate(result.getDate() - 100);
            setLastFertilizer(result);
        }
    }

    function manageReportDate(e) {
        if (e.target.value === null) {
            setLastRepotted(null);
        } else if (e.target.value === '-365') {
            const result = new Date(getCurrentDate());
            result.setDate(result.getDate() - 365);
            setLastRepotted(result);
        } else if (e.target.value === '-1000') {
            const result = new Date(getCurrentDate());
            result.setDate(result.getDate() - 1000);
            setLastRepotted(result);
        }
    }

    async function submit() {
        console.log(lastWater);
        const response = await fetch("http://localhost:8080/user-plant/add", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                user: {
                    userId: userId
                },
                plant: {
                    plantId: plantId
                },
                alias: alias,
                lastWater: new Date(lastWater),
                lastFertilizer: lastFertilizer,
                lastRepotted: lastRepotted
            })
        })

        setWasPlantAdded(true);
        setTimeout(() => {
            close();
        }, 1000);

    }

    return (<>
        <div id='background-shade'>
            {wasPlantAdded ?
                <div id='add-plant-container'>
                    <div id='plant-added-image'></div>
                    <div id='plant-added-message-container'>
                        <span id='plant-added-message'>Dodano roślinę!</span>
                    </div>
                </div>
                :
                <div id='add-plant-container'>
                    <div id='add-plant-message-container'>
                        <span id='add-plant-message'>Dodaj roślinę</span>
                    </div>
                    <div id='add-plant-main-container'>
                        <div id='add-plant-left'>
                            <div id='add-plant-image' style={{ backgroundImage: `url(${image})` }}>

                            </div>
                            <div id='add-plant-name-container'>
                                <span id='add-plant-name'>
                                    {name}
                                </span>
                            </div>
                        </div>
                        <div id='add-plant-right'>

                            <div id="restore-password-close-bttn" onClick={close}></div>
                            <div id='room-container' className='add-plant-input-container'>
                                <span>Pokój (opcjonalnie):</span>
                                <select id='room-input' className='add-plant-input-dropdown' disabled={!rooms.length === 0}>
                                    {
                                        rooms.map(room=><option value={room}>{room}</option>)
                                    }
                                </select>
                            </div>
                            <div id='last-water-container' className='add-plant-input-container'>
                                <span>Ostatnio podlewane:</span>
                                <input type='date' onChange={(e) => setLastWater(e.target.value)} defaultValue={todaysDate} id='last-water-input'></input>
                            </div>
                            <div id='last-fertilizer-container' className='add-plant-input-container'>
                                <span>Ostatnie nawożenie: </span>
                                <select id='last-fertilizer-input' className='add-plant-input-dropdown' onChange={(e) => manageFertilizerDate(e)}>
                                    <option value={null}>Nigdy</option> //null
                                    <option value={'-20'}>W ciągu ostatniego miesiąca</option> //-20 dni
                                    <option value={'-100'}>Dłużej niż miesiąc temu</option> //-100 dni
                                </select>
                            </div>
                            <div id='last-repotted-container' className='add-plant-input-container'>
                                <span>Ostatnie przesadzenie:</span>
                                <select id='last-repotted-input' className='add-plant-input-dropdown' onChange={(e) => manageReportDate(e)}>
                                    <option value={null}>Nigdy</option>//null
                                    <option value={'-365'}>W ciągu ostatniego roku</option>//-365 dni
                                    <option value={'-1000'}>Dłużej niż rok temu</option> //-1000dni
                                </select>
                            </div>
                            <div id='alias-container' className='add-plant-input-container'>
                                <span>Nazwa rośliny (opcjonalnie): </span>
                                <input type='text' placeholder={name} onChange={(e) => setAlias(e.target.value)} id='alias-input'></input>
                            </div>

                        </div>
                    </div>
                    <div id='add-plant-bttn-container'>
                        <div id='add-plant-bttn' onClick={submit}>
                            <span id='add-plant-bttn-message' onClick={submit}>Dodaj roślinę</span>
                        </div>
                    </div>

                </div>
            }
        </div>
    </>)
}