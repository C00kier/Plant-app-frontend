import { useState } from "react";
import "./LoginPage.css";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import RestorePassword from "./sub/RestorePassword/RestorePassword";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";

export default function LoginPage(props) {
  const { setCookie } = props;
  const [loginCredential, setLoginCredential] = useState(String);
  const [password, setPassword] = useState();
  const [wrongCredentialsVisibility, setLoginCredentialsVisibility] =
    useState("none");
  const [displayRestorePassword, setDisplayRestorePassword] = useState(false);
  const [displayLoadingScreen, setDisplayLoadingScreen] = useState(false);

  const navigate = useNavigate();
  const navigateToRegistration = () => {
    navigate("/register");
  };
  const navigateToHome = () => {
    navigate("/");
  };

  function handleRestoreVisbility() {
    setDisplayRestorePassword(!displayRestorePassword);
  }
  async function login() {
    setDisplayLoadingScreen(true);
    let loginObject = {};
    if (loginCredential.includes("@")) {
      loginObject = {
        email: loginCredential,
        password: password,
      };
    } else {
      loginObject = {
        login: loginCredential,
        password: password,
      };
    }
    const response = await fetch("http://localhost:8080/auth/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginObject),
    });
    if (response.status === 200) {
      setDisplayLoadingScreen(false);
      navigate("/");
      const data = await response.json();
      setCookie("token", data.token, { path: "/" });
      setCookie("userId", data.userId, { path: "/" });
    }
    if (response.status === 401 || response.status === 403) {
      setLoginCredentialsVisibility("block");
    }
  }

  const handleGoogleSignIn = (request) => {
    fetch("http://localhost:8080/auth/authenticate/google", {
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
        return response.json();
      })
      .then((data) => {
        setCookie("token", data.token, { path: "/" });
        setCookie("userId", data.userId, { path: "/" });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      {displayRestorePassword ? (
        <RestorePassword close={handleRestoreVisbility}></RestorePassword>
      ) : (
        <></>
      )}
      {displayLoadingScreen ? <LoadingScreen></LoadingScreen> : <></>}
      <div id="login-page">
        <div id="login-section-left">
          <p id="login-communicate">Logowanie</p>
          <p id="user-name-communicate">
            Nazwa użytkownika lub adres e-mail<span> *</span>
          </p>

          <input
            autoComplete="off"
            type="text"
            id="email-input"
            className="login-input"
            onChange={(e) => setLoginCredential(e.target.value)}
          ></input>

          <p id="password-communicate">
            Hasło<span> *</span>
          </p>
          <input
            autoCapitalize="off"
            type="password"
            id="password-input"
            className="login-input"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <p
            id="password-incorrent-communicate"
            style={{ display: wrongCredentialsVisibility }}
          >
            Nie znaleziono podanej kombinacji loginu i hasła
          </p>
          <p
            id="restore-password-button"
            onClick={() => {
              setDisplayRestorePassword(true);
            }}
          >
            Nie pamiętasz hasła?
          </p>
          <div id="login-button-section">
            <div id="login-button" onClick={login}>
              <span>Zaloguj się!</span>
            </div>
            <div id="no-account-register" onClick={navigateToRegistration}>
              <span>Nie posiadasz konta? Zarejestruj się!</span>
            </div>
          </div>
          <div id="login-with-google-section">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                handleGoogleSignIn(credentialResponse);
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
