import "./RestorePassword.css";
import { useState } from "react";

export default function RestorePassword({close}) {
    const [displayInvalidEmail,setDisplayInvalidEmail]=useState("none");
    function handleIvalidEmailDisplay(e){
        setDisplayInvalidEmail("none");
        if(!e.target.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && e.target.value.length!==0){
            setDisplayInvalidEmail("block");
        }
    }


    return (
        <>
            <div id="background-shade">
                <div id="restore-password-container">
                    
                    <div id="restore-password-close-bttn" onClick={()=>close()}></div>
                    <span>Podaj swój email a wyślemy Ci link do zmiany hasła</span>
                    
                    <input onChange={(e)=>{handleIvalidEmailDisplay(e)}} type="email" id="restore-password-email"></input>
                    <div id="restore-password-bttn">
                        <span>
                            Wyslij link!
                        </span>
                    </div>
                    <span id="email-invalid-communicate" style={{display:displayInvalidEmail}}>E-mail nie poprawny!</span>
                </div>
            </div>
        </>
    )
}