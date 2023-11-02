import React from "react";
import styles from "./style_compontens/button.module.css";

function Button({
  type = "button",
  className = "",
  btnStyle = "main_btn",
  onClick,
  children,
}) {
  return (
    <button
      type={type}
      className={` ${className}  ${styles.btn} ${styles[btnStyle]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
