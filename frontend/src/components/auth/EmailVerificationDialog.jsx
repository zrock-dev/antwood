"use client";
import styles from "@/styles/verificationcode.module.css";
import {useEffect, useRef, useState} from "react";
import Button from "../Button";
import {requestEmailTokenValidation, requestEmailVerificationToken} from "@/requests/AuthRequest";
import {toast} from "sonner";

const EMAIL_VERIFICATION_TIMEOUT = 45;
const EmailVerificationDialog = ({startPoint, verificationSuccessHandler, email, handleHide}) => {
    const tooltipRef = useRef();
    const [authToken, setAuthToken] = useState("");
    const [resendButtonVisibility, setResendButtonVisibility] = useState(false);
    const [remainingTime, setRemainingTime] = useState(EMAIL_VERIFICATION_TIMEOUT);
    const [authCode, setAuthCode] = useState("")
    const [visibility, setVisibility] = useState(false)

    useEffect(() => {
        let onClickHandler = (e) => {
            if (tooltipRef.current && !tooltipRef.current.contains(e.target)) {
                hideDialogAction()
            }
        };
        document.addEventListener("mousedown", onClickHandler);
        return () => {
            document.removeEventListener("mousedown", onClickHandler);
        };
    }, []);

    useEffect(() => {
        if (startPoint) {
            sendEmailVerification().then(() => {
                startWaitToken()
                setVisibility(true)
            }).catch((err) => console.error(err))
        } else {
            setVisibility(false)
        }
    }, [startPoint]);


    const sendEmailVerification = async () => {
        await toast.promise(requestEmailVerificationToken(email),
            {
                loading: "Sending email verification code",
                success: (data) => {
                    if (!data.code) {
                        throw new Error(`Requested code ${data.code} is invalid`);
                    } else {
                        setAuthToken(data.code)
                        return "Please check your email";
                    }
                },
                error: (err) => {
                    console.error(`An error has occurred while requesting a verification token\n\t
 ${err}`)
                    return "Could not send email verification code"
                }
            })
    }

    const handleWaitTokenTimeout = () => {
        setResendButtonVisibility(true);
        setAuthCode("")
    }

    const startWaitToken = () => {
        let secondsUntilTimeout = EMAIL_VERIFICATION_TIMEOUT;
        const interval = setInterval(() => {
            setRemainingTime(secondsUntilTimeout);
            secondsUntilTimeout -= 1;
            if (secondsUntilTimeout < 0) {
                handleWaitTokenTimeout();
                clearInterval(interval);
            }
        }, 1000);
    };


    const handleLabelUpdate = (e) => {
        let value = e.target.value;
        if (isNaN(value) || value.length > 6) {
            console.error("Invalid code label")
            return;
        }
        setAuthCode(value);
    };


    const verifyEmailToken = async () => {
        if (authToken === "") {
            toast.error("Invalid authentication code");
            return
        }
        if (authCode === "") {
            toast.error("Send code first");
            return
        }

        const isValid = await requestEmailTokenValidation(authCode, authToken)
            .catch((err) => {
                console.error(err)
            })

        if (!isValid) {
            toast.error("The provided code is invalid");
            return
        }
        verificationSuccessHandler();
    };

    const handleKeyboardEvent = (event) => {
        if (event.key === "Enter") {
            verifyEmailToken().catch((err) => console.error(err))
        }
    }

    const hideDialogAction = () => {
        setVisibility(false)
        handleHide()
    }

    return (
        <>
            {visibility && (
                <div ref={tooltipRef} className={styles.tooltip}>
                    <div>
                        <input
                            type="text"
                            value={authCode}
                            onChange={handleLabelUpdate}
                            onKeyDown={handleKeyboardEvent}
                        />
                        <Button
                            onClick={sendEmailVerification}
                            btnStyle={resendButtonVisibility ? "main_btn" : "second_btn"}
                        >
                            <i className="fa-solid fa-repeat"></i>
                        </Button>
                    </div>
                    <div>
                        <Button onClick={verifyEmailToken}>Verify Code</Button>
                    </div>
                    {!resendButtonVisibility && <p>Resend code in {remainingTime} seconds</p>}
                </div>
            )}
        </>
    );
};

export default EmailVerificationDialog;
