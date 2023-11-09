"use client";
import { useState } from "react";
import authStyle from "@/styles/auth/auth.module.css";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import VerificationCode from "./VerificationCode";
import Button from "../Button";
import {
  validateSignupForm,
  validateSigninForm,
} from "@/utils/AuthFormValidations";

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
  const { onAuthSignin, onAuthSignup, verifyUserExists } = useAuth();
  const [showVerificationCode, setShowVerificationCode] = useState(false);

  const handleAuth = () => {
    resetForm();
    setHasAccount(!hasAccount);
  };

  const resetForm = () => {
    setForm(defaultForm);
    setError(fieldError);
  };

  const onSignin = async (user, provider) => {
    const result = await onAuthSignin(user, provider);
    const success = await result.success;
    if (success) {
      resetForm();
    }
  };

  const onSignup = async (user, provider) => {
    const res = await onAuthSignup(user, provider);
    if (res.success) {
      resetForm();
    }
  };

  const handleOnChange = (e) => {
    let { name, value } = e.target;
    value = value.trim();
    const maxLength = name === "email" ? 50 : 20;
    if (value.length > maxLength) {
      return;
    }
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!hasAccount) {
      if (validateSigninForm(form, setError)) onSignin(form, "solesstyle");
    } else if (validateSignupForm(form, setError)) {
      try{
      let exist = await verifyUserExists(form.email);

      if (!exist) setShowVerificationCode(true);
    }catch(err){

      }

    }
  };

  const hideVerificationCodePopup = () => {
    setShowVerificationCode(false);
  };

  const renderErrorMessage = (fieldName) => {
    if (error[fieldName]) {
      return (
        <span className={authStyle.error_message}>{error[fieldName]}</span>
      );
    }
    return null;
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
              <input
                type="text"
                placeholder="Username"
                value={form.username}
                name="username"
                onChange={handleOnChange}
              />
              {renderErrorMessage("username")}
            </>
          )}
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            name="email"
            onChange={handleOnChange}
          />
          {renderErrorMessage("email")}
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            name="password"
            onChange={handleOnChange}
          />
          {renderErrorMessage("password")}{" "}
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
        <VerificationCode
          onCloseToolTip={hideVerificationCodePopup}
          onVerified={() => onSignup(form, "solestyle")}
          email={form.email}
        />
      )}
    </div>
  );
}

export default AuthFormWrapper;
