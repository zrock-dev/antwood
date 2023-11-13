"use client";
import { useState } from "react";
import authStyle from "@/styles/auth/auth.module.css";
import Image from "next/image";
import VerificationCode from "./VerificationCode";
import Button from "../Button";
import {
  validateSignupForm,
  validateSigninForm,
} from "@/utils/AuthFormValidations";

import useAuthHandler from "@/hooks/AuthOperations";
import { defaultFormError, defaultForm } from "@/utils/AuthFormValidations";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

function AuthFormWrapper({isModalOpen}) {
  const [form, setForm] = useState(defaultForm);
  const [hasAccount, setHasAccount] = useState(false);
  const [error, setError] = useState(defaultFormError);
  const [showVerificationCode, setShowVerificationCode] = useState(false);
  const { onSignin, onSignup, verifyUserExists } = useAuthHandler();

  const handleAuth = () => {
    resetForm();
    setHasAccount(!hasAccount);
  };

  const resetForm = () => {
    setForm(defaultForm);
    setError(defaultFormError);
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

  const handleSignIn = async () => {
    if (!hasAccount) {
      if (validateSigninForm(form, setError)) onSignin(form, "solesstyle");
    } else if (validateSignupForm(form, setError)) {
      let exist = await verifyUserExists(form.email);
      if (!exist) setShowVerificationCode(true);
    }
  };


  const renderErrorMessage = (fieldName) => {
    if (error[fieldName]) {
      return (
        <span className={authStyle.error_message}>{error[fieldName]}</span>
      );
    }
    return null;
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && isModalOpen) {
      handleSignIn();
    }
  };


  return (
    <div className={authStyle.auth_ctn}>
      <div>
        <h3>{hasAccount ? "Sign Up" : "Sign In"}</h3>
        <p className={authStyle.subtitle}>SoleStyle*</p>
      </div>
      <div className={authStyle.three_party}>
      <GoogleOAuthProvider clientId="504414054298-5qafjlkm3m2gkeu4f2d3ios0gop99all.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={credentialResponse => {
        console.log(credentialResponse);
        }}
        onError={() => {
        console.log('Login Failed');
        }}
      />
      </GoogleOAuthProvider>
      </div>
      <div className={authStyle.delimiter}>o</div>
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
            onKeyDown={handleKeyPress}
            autoComplete="on"
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
          onCloseToolTip={() => setShowVerificationCode(false)}
          onVerified={() => onSignup(form, "solestyle")}
          email={form.email}
          isVisible={showVerificationCode}
        />
      )}
    </div>
  );
}

export default AuthFormWrapper;
