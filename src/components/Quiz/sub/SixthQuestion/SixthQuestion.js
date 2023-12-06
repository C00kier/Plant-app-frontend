import "./SixthQuestion.css";
import { useState } from "react";
import { useEffect } from "react";

export default function SixthQuestion({
  answers,
  setAnswered,
  setHasChildren,
  hasChildren,
}) {
  const [isFirstChecked, setIsFirstChecked] = useState(false);
  const [isSecondChecked, setIsSecondChecked] = useState(false);
  useEffect(() => {
    if (isFirstChecked || isSecondChecked) setAnswered(true);
    if (hasChildren == "true") {
      setIsSecondChecked(true);
    } else if (hasChildren == "false") {
      setIsFirstChecked(true);
    }
  }, [isFirstChecked, isSecondChecked]);

  function manageCheckboxClicks(e) {
    setHasChildren(e.target.value);
    if (e.target.name == "yes") {
      setIsFirstChecked(true);
      setIsSecondChecked(false);
    } else if (e.target.name == "no") {
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
              value={false}
              checked={isFirstChecked}
              onChange={manageCheckboxClicks}
            ></input>
            <label htmlFor="yes">Tak</label>
          </div>
          <div className="sixth-question-option">
            <input
              type="checkbox"
              name="no"
              value={true}
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
