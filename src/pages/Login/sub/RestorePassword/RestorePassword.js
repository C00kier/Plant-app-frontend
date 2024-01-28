import "./RestorePassword.css";
import { useState } from "react";

export default function RestorePassword({ close }) {
    const [displayInvalidEmail, setDisplayInvalidEmail] = useState("none");
    const [emailString, setEmailString] = useState("");
    const [displayEmailSend, setDisplayEmailSend] = useState(false);
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    function handleIvalidEmailDisplay(e) {
        setEmailString(e.target.value)
        setDisplayInvalidEmail("none");
        if (!e.target.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && e.target.value.length !== 0) {
            setDisplayInvalidEmail("block");
        }
    }

    async function sendResetPasswordEmail() {
        if (displayInvalidEmail !== "block") {
            try {
                const response = await fetch(`${BASE_URL}/user/forgot-password`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ "email": emailString })
                });

                response.ok
                    ? setDisplayEmailSend(true)
                    : setDisplayInvalidEmail("block");

            } catch (error) {
                console.error(`Error fetching data: ${error}`);
            }

        }
    }

    return (
        <>
            <div id="background-shade">
                <div id="restore-password-container">
                    <div id="restore-password-close-bttn" onClick={() => close()}></div>
                    {
                        displayEmailSend
                            ?
                            <span id="reset-email-send">Wiadomość z resetem hasła została wysłana! Sprawdź email.</span>
                            :
                            <>
                                <span>Podaj swój email a wyślemy Ci link do zmiany hasła</span>

                                <input onChange={(e) => { handleIvalidEmailDisplay(e) }} type="email" id="restore-password-email"></input>
                                <div id="restore-password-bttn" onClick={async () => sendResetPasswordEmail()}>
                                    <span>
                                        Wyslij link!
                                    </span>
                                </div>
                                <span id="email-invalid-communicate" style={{ display: displayInvalidEmail }}>E-mail niepoprawny!</span>
                            </>
                    }
                </div>
            </div>
        </>
    )
}