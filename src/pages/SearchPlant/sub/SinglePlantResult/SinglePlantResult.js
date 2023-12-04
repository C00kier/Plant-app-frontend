import { useEffect } from 'react';
import { useState } from 'react';
import './SinglePlantResult.css'
import { useNavigate } from 'react-router-dom';

export default function SinglePlantResult({ plantName, id }) {
    const [backgroundImage, setBackgroundImage] = useState();
    const navigate = useNavigate();
    const navigateToPlant = () => {
        navigate("/plant/" + id);

    }
    useEffect(() => {
        try{
        setBackgroundImage(require("../../../../assets/plants/" + plantName.replace(/\s/g, "-") + "-image.jpg"));
        }catch(e){
            console.log(e);
        }
    }, [plantName])

    return (
        <>
            <div className='single-plant' onClick={navigateToPlant}>
                <div className='plant-image' style={{ backgroundImage: `url(${backgroundImage})` }}>
                </div>
                <div className='plant-name'>
                    <span>{plantName}</span>
                </div>
            </div>
        </>
    )
}