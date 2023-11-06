import './SinglePlantResult.css'
import { useNavigate } from 'react-router-dom';

export default function SinglePlantResult({plantImageUrl,plantName,id}){
    const navigate = useNavigate();
    const navigateToPlant=()=>{
        navigate("/plant/"+id);
    }
    return (
        <>
            <div className='single-plant' onClick={navigateToPlant}>
                <div className='plant-image'>

                </div>
                <div className='plant-name'>
                    <span>{plantName}</span>
                </div>
            </div>
        </>
    )
}