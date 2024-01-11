import "./RegisterPage.css";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import eyeShow from "../../assets/RegisterPage/eyeShow.png";
import eyeHide from "../../assets/RegisterPage/eyeHide.png";
import { useNavigate } from "react-router-dom";
import PAGES from "../../constants/pages";

export default function RegisterPage(props) {
  const { setCookie } = props;
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    acceptRules: false,
  });
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isTermsMpromptShown, setIsTermsMpromptShown] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [areRulesAccepted,setAreRulesAccepted]=useState(false);


  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/login");
  }
  const navigateToHome = () => {
    navigate("/");
  }

  function emailInputChangeEvent(e) {
    const targetValue = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (targetValue.match(emailRegex) && targetValue.length !== 0) {
      setIsEmailValid(true);
      setFormData((prevData) => ({ ...prevData, email: targetValue }));
    } else {
      setIsEmailValid(false);
    }
  }

  function passwordInputChangeEvent(e) {
    const targetValue = e.target.value;
    var regexPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])([a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,16})$/;

    if (targetValue.match(regexPattern) && targetValue.length !== 0 && targetValue.length>=8) {
      setIsPasswordValid(true);
      console.log('ok');
      setFormData((prevData) => ({ ...prevData, password: targetValue }));
    } else {
      setIsPasswordValid(false);
    }
  }


  function eyeIconEvent() {
    setIsPasswordShown(!isPasswordShown);
  }

  const handleAcceptRules = () => {
    setFormData((prevData) => ({ ...prevData, acceptRules: !prevData.acceptRules }));
    setAreRulesAccepted(!areRulesAccepted);
    if(areRulesAccepted===false) setIsTermsMpromptShown(false);
  };

  const handleRegisterClick = () => {
    const requestData = {
      email: formData.email,
      password: formData.password,
    };
    if (areRulesAccepted && isEmailValid===true && isPasswordValid===true) {
      fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => {

          if (response.status === 200) navigateToHome();
          return response.json();
        })
        .then((data) => {
          setCookie("token", data.token, { path: "/" });
          setCookie("userId", data.userId, { path: "/" });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    else {
      if(!areRulesAccepted) setIsTermsMpromptShown(true);
    }
  };
  const handleGoogleSignIn = (request) => {
    fetch(`${BASE_URL}/auth/authenticate/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })
      .then((response) => {
        if (response.status === 200) {
          navigateToHome();
        }
        return response.json()
      })
      .then((data) => {
        setCookie("token", data.token, { path: "/" });
        setCookie("userId", data.userId, { path: "/" });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function navigateToTerms() {
    navigate(PAGES.TERMS);
  }

  return (
    <>
      <div id="register-page">
        <div id="register-form-section">
          <p id="register-communicate">Rejestracja</p>
          <p id="email-communicate">
            Adres e-mail<span> *</span>
          </p>
          <input
            autoComplete="off"
            type="text"
            id="email-input"
            className="form-input"
            onChange={emailInputChangeEvent}
          ></input>
          <p
            className={
              isEmailValid
                ? "informative-text-correct"
                : "informative-text-incorrect"
            }
          >
            * Proszę o wprowadzenie poprawnego adresu email
          </p>
          <p id="password-communicate">
            Hasło<span> *</span>
          </p>
          <div className="password-input-container">
            <input
              autoComplete="off"
              type={isPasswordShown ? "text" : "password"}
              id="password-input"
              className="form-input"
              onChange={passwordInputChangeEvent}
            ></input>
            <img
              className={isPasswordShown ? "eye-icon2" : "eye-icon1"}
              src={isPasswordShown ? eyeHide : eyeShow}
              onClick={() => eyeIconEvent()}
              alt=""
            />
          </div>
          <p
            className={
              isPasswordValid
                ? "informative-text-correct"
                : "informative-text-incorrect"
            }
          >
            * Hasło musi zawierać 8-16 znaków, conajmniej 1 cyfrę i znak
            specjalny
          </p>
          <div id="register-button-section">
            <div id="accept-rules">
              <input type="checkbox" onClick={handleAcceptRules}></input>
              <p className="accept-rules">Akceptuje</p>
              <p
                id="rules-link"
                className="hyper-link"
                onClick={() => navigateToTerms()}
              >
                regulamin
              </p><p className={
                isTermsMpromptShown
                  ? "informative-text-incorrect" : "informative-text-correct"
              } id="accept-rules-"> * Aby zarejestrować się, zaakceptuj regulamin</p>
            </div>
            <p id="rodo-text">
              Twoje dane osobowe będą wykorzystywane aby dostosować działanie
              strony do twoich potrzeb, do zarządzania dostępem do Twojego
              konta oraz do innych celów opisanych w naszej polityka
              prywatności.
            </p>
            <div id="register-button" onClick={handleRegisterClick}>
              <span>Zarejestruj</span>
            </div>
            <div className="have-account-container">
              <p>Masz już konto?</p><p className="hyper-link" onClick={navigateToLogin}>zaloguj się!</p></div>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                handleGoogleSignIn(credentialResponse)
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
