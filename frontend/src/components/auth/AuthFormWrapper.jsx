"use client";
import { useState } from "react";
import authStyle from "@/styles/auth/auth.module.css";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import VerificationCode from "./VerificationCode";
import Button from "../Button";
const defaultForm = {
  username: "",
  email: "",
  password: "",
};

const fieldError = {
  username: "",
  email: "",
  password: "",
};

function AuthFormWrapper() {
  const [form, setForm] = useState(defaultForm);
  const [hasAccount, setHasAccount] = useState(false);
  const [error, setError] = useState(fieldError);
  const { onAuthSignin, onAuthSignup } = useAuth();
  const [showVerificationCode, setVerificationCode] = useState(false)


  const regex = /^[a-zA-Z0-9\s]+$/;
  const handleAuth = () => {
    resetForm()
    setHasAccount(!hasAccount);
  };

  const resetForm = () => {
    setForm(defaultForm);
  };

  const onSignin = async (user, provider) => {
    try {
      await onAuthSignin(user, provider);
      resetForm();
    } catch (err) {
      console.log(err);
    }
  };

  const onSignup = async (user, provider) => {
    try {
      await onAuthSignup(user, provider);
      resetForm();
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnChange = (e) => {
    let { name, value } = e.target;
    value = value.trim();

    if (value =="") {
      setError({
        ...error,
        [name]: "as",
      });
    }
  
   
    if(value.length > 30){
      return ;
    }

    if (!regex.test(value)) {
        setError({
          ...error,
          [name]: "* Only alphanumeric values are allowed",
        });
    }else{
      setError({
        ...error,
        [name]: "",
      });
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!hasAccount) {
      onSignin(form, "solesstyle");
    } else {
      setVerificationCode(true)
      onSignup(form, "solestyle");
    }
  };

  return (
    <div className={authStyle.auth_ctn}>
      <div>
        <h3>{hasAccount ? "Sign Up" : "Sign In"}</h3>
        <p className={authStyle.subtitle}>SoleStyle*</p>
      </div>
      <div className={authStyle.three_party}>
        <div className={authStyle.google_ctn}>
          <Image src="/google.webp" width={40} height={18} alt="google" />
          {hasAccount ? "Sign Up with Google" : "Sign In with Google"}
        </div>
      </div>
      <div className={authStyle.delimiter}> -- o --</div>
      <form className={authStyle.form_inputs}>
        <div>
          {hasAccount && (
            <>
              {error.username && (
                <span className={authStyle.error_message}>
                  {error.username}
                </span>
              )}
              <input
                type="text"
                placeholder="Username"
                value={form.username}
                name="username"
                onChange={handleOnChange}
              />
            </>
          )}
          {error.email && (
            <span className={authStyle.error_message}>{error.email}</span>
          )}
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            name="email"
            onChange={handleOnChange}
          />
          {error.password && (
            <span className={authStyle.error_message}>{error.password}</span>
          )}
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            name="password"
            onChange={handleOnChange}
          />{" "}
        </div>
        <Button className={authStyle.btn} onClick={handleSignIn}>
          {hasAccount ? "Sign Up" : "Sign In"}
        </Button>
      </form>
      <p className={authStyle.suggestion}>
        {hasAccount ? "Already have an account?" : "Don't have an account?"}{" "}
        <span onClick={handleAuth}>{hasAccount ? "Sign In" : "Sign Up"}</span>
      </p>
      {showVerificationCode && (
        <VerificationCode onCloseToolTip={() => setVerificationCode(false)} />
      )}
    </div>
  );
}

export default AuthFormWrapper;
