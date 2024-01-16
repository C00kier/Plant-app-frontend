import "./Quiz.css";
import QuizHeader from "./sub/QuizHeader/QuizHeader";
import QuizFooter from "./sub/QuizFooter/QuizFooter";
import FirstQuestion from "./sub/FirstQuestion/FirstQuestion";
import SecondQuestion from "./sub/SecondQuestion/SecondQuestion";
import ThirdQuestion from "./sub/ThirdQuestion/ThirdQuestion";
import FourthQuestion from "./sub/FourthQuestion/FourthQuestion";
import FifthQuestion from "./sub/FifthQuestion/FifthQuestion";
import SixthQuestion from "./sub/SixthQuestion/SixthQuestion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MY_ACCOUNT_COMPONENT_STATES from "../../constants/myAccountComponentStates";

//interfaces
import IAnswers from "../../models/interfaces/IAnswers";

export default function Quiz({
  userId,
  token,
  setFunctionalityElement,
}: {
  userId: number;
  token: string;
  setFunctionalityElement: (value: number) => void;
}) {
  const navigate = useNavigate();
  const [isCurrentQuestionAnswered, setIsCurrentQuestionAnswered] =
    useState<boolean>(false);
  const [index, setIndex] = useState<number>(1);
  const [hasAnimals, setHasAnimals] = useState<boolean>();
  const [hasChildren, setHasChildren] = useState<boolean>();
  const [wasQuizFinished, setWasQuizFinished] = useState<boolean>(false);
  const [answers, setAnswers] = useState<IAnswers>({
    isToxic: false,
    isSunny: -1,
    isAirPurifying: false,
    matureSize: -1,
    difficulty: -1,
    userId: userId,
  });

  function manageIndex(e: React.MouseEvent<HTMLDivElement|HTMLSpanElement, MouseEvent>) {
    setIsCurrentQuestionAnswered(false);
    if (
      (e.currentTarget.id === "prev-button" || e.currentTarget.id === "back") &&
      index > 1
    ) {
      setIndex(index - 1);
    } else if (
      (e.currentTarget.id === "next-button" || e.currentTarget.id === "next") &&
      index < 6
    ) {
      setIndex(index + 1);
    }
  }

  async function submit() {
    answers.isToxic = hasAnimals && hasChildren;
    const response = await fetch(
      `http://localhost:8080/quiz/set-quiz-result?isToxic=${answers.isToxic}&isSunny=${answers.isSunny}&isAirPurifying=${answers.isAirPurifying}
        &matureSize=${answers.matureSize}&difficulty=${answers.difficulty}&userId=${answers.userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(answers),
      }
    );
    manageQuizCompletion();
  }

  function manageQuizCompletion() {
    setFunctionalityElement(MY_ACCOUNT_COMPONENT_STATES.RECOMMENDATION);
  }

  function renderSwitch(index: number) {
    switch (index) {
      case 1:
        return (
          <FirstQuestion
            answers={answers}
            setAnswered={setIsCurrentQuestionAnswered}
          ></FirstQuestion>
        );
      case 2:
        return (
          <SecondQuestion
            answers={answers}
            setAnswered={setIsCurrentQuestionAnswered}
          ></SecondQuestion>
        );
      case 3:
        return (
          <ThirdQuestion
            answers={answers}
            setAnswered={setIsCurrentQuestionAnswered}
          ></ThirdQuestion>
        );
      case 4:
        return (
          <FourthQuestion
            answers={answers}
            setAnswered={setIsCurrentQuestionAnswered}
          ></FourthQuestion>
        );
      case 5:
        return (
          <FifthQuestion
            answers={answers}
            setAnswered={setIsCurrentQuestionAnswered}
            setHasAnimals={setHasAnimals}
            hasAnimals={hasAnimals}
          ></FifthQuestion>
        );
      case 6:
        return (
          <SixthQuestion
            answers={answers}
            setAnswered={setIsCurrentQuestionAnswered}
            setHasChildren={setHasChildren}
            hasChildren={hasChildren}
          ></SixthQuestion>
        );
    }
  }
  return (
    <>
      {/* {wasQuizFinished ?

                <div id='quiz-complete-container'>
                    <div id="quiz-complete-popup">
                        <div id="quiz-complete-image"></div>
                        <div id="quiz-complete-communicate-container">
                            <span id="quiz-complete-communicate">
                                Dziękujemy za wypełnienie quizu!<br></br>
                                <span>Teraz możesz zobaczyć które kwiatki będą pasować do Twojego domu.</span>
                            </span>
                        </div>
                    </div>
                </div> : <></>} */}
      <div id="quiz-container">
        <QuizHeader index={index}></QuizHeader>
        <div id="quiz-main">{renderSwitch(index)}</div>
        <QuizFooter
          manageIndex={manageIndex}
          index={index}
          submit={submit}
          isCurrentQuestionAnswered={isCurrentQuestionAnswered}
        ></QuizFooter>
      </div>
    </>
  );
}
