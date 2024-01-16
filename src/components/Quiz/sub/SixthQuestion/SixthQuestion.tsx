import "./SixthQuestion.css";
import { useState } from "react";
import { useEffect } from "react";

//interfaces
import IAnswers from "../../../../models/interfaces/IAnswers";

export default function SixthQuestion({
  answers,
  setAnswered,
  setHasChildren,
  hasChildren,
}: {
  answers: IAnswers;
  setAnswered: React.Dispatch<React.SetStateAction<boolean>>;
  setHasChildren: React.Dispatch<React.SetStateAction<boolean|undefined>>;
  hasChildren: boolean|undefined;
}) {
  const [isFirstChecked, setIsFirstChecked] = useState<boolean>(false);
  const [isSecondChecked, setIsSecondChecked] = useState<boolean>(false);
  useEffect(() => {
    if (isFirstChecked || isSecondChecked) setAnswered(true);
    if (hasChildren === true) {
      setIsSecondChecked(true);
    } else if (hasChildren === false) {
      setIsFirstChecked(true);
    }
  }, [isFirstChecked, isSecondChecked]);

  function manageCheckboxClicks(e: React.ChangeEvent<HTMLInputElement>) {
    setHasChildren(e.target.value === "true");
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
      <div id="sixth-question-container">
        <span id="sixth-question-writing">Czy masz w domu zwierzęta?</span>
        <form id="sixth-question-form">
          <div className="sixth-question-option">
            <input
              type="checkbox"
              name="yes"
              value={String(false)}
              checked={isFirstChecked}
              onChange={manageCheckboxClicks}
            ></input>
            <label htmlFor="yes">Tak</label>
          </div>
          <div className="sixth-question-option">
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
