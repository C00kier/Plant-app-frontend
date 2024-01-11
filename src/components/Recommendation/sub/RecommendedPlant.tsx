import './RecommendedPlant.css';
import { useEffect, useState } from 'react';

export default function RecommendedPlant({ plant, quiz,open }) {
    const [backgroundImage, setBackgroundImage] = useState();
    const [sunIcon, setSunIcon] = useState();
    const [sizeIcon, setSizeIcon] = useState();
    const [difficultyIcon, setDifficultyIcon] = useState();  

    useEffect(() => {
        if (plant !== undefined) {
            try {
                setBackgroundImage(require("../../../assets/plants/" + plant.botanicalName.replace(/\s/g, "-") + "-image.jpg"));
            } catch (e) {
                setBackgroundImage(require("../../../assets/common/blank.png"));
            }
            setSunIcon(require("../../../../public/icon/sun-icon-" + quiz.sun + ".png"));
            setSizeIcon(require("../../../../public/icon/size-icon-" + quiz['mature_size'] + ".png"))
            setDifficultyIcon(require("../../../../public/icon/difficulty-icon-" + quiz['care_difficulty'] + ".png"))
        }
    }, [plant])

    return (
        <>
            <div className='recommended-plant'>
                <div className='recommended-plant-data-container'>
                    <div className='recommended-plant-picture' style={{ backgroundImage: `url(${backgroundImage})` }}>

                    </div>
                    <div className='recommended-plant-name-container'>
                        <span className='recommended-plant-name'>
                            {plant.botanicalName}
                        </span>
                    </div>
                </div>
                <div className='icon-container-recommended' style={{ backgroundImage: `url(${sunIcon})` }}>

                </div>
                <div className='icon-container-recommended' style={{ backgroundImage: `url(${sizeIcon})` }}>

                </div>
                <div className='icon-container-recommended' style={{ backgroundImage: `url(${difficultyIcon})` }}>

                </div>
                <div className={quiz["air_purifying"] ? "icon-container-recommended checkmark-icon" : "icon-container-recommended cross-icon"}>

                </div>
                <div className={quiz["air_purifying"] ? "icon-container-recommended checkmark-icon" : "icon-container-recommended cross-icon"}>

                </div>
                <div className='recommeneded-plant-add-button add-icon icon-container-recommended' id={plant.id} onClick={(e)=>open(e,backgroundImage,plant.botanicalName)}>

                </div>
            </div>
        </>
    )
}