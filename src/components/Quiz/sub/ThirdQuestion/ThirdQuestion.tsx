import './ThirdQuestion.css'
import { useState } from 'react';
import { useEffect } from 'react';

//interfaces
import IAnswers from '../../../../models/interfaces/IAnswers';

export default function ThirdQuestion({ answers,setAnswered}:{answers:IAnswers, setAnswered:React.Dispatch<React.SetStateAction<boolean>>}) {
    const [isFirstChecked, setIsFirstChecked] = useState<boolean>(false);
    const [isSecondChecked, setIsSecondChecked] = useState<boolean>(false);
    const [isThirdChecked, setIsThirdChecked] = useState<boolean>(false);
    useEffect(()=>{
        if(isFirstChecked || isSecondChecked || isThirdChecked) setAnswered(true);
        if(answers.difficulty===0){
            setIsFirstChecked(true);
        }else if(answers.difficulty===1){
            setIsSecondChecked(true);
        }else if(answers.difficulty===2){
            setIsThirdChecked(true);
        }
    },[isFirstChecked,isSecondChecked,isThirdChecked])

    function manageCheckboxClicks(e: React.ChangeEvent<HTMLInputElement>) {
        answers.difficulty = parseInt(e.target.value);
        if (e.target.name === 'small') {
            setIsFirstChecked(true);
            setIsSecondChecked(false);
            setIsThirdChecked(false);
        } else if (e.target.name === 'medium') {
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
                        <input type='checkbox' name='small' value={0} checked={isFirstChecked} onChange={manageCheckboxClicks}></input>
                        <label htmlFor='easy'>
                            Jestem początkującym ogrodnikiem
                        </label>
                    </div>
                    <div className='third-question-option'>
                        <input type='checkbox' name='medium' value={1} checked={isSecondChecked} onChange={manageCheckboxClicks}></input>
                        <label htmlFor='medium'>
                            Mam już doświadczenie w pielęgnacji roślin
                        </label>
                    </div>
                    <div className='third-question-option'>
                        <input type='checkbox' name='big' value={2} checked={isThirdChecked} onChange={manageCheckboxClicks}></input>
                        <label htmlFor='hard'>
                            Jestem ekspertem w pielęgnacji roślin
                        </label>
                    </div>

                </form>
            </div>
        </>
    )
}