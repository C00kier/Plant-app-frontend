import './SinglePlantResult.css'

export default function SinglePlantResult({plantImageUrl,plantName}){
    return (
        <>
            <div className='single-plant'>
                <div className='plant-image'>

                </div>
                <div className='plant-name'>
                    <span>{plantName}</span>
                </div>
            </div>
        </>
    )
}