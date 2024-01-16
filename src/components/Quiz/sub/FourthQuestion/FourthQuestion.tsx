import './FourthQuestion.css';
import { useState } from 'react';
import { useEffect } from 'react';

//interfaces
import IAnswers from '../../../../models/interfaces/IAnswers';

export default function FourthQuestion({answers,setAnswered}:{answers:IAnswers, setAnswered:React.Dispatch<React.SetStateAction<boolean>>}){
    const [isFirstChecked, setIsFirstChecked] = useState<boolean>(false);
    const [isSecondChecked, setIsSecondChecked] = useState<boolean>(false);
    useEffect(()=>{
        if(isFirstChecked || isSecondChecked) setAnswered(true);
        if(answers.isAirPurifying === true){
            setIsFirstChecked(true);
        }else if(answers.isAirPurifying===false){
            setIsSecondChecked(true);
        }
    },[isFirstChecked,isSecondChecked])

    function manageCheckboxClicks(e: React.ChangeEvent<HTMLInputElement>) {
        answers.isAirPurifying = e.target.value === "true";
        if (e.target.name === 'yes') {
            setIsFirstChecked(true);
            setIsSecondChecked(false);
        } else if (e.target.name === 'no') {
            setIsFirstChecked(false);
            setIsSecondChecked(true);
        } 
    }
    return (
        <>
            <div id='fourth-question-container'>
                <span id='fourth-question-writing'>Czy wybierając rośliny interesuje Cię jej zdolność oczyszczania powietrza?</span>
                <form id='fourth-question-form'>
                    <div className='fourth-question-option'>
                        <input type='checkbox' name='yes' value={String(true)} checked={isFirstChecked} onChange={manageCheckboxClicks}></input>
                        <label htmlFor='yes'>
                            Tak
                        </label>
                    </div>
                    <div className='fourth-question-option'>
                        <input type='checkbox' name='no' value={String(false)} checked={isSecondChecked} onChange={manageCheckboxClicks}></input>
                        <label htmlFor='no'>
                            Nie
                        </label>
                    </div>
                </form>
            </div>
        </>)
}