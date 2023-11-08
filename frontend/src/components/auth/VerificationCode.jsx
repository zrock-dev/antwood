import styles from "@/styles/verificationcode.module.css";
import { useRef, useEffect, useState } from "react";
import Button from "../Button";
const VerificationCode = ({ onCloseToolTip }) => {
  const tooltipRef = useRef();
  const [code, setCode] = useState("");

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
    if(isNaN(value) || value.length> 6){
        return ;
    }
    setCode(value)
  }
  return (
    <div ref={tooltipRef} className={styles.tooltip}>
      <div>
        <input type="text" value={code} onChange={handleOnChange} />
        <Button btnStyle="second_btn">
          <i className="fa-solid fa-rotate"></i>
        </Button>
      </div>
      <div>
        <Button>Verify Code</Button>
      </div>
    </div>
  );
};

export default VerificationCode;
