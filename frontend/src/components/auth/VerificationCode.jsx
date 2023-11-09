import styles from "@/styles/verificationcode.module.css";
import { useRef, useEffect, useState } from "react";
import Button from "../Button";
import { getCodeToVerifyAccount } from "@/request/AuthRequest";
import { toast } from "sonner";
import { encryptData, decryptData } from "@/utils/Encrypter";

const VerificationCode = ({ onCloseToolTip, email, onVerified }) => {
  const tooltipRef = useRef();
  const [code, setCode] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);

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

  const sendCode = async () => {
    if(isCodeSent) return
     blockSendCode();
     getCodeToVerifyAccount(email).then((res) => {
      let code = res.data.code;
      console.log(code)
       if(code!==""){
        let encryptedData = encryptData(code);
        setVerificationCode(encryptedData);
       }else{
         toast.error("The email could not be sent, verify that it exists");
       }
      
     }).catch((err) => {
       toast.error(err);
     })
  }

  const blockSendCode = () => {
    setIsCodeSent(true);
    let seconds = 60;
    const interval = setInterval(() => {
      setSecondsLeft(seconds);
      seconds -= 1;
      if (seconds < 0) {
        setIsCodeSent(false);
        clearInterval(interval);
      }
    }, 1000);
  };

  const verifyCode = () => {
    let originalCode = decryptData(verificationCode);
    if (originalCode!== "" && originalCode == code) {
      onVerified();
    } else {
      toast.error("incorrect code");
    }
  };

  return (
    <div ref={tooltipRef} className={styles.tooltip}>
      <div>
        <input type="text" value={code} onChange={handleOnChange} />
        <Button
          onClick={sendCode}
          btnStyle={isCodeSent ? "second_btn" : "main_btn"}
        >
          Get Code
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
