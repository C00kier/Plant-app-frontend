import { useEffect } from 'react';
import './QuizFooter.css';
import { useState } from 'react';

export default function QuizFooter({ manageIndex, index, submit, isCurrentQuestionAnswered }) {
    const [isNextButtonActive, setIsNextButtonActive] = useState(false);
    useEffect(() => {

        if (index == 1) setIsNextButtonActive(true);


    }, [index])
    return (
        <>
            <div id='quiz-footer'>
                <div id='prev-button' className={index == 1 ? 'quiz-nav-button-inactive' : 'quiz-nav-button'} onClick={(e) => manageIndex(e)}>
                    <span id='back' className='quiz-button-writing' onClick={(e) => manageIndex(e)}>Wstecz</span>
                </div>
                {index != 6 ?
                    (isCurrentQuestionAnswered ?
                        <div id='next-button' className={index == 6 || !isNextButtonActive ? 'quiz-nav-button-inactive' : 'quiz-nav-button'} onClick={(e) => manageIndex(e)}>
                            <span id='next' className='quiz-button-writing' onClick={(e) => manageIndex(e)}>Dalej</span>
                        </div>
                        :
                        <div id='next-button' className='quiz-nav-button-inactive'>
                            <span id='next' className='quiz-button-writing'>Dalej</span>
                        </div>
                    )
                    : (isCurrentQuestionAnswered ? <div id='submit-button' onClick={submit} className='quiz-nav-button'>
                        <span id='submit' className='quiz-button-writing' >Wyślij!</span>
                    </div> :
                        <div id='next-button' className='quiz-nav-button-inactive'><span id='submit' className='quiz-button-writing'>Wyślij!</span></div>
                    )}
            </div>
        </>
    )
}