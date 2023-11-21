import './SixthQuestion.css';
import { useState } from 'react';

export default function SixthQuestion({answers}){
    const [isFirstChecked, setIsFirstChecked] = useState(false);
    const [isSecondChecked, setIsSecondChecked] = useState(false);
    function manageCheckboxClicks(e) {
        answers.isToxic = e.target.value;
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
            <div id='sixth-question-container'>
                <span id='sixth-question-writing'>Czy masz w domu zwierzęta?</span>
                <form id='sixth-question-form'>
                    <div className='sixth-question-option'>
                        <input type='checkbox' name='yes' value={false} checked={isFirstChecked} onClick={manageCheckboxClicks}></input>
                        <label for='yes'>
                            Tak
                        </label>
                    </div>
                    <div className='sixth-question-option'>
                        <input type='checkbox' name='no' value={true} checked={isSecondChecked} onClick={manageCheckboxClicks}></input>
                        <label for='no'>
                            Nie
                        </label>
                    </div>
                </form>
            </div>
        </>)
}