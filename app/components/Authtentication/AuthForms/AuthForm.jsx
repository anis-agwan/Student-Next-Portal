"use client";

import React, { useState } from "react";
import "./Login.css";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { ForgotPassword } from "./ForgotPassword";
import { NewPassForm } from "./NewPassForm";
import { AUTHSTATE } from "@/app/enums/auth_state";
import { SignUpToken } from "./SignUpToken";

export const AuthForm = () => {
  const [isLoginState, setLoginState] = useState(true);
  const [isSignUpState, setSignUpState] = useState(false);
  const [isTokenState, setTokenState] = useState(false);
  const [isForgotState, setForgotState] = useState(false);
  const [isNewPassState, setNewPassState] = useState(false);

  const handleState = (newState) => {
    if (newState === AUTHSTATE.LOGIN) {
      setLoginState(true);
      setSignUpState(false);
      setTokenState(false);
      setForgotState(false);
      setNewPassState(false);
      return;
    } else if (newState === AUTHSTATE.SIGNUP) {
      setLoginState(false);
      setSignUpState(true);
      setTokenState(false);
      setForgotState(false);
      setNewPassState(false);
      return;
    } else if (newState === AUTHSTATE.TOKENSIGNUP) {
      setLoginState(false);
      setSignUpState(false);
      setTokenState(true);
      setForgotState(false);
      setNewPassState(false);
      return;
    } else if (newState === AUTHSTATE.FORGOT) {
      setLoginState(false);
      setSignUpState(false);
      setTokenState(false);
      setForgotState(true);
      setNewPassState(false);
      return;
    } else if (newState === AUTHSTATE.NEWPASS) {
      setLoginState(false);
      setSignUpState(false);
      setTokenState(false);
      setForgotState(false);
      setNewPassState(true);
      return;
    }

    setLoginState(true);
    setSignUpState(false);
    setForgotState(false);
    setNewPassState(false);
    return;
  };

  return (
    <div className="flex flex-col items-center h-full justify-center pt-14">
      <div className="flex flex-col items-start w-full px-6 gap-4">
        <h1 className="headingTitle text-binghamton-green">
          {isLoginState && "Login"}
          {isSignUpState && "Sign Up"}
          {isTokenState && "Verify Token"}
          {isForgotState && "Forgot Password"}
          {isNewPassState && "New Password"}
        </h1>
        <p className="headText text-auth-grey">
          Welcome to Leadership Assesment Program
        </p>
        {isLoginState && <Login handleState={handleState} />}
        {isSignUpState && <Signup handleState={handleState} />}
        {isTokenState && <SignUpToken handleState={handleState} />}
        {isForgotState && <ForgotPassword handleState={handleState} />}
        {isNewPassState && <NewPassForm handleState={handleState} />}
      </div>
    </div>
  );
};
