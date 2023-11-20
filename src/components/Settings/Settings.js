import "./Settings.css";

import COMPONENT_STATE from "../../constants/myAccountComponentStates.js";

import userIconImage from "../../../src/assets/user/user-circle.256x256.png";
import { useState } from "react";
import eyeShow from "../../assets/RegisterPage/eyeShow.png";
import eyeHide from "../../assets/RegisterPage/eyeHide.png";

export default function Settings({ setFunctionalityElement }) {
  const [nickname, setNickname] = useState(null);
  const [email, setEmail] = useState(null);
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  function handlePasswordClick() {
    if (oldPassword === newPassword) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  }

  function eyeIconEvent() {
    setIsPasswordShown(!isPasswordShown);
  }

  return (
    <>
      <div className="settings-container">
        <h1 className="setting-title">Ustawienia</h1>
        <p className="change-text">Zmień zdjęcie profilowe</p>
        <img src={userIconImage} />
        <div className="confirm-button">
          <span>Zmień</span>
        </div>
        <p className="change-text">Zmień pseudonim</p>
        <input
          className="change-input"
          placeholder="Nowy pseudonim"
          type="text"
          onChange={(e) => setNickname(e.target.value)}
        ></input>
        <div className="confirm-button">
          <span>Zmień</span>
        </div>
        <p className="change-text">Zmień email</p>
        <input
          className="change-input"
          placeholder="Nowy email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <div className="confirm-button">
          <span>Zmień</span>
        </div>

        <p className="change-text">Zmień hasło</p>
        <div className="new-password-input-container">
          <input
            className="change-input"
            placeholder="Stare hasło"
            type={isPasswordShown ? "text" : "password"}
            onChange={(e) => setOldPassword(e.target.value)}
          ></input>
          <img
            className={isPasswordShown ? "eye-icon-2" : "eye-icon-1"}
            src={isPasswordShown ? eyeHide : eyeShow}
            onClick={() => eyeIconEvent()}
            alt=""
          />
        </div>
        <div className="new-password-input-container">
          <input
            className="change-input"
            placeholder="Nowe hasło"
            type={isPasswordShown ? "text" : "password"}
            onChange={(e) => setNewPassword(e.target.value)}
          ></input>
          <img
            className={isPasswordShown ? "eye-icon-2" : "eye-icon-1"}
            src={isPasswordShown ? eyeHide : eyeShow}
            onClick={() => eyeIconEvent()}
            alt=""
          />
        </div>
        <p
          className={
            isPasswordValid
              ? "password-alert-invisible"
              : "password-alert-visible"
          }
        >
          *Hasła nie pokrywają się
        </p>
        <div className="confirm-button" onClick={handlePasswordClick}>
          <span>Zmień</span>
        </div>

        <p className="change-text">Zauktualizuj quiz</p>
        <p className="info-text">
          Zdajemy sobie sprawę, że Twoje życie może często się zmieniać, jak
          potrzeby Twoich roślin. Wypełnij jeszcze raz quiz, aby uzyskać nową
          rekomendację roślin.{" "}
        </p>
        <div
          className="confirm-button"
          onClick={() => setFunctionalityElement(COMPONENT_STATE.QUIZ)}
        >
          <span>Zaktualizuj</span>
        </div>
        <p className="change-text">Usuń konto</p>
        <p className="info-text">
          Usuwając konto z naszego serwisu utracisz wszystkie zapisane dane, w
          tym nformacje o swoich kwiatkach oraz wszystkie zdobyte odznaki.
        </p>
        <div className="confirm-button">
          <span>Usuń</span>
        </div>
      </div>
    </>
  );
}
