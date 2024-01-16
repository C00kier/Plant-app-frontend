import { useEffect, useState } from 'react';
import './FirstQuestion.css';

//interfaces
import IAnswers from '../../../../models/interfaces/IAnswers';

export default function FirstQuestion({ answers, setAnswered }:{answers:IAnswers, setAnswered:React.Dispatch<React.SetStateAction<boolean>>}) {
    const [isFirstChecked, setIsFirstChecked] = useState<boolean>(false);
    const [isSecondChecked, setIsSecondChecked] = useState<boolean>(false);
    const [isThirdChecked, setIsThirdChecked] = useState<boolean>(false);
    useEffect(() => {
        if (isFirstChecked || isSecondChecked || isThirdChecked) setAnswered(true);
        if (answers.isSunny === 2) {
            setIsFirstChecked(true);
        } else if (answers.isSunny === 1) {
            setIsSecondChecked(true);
        } else if (answers.isSunny === 0) {
            setIsThirdChecked(true);
        }
    }, [isFirstChecked, isSecondChecked, isThirdChecked])
    
    function manageCheckboxClicks(e: React.ChangeEvent<HTMLInputElement>) {

        answers.isSunny = parseInt(e.target.value);

        if (e.target.name === 'sunny') {
            setIsFirstChecked(true);
            setIsSecondChecked(false);
            setIsThirdChecked(false);
        } else if (e.target.name === 'mid-sunny') {
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
            <div id='first-question-container'>
                <span id='first-question-writing'>Czy przez okna w Twoim mieszkaniu wpada dużo światła?</span>
                <form id='first-question-form'>
                    <div className='first-question-option'>
                        <input type='checkbox' name='sunny' value={2} checked={isFirstChecked} onChange={manageCheckboxClicks}></input>
                        <label htmlFor='sunny'>
                            Do mojego mieszkania wpada bezpośrednie światło<br></br>
                            słoneczne (mieszkanie jest wschodnie lub zachodnie)
                        </label>
                    </div>
                    <div className='first-question-option'>
                        <input type='checkbox' name='mid-sunny' value={1} checked={isSecondChecked} onChange={manageCheckboxClicks}></input>
                        <label htmlFor='mid-sunny'>
                            Do mojego mieszkania nie wpada bezpośrednie światło<br></br>
                            słoneczne, ale mogę je określić jako jasne (północne lub <br></br>
                            południowe)
                        </label>
                    </div>
                    <div className='first-question-option'>
                        <input type='checkbox' name='dark' value={0} checked={isThirdChecked} onChange={manageCheckboxClicks}></input>
                        <label htmlFor='dark'>
                            Moje mieszkanie jest raczej ciemne
                        </label>
                    </div>

                </form>
            </div>
        </>
    )
}