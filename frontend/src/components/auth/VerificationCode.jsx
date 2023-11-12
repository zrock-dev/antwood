"use client";
import styles from "@/styles/verificationcode.module.css";
import { useRef, useEffect, useState } from "react";
import Button from "../Button";
import { isValidCode } from "@/requests/AuthRequest";
import { toast } from "sonner";
const VerificationCode = ({ onCloseToolTip, onVerified, verificationCode, setVerificationCode,
  sendVeficationCode }) => {
  const tooltipRef = useRef();
  const [code, setCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(360);

  const sendCode = async () => {
    if (isCodeSent) return;
     setIsCodeSent(true);
     await sendVeficationCode()
  }

  const blockSendCode = () => {
    let seconds = 360;
    const interval = setInterval(() => {
      setSecondsLeft(seconds);
      seconds -= 1;
      if (seconds < 0) {
        setSecondsLeft(360)
        setIsCodeSent(false);
        clearInterval(interval);
        setVerificationCode("")
      }
    }, 1000);
  };

  useEffect(() => {
    if (isCodeSent) {
      blockSendCode()
    }
  }, [isCodeSent])



  useEffect(() => {
    let onClickHandler = (e) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target)) {
        onCloseToolTip();
      }
    };

    document.addEventListener("mousedown", onClickHandler);
    return () => {
      document.removeEventListener("mousedown", onClickHandler);
    };
  }, []);




  const handleOnChange = (e) => {
    let value = e.target.value;
    if (isNaN(value) || value.length > 6) {
      return;
    }
    setCode(value);
  };




  const verifyCode = async () => {
    if (code === "" ) {
      toast.error("Code is required");
      return
    }

    if(verificationCode === "") {
      toast.error("Send code first");
      return
    }

    const isValid = await isValidCode(code, verificationCode);
    if (!isValid) {
      toast.error("Incorrect code");
      return
    }
    onCloseToolTip();
    onVerified();
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      verifyCode();
    }
  }

  return (
    <div ref={tooltipRef} className={styles.tooltip}>
      <div>
        <input 
          type="text" 
          value={code} 
          onChange={handleOnChange}
          onKeyDown={onKeyDown}  
        />
        <Button
          onClick={sendCode}
          btnStyle={isCodeSent ? "second_btn" : "main_btn"}
        >
         <i className="fa-solid fa-repeat"></i>
        </Button>
      </div>
      <div>
        <Button onClick={verifyCode}>Verify Code</Button>
      </div>
      {isCodeSent && <p>Resend code in {secondsLeft} seconds</p>}
    </div>
  );
};

export default VerificationCode;
