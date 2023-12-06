import './FourthQuestion.css';
import { useState } from 'react';
import { useEffect } from 'react';

export default function FourthQuestion({answers,setAnswered}){
    const [isFirstChecked, setIsFirstChecked] = useState(false);
    const [isSecondChecked, setIsSecondChecked] = useState(false);
    useEffect(()=>{
        if(isFirstChecked || isSecondChecked) setAnswered(true);
        if(answers.isAirPurifying=='true'){
            setIsFirstChecked(true);
        }else if(answers.isAirPurifying=='false'){
            setIsSecondChecked(true);
        }
    },[isFirstChecked,isSecondChecked])

    function manageCheckboxClicks(e) {
        answers.isAirPurifying = e.target.value;
        if (e.target.name == 'yes') {
            setIsFirstChecked(true);
            setIsSecondChecked(false);
        } else if (e.target.name == 'no') {
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
                        <input type='checkbox' name='yes' value={true} checked={isFirstChecked} onChange={manageCheckboxClicks}></input>
                        <label htmlFor='yes'>
                            Tak
                        </label>
                    </div>
                    <div className='fourth-question-option'>
                        <input type='checkbox' name='no' value={false} checked={isSecondChecked} onChange={manageCheckboxClicks}></input>
                        <label htmlFor='no'>
                            Nie
                        </label>
                    </div>
                </form>
            </div>
        </>)
}