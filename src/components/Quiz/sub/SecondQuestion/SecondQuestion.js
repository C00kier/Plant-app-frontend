import './SecondQuestion.css';
import { useState } from 'react';

export default function SecondQuestion({answers}){
    const [isFirstChecked, setIsFirstChecked] = useState(false);
    const [isSecondChecked, setIsSecondChecked] = useState(false);
    const [isThirdChecked, setIsThirdChecked] = useState(false);
    function manageCheckboxClicks(e) {
        answers.matureSize = e.target.value;
        if (e.target.name == 'small') {
            setIsFirstChecked(true);
            setIsSecondChecked(false);
            setIsThirdChecked(false);
        } else if (e.target.name == 'medium') {
            setIsFirstChecked(false);
            setIsSecondChecked(true);
            setIsThirdChecked(false);
        } else {
            setIsFirstChecked(false);
            setIsSecondChecked(false);
            setIsThirdChecked(true);
        }
    }
    return (
        <>
            <div id='second-question-container'>
            <span id='second-question-writing'>Ile miejsca masz dostępnego na rośliny doniczkowe?</span>
            <form id='second-question-form'>
                    <div className='second-question-option'>
                        <input type='checkbox' name='small' value={0} checked={isFirstChecked} onClick={manageCheckboxClicks}></input>
                        <label for='small'>
                            Mieszkam w bloku, w mieszkaniu 1-2 pokojowym
                        </label>
                    </div>
                    <div className='second-question-option'>
                        <input type='checkbox' name='medium' value={1} checked={isSecondChecked} onClick={manageCheckboxClicks}></input>
                        <label for='medium'>
                            Mieszkam w bloku, w mieszkaniu 3+ pokojowym
                        </label>
                    </div>
                    <div className='second-question-option'>
                        <input type='checkbox' name='big' value={2} checked={isThirdChecked} onClick={manageCheckboxClicks}></input>
                        <label for='big'>
                            Mieszkam w domu
                        </label>
                    </div>

                </form>
            </div>
        </>
    )
}