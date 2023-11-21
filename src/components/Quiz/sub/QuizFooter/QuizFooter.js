import { useEffect } from 'react';
import './QuizFooter.css';

export default function QuizFooter({ manageIndex, index, submit }) {
    useEffect(() => {

    }, [index])
    return (
        <>
            <div id='quiz-footer'>
                <div id='prev-button' className={index == 1 ? 'quiz-nav-button-inactive' : 'quiz-nav-button'} onClick={(e) => manageIndex(e)}>
                    <span id='back' className='quiz-button-writing'>Wstecz</span>
                </div>
                {index != 6 ?
                    <div id='next-button' className={index == 6 ? 'quiz-nav-button-inactive' : 'quiz-nav-button'} onClick={(e) => manageIndex(e)}>
                        <span id='next' className='quiz-button-writing'>Dalej</span>
                    </div>
                    : <div id='submit-button' onClick={submit} className='quiz-nav-button'>
                        <span id='submit' className='quiz-button-writing'>Wyślij!</span>
                    </div>}
            </div>
        </>
    )
}