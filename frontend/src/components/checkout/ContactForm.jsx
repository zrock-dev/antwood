import {useState} from "react";
import Button from "../Button";
import {isEmailValid} from "@/utils/AuthFormValidations";
import EmailVerificationDialog from "@/components/auth/EmailVerificationDialog";

const ContactForm = ({emailSaved, email, setEmail, setEmailSaved}) => {

    const [emailErrorMessage, setEmailErrorMessage] = useState("")
    const [startVerification, setStartVerification] = useState(false)

    const handleOnChange = (event) => {
        setEmail(event.target.value)
        setEmailErrorMessage("");
    }
    const onEmailReady = (_event) => {
        if (email === "") {
            setEmailErrorMessage("A valid email address is required")
        } else if (!isEmailValid(email)) {
            setEmailErrorMessage("Please enter a valid email address")
        } else {
            setStartVerification(true)
        }
    }

    const handleEmailVerificationSuccess = () => {
        setEmailSaved(true)
        setStartVerification(false)
    }

    return (
      <div className="checkout-form-section">
        <div className="checkout-form-title">
          <h3>Contact</h3> {emailSaved && <a onClick={()=>{setEmailSaved(false)}}>Edit</a>}
        </div>
        {
            emailSaved? email:
        <input
          className="checkout-email-input"
          type="text"
          value={email}
          placeholder="Email"
          onChange={handleOnChange}
          maxLength={50}
        />
        }
        <span className="checkout-email-error">{emailErrorMessage}</span>
        <div className="checkout-pay-btn-ctn">
        {!emailSaved && (
          <Button onClick={onEmailReady}>Continue</Button>
                )}
            </div>
            <EmailVerificationDialog
                startPoint={startVerification}
                verificationSuccessHandler={handleEmailVerificationSuccess}
                email={email}
            />
        </div>
    );
}

export default ContactForm
