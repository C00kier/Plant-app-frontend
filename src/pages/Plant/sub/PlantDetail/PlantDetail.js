import { useEffect } from 'react'
import './PlantDetail.css'
import { useState } from 'react';

export default function PlantDetail({detailName,description}){
    const [formattedDescription,setFormattedDescription]=useState(description);
    useEffect(()=>{
        if(description!==undefined){
            setFormattedDescription(String(formattedDescription).replaceAll("/","\n"));
        }
    },[description])
    
    return (<>
        <div className="plant-detail">
            <div className="plant-detail-left">
                <span className="detail-name">
                    {detailName}
                </span>
            </div>
            <div className="plant-detail-right">
                <span className="detail-description" >
                    {formattedDescription}
                </span>
            </div>
        </div>
    </>)
}

