import React from "react";
import styles from "@/styles/button.module.css";

function Button({
  type = "button",
  className = "",
  btnStyle = "main_btn",
  onClick,
  children,
  disabled = false,
}) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={` ${className}  ${styles.btn} ${styles[btnStyle]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
