import './FifthQuestion.css';
import { useState } from 'react';
import { useEffect } from 'react';

export default function FifthQuestion({ answers, setAnswered, setHasAnimals,hasAnimals }) {
    const [isFirstChecked, setIsFirstChecked] = useState(false);
    const [isSecondChecked, setIsSecondChecked] = useState(false);
    useEffect(() => {
        if (isFirstChecked || isSecondChecked) setAnswered(true);
        if (hasAnimals == 'true') {
            setIsSecondChecked(true);
        } else if (hasAnimals == 'false') {

            setIsFirstChecked(true);
        }
    }, [isFirstChecked, isSecondChecked])

    function manageCheckboxClicks(e) {
        setHasAnimals(e.target.value);
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
            <div id='fifth-question-container'>
                <span id='fifth-question-writing'>Czy masz w domu małe dzieci?</span>
                <form id='fifth-question-form'>
                    <div className='fifth-question-option'>
                        <input type='checkbox' name='yes' value={false} checked={isFirstChecked} onChange={manageCheckboxClicks}></input>
                        <label htmlFor='yes'>
                            Tak
                        </label>
                    </div>
                    <div className='fifth-question-option'>
                        <input type='checkbox' name='no' value={true} checked={isSecondChecked} onChange={manageCheckboxClicks}></input>
                        <label htmlFor='no'>
                            Nie
                        </label>
                    </div>
                </form>
            </div>
        </>)
}