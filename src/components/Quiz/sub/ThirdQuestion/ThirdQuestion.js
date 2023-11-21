import './ThirdQuestion.css'
import { useState } from 'react';

export default function ThirdQuestion({ answers }) {
    const [isFirstChecked, setIsFirstChecked] = useState(false);
    const [isSecondChecked, setIsSecondChecked] = useState(false);
    const [isThirdChecked, setIsThirdChecked] = useState(false);
    function manageCheckboxClicks(e) {
        answers.difficulty = e.target.value;
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
            <div id='third-question-container'>
                <span id='third-question-writing'>Jakie są Twoje umiejętności pielęgnacji roślin?</span>
                <form id='third-question-form'>
                    <div className='third-question-option'>
                        <input type='checkbox' name='small' value={0} checked={isFirstChecked} onClick={manageCheckboxClicks}></input>
                        <label for='easy'>
                            Jestem początkującym ogrodnikiem
                        </label>
                    </div>
                    <div className='third-question-option'>
                        <input type='checkbox' name='medium' value={1} checked={isSecondChecked} onClick={manageCheckboxClicks}></input>
                        <label for='medium'>
                            Mam już doświadczenie w pielęgnacji roślin
                        </label>
                    </div>
                    <div className='third-question-option'>
                        <input type='checkbox' name='big' value={2} checked={isThirdChecked} onClick={manageCheckboxClicks}></input>
                        <label for='hard'>
                            Jestem ekspertem w pielęgnacji roślin
                        </label>
                    </div>

                </form>
            </div>
        </>
    )
}