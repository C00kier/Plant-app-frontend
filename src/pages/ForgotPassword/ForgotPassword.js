import { useState } from "react";
import { useParams } from "react-router-dom";

import "./ForgotPassword.css";

export default function ForgotPassword() {
    const [newPasswordInput, setNewPasswordInput] = useState("");
    const [confrimPasswordInput, setConfirmPasswordInput] = useState("");
    const [isNewPasswordValid, setIsNewPasswordValid] = useState(false);
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
    const [isFormValid, setIsFormValid] = useState(null);
    const { token } = useParams();
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    async function formSubmit(e) {
        e.preventDefault();

        try {
            if (isNewPasswordValid && isConfirmPasswordValid) {
                const response = await fetch(`${BASE_URL}/user/reset-password`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(
                        {
                            resetToken: token,
                            password: newPasswordInput
                        }
                    )
                })

                response.ok
                    ? setIsFormValid(true)
                    : setIsFormValid(false);
            } else {
                setIsFormValid(false)
            }

        } catch (error) {
            console.error(`Error fetching data: ${error}`);
        }
    }

    function newPasswordOnChangeEvent(e) {
        const inputValue = e.target.value;
        setNewPasswordInput(inputValue);

        inputValue === confrimPasswordInput && inputValue !== ""
            ? setIsConfirmPasswordValid(true)
            : setIsConfirmPasswordValid(false);

        const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])([a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,16})$/;

        inputValue.match(regex)
            ? setIsNewPasswordValid(true)
            : setIsNewPasswordValid(false);

        setIsFormValid(null);
    }

    function confirmPasswordOnChangeEvent(e) {
        const inputValue = e.target.value;
        setConfirmPasswordInput(inputValue);

        inputValue === newPasswordInput && inputValue !== ""
            ? setIsConfirmPasswordValid(true)
            : setIsConfirmPasswordValid(false);

        setIsFormValid(null);
    }

    return (
        <div id="forgot-password-container">
            {
                isFormValid !== true
                    ?
                    <form id="forgot-password-form" className="flex-column-center-center" onSubmit={(e) => formSubmit(e)}>
                        <p id="forgot-header">Reset hasła</p>
                        <input
                            className="forgot-password-input"
                            type="password"
                            placeholder="Nowe hasło"
                            onChange={(e) => newPasswordOnChangeEvent(e)}
                        />
                        <p className={isNewPasswordValid ? "forgot-valid-paragraph" : "forgot-invalid-paragraph"}>
                            * Hasło musi zawierać 8-16 znaków, conajmniej 1 cyfrę i znak specjalny
                        </p>
                        <input
                            className="forgot-password-input"
                            type="password"
                            placeholder="Potwierdź hasło"
                            onChange={(e) => confirmPasswordOnChangeEvent(e)} />
                        <p className={isConfirmPasswordValid ? "forgot-valid-paragraph" : "forgot-invalid-paragraph"}>
                            * Hasła muszą być takie same
                        </p>
                        <button id="forgot-password-button" type="submit">Zmień hasło</button>
                        {
                            isFormValid === false && <p id="forgot-something-went-wrong">Coś poszło nie tak...</p>
                        }
                    </form>
                    :
                    <p id="forgot-changed-password" className="forgot-valid-paragraph">Hasło zostało zmienione</p>
            }
        </div>
    )
}