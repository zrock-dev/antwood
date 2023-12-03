import { useState } from "react";
import Button from "../Button";
import { isEmailValid } from "@/utils/AuthFormValidations";
const ContactForm  = ({emailSaved , email, setEmail,  setEmailSaved})=>{

    const [emailErrorMessage, setEmailErrorMessaje] = useState("")
    const handleOnChange = (event)=>{
        setEmail(event.target.value)
        setEmailErrorMessaje("");
    }
    const onEmailReady = (event)=>{
        if(email === ""){
            setEmailErrorMessaje("Email is required")
            return
        }
        if (!isEmailValid(email)){
            setEmailErrorMessaje("Email is not valid")
            return
        }
    
        setEmailSaved(true)
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
      </div>
    );
}


export default ContactForm