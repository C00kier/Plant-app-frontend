import "./FifthQuestion.css";
import { useState } from "react";
import { useEffect } from "react";

//interfaces
import IAnswers from "../../../../models/interfaces/IAnswers";

export default function FifthQuestion({
  answers,
  setAnswered,
  setHasAnimals,
  hasAnimals,
}: {
  answers: IAnswers;
  setAnswered: React.Dispatch<React.SetStateAction<boolean>>;
  setHasAnimals: React.Dispatch<React.SetStateAction<boolean|undefined>>;
  hasAnimals: boolean|undefined;
}) {
  const [isFirstChecked, setIsFirstChecked] = useState<boolean>(false);
  const [isSecondChecked, setIsSecondChecked] = useState<boolean>(false);
  useEffect(() => {
    if (isFirstChecked || isSecondChecked) setAnswered(true);
    if (hasAnimals === true) {
      setIsSecondChecked(true);
    } else if (hasAnimals === false) {
      setIsFirstChecked(true);
    }
  }, [isFirstChecked, isSecondChecked]);

  function manageCheckboxClicks(e: React.ChangeEvent<HTMLInputElement>) {
    setHasAnimals(e.target.value === "true");
    if (e.target.name === "yes") {
      setIsFirstChecked(true);
      setIsSecondChecked(false);
    } else if (e.target.name === "no") {
      setIsFirstChecked(false);
      setIsSecondChecked(true);
    }
  }
  return (
    <>
      <div id="fifth-question-container">
        <span id="fifth-question-writing">Czy masz w domu małe dzieci?</span>
        <form id="fifth-question-form">
          <div className="fifth-question-option">
            <input
              type="checkbox"
              name="yes"
              value={String(false)}
              checked={isFirstChecked}
              onChange={manageCheckboxClicks}
            ></input>
            <label htmlFor="yes">Tak</label>
          </div>
          <div className="fifth-question-option">
            <input
              type="checkbox"
              name="no"
              value={String(true)}
              checked={isSecondChecked}
              onChange={manageCheckboxClicks}
            ></input>
            <label htmlFor="no">Nie</label>
          </div>
        </form>
      </div>
    </>
  );
}
