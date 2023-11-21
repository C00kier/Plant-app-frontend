import "./Quiz.css";
import QuizHeader from "./sub/QuizHeader/QuizHeader";
import QuizFooter from "./sub/QuizFooter/QuizFooter";
import FirstQuestion from "./sub/FirstQuestion/FirstQuestion";
import SecondQuestion from './sub/SecondQuestion/SecondQuestion';
import ThirdQuestion from './sub/ThirdQuestion/ThirdQuestion';
import FourthQuestion from './sub/FourthQuestion/FourthQuestion';
import FifthQuestion from './sub/FifthQuestion/FifthQuestion';
import SixthQuestion from './sub/SixthQuestion/SixthQuestion';

import { useEffect, useState } from "react";

export default function Quiz() {
    const [index, setIndex] = useState(1);
    const [answers, setAnswers] = useState({
        isToxic: 0,
        isSunny: 0,
        isAirPurifying: false,
        matureSize: 0,
        difficulty: 0
    })

    function manageIndex(e) {
        if (e.target.id == 'prev-button' && index > 1) {
            setIndex(index - 1);
        } else if (e.target.id == 'next-button' && index < 6) {
            setIndex(index + 1)
        }
        console.log(answers);
    }

    function renderSwitch(index) {
        switch (index) {
            case 1:
                return <FirstQuestion answers={answers}></FirstQuestion>
            case 2:
                return <SecondQuestion answers={answers}></SecondQuestion>
            case 3:
                return <ThirdQuestion answers={answers}></ThirdQuestion>
            case 4:
                return <FourthQuestion answers={answers}></FourthQuestion>
            case 5:
                return <FifthQuestion answers={answers}></FifthQuestion>
            case 6:
                return <SixthQuestion answers={answers}></SixthQuestion>
        }
    }
    return (
        <>
            <div id="quiz-container">
                <QuizHeader index={index}></QuizHeader>
                <div id="quiz-main">
                    {renderSwitch(index)}
                </div>
                <QuizFooter manageIndex={manageIndex} index={index}></QuizFooter>
            </div>
        </>
    )
}