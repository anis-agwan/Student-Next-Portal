import React, { useContext, useEffect, useReducer, useState } from "react";

import "./Login.css";
import { AuthButton } from "../../Buttons/AuthButton/AuthButton";
import { AUTHSTATE } from "@/app/enums/auth_state";
import { AuthContext } from "@/app/store/auth-context";
import { tokenReducer, userNameReducer } from "./AuthReducers";
import { TOKEN_ENUMS } from "@/app/enums/token_enums";

export const ForgotPassword = ({ handleState }) => {
  const authCtx = useContext(AuthContext);
  const [formIsValid, setFormIsValid] = useState(false);

  const [userNameState, dispatchUserName] = useReducer(userNameReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: userNameIsValid } = userNameState;

  const [tokenState, dispatchToken] = useReducer(tokenReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: tokenIsValid } = tokenState;

  const userNameChangeHandler = (event) => {
    dispatchUserName({
      type: "USER_INPUT",
      val: event.target.value,
    });
  };

  const validateUserNameHandler = () => {
    // setUserNameIsValid(enteredUserName.includes("@binghamton.edu"));
    console.log(userNameIsValid);
    dispatchUserName({ type: "INPUT_BLUR" });
  };

  const tokenChangeHandler = (event) => {
    console.log(event.target.value);
    dispatchToken({
      type: "USER_INPUT",
      val: event.target.value,
    });
  };

  const validateToken = () => {
    // setUserNameIsValid(enteredUserName.includes("@binghamton.edu"));

    dispatchToken({ type: "INPUT_BLUR" });
  };

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity");
      setFormIsValid(userNameIsValid && tokenIsValid);
      if (formIsValid) {
        console.log("FORM OK");
      }
    }, 500);

    return () => {
      console.log("cleanup");
      clearTimeout(identifier);
    };
  }, [userNameIsValid, tokenIsValid, formIsValid]);

  const onEmailSubmit = (event) => {
    event.preventDefault();
    console.log(userNameIsValid);
    if (userNameIsValid) {
      authCtx.onGenerateToken(userNameState.value, TOKEN_ENUMS.FORGOT);
    }
  };

  const onTokenSubmit = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx
        .onTokenSubmit(
          userNameState.value,
          tokenState.value,
          TOKEN_ENUMS.FORGOT
        )
        .then((res) => {
          if (res) {
            authCtx.passStudentData({ emailId: userNameState.value });
            handleState(AUTHSTATE.NEWPASS);
          }
        });
    }
  };

  return (
    <div className="w-full">
      <form className="w-full flex flex-col gap-3" onSubmit={onEmailSubmit}>
        <label htmlFor="email" className="labelHeader text-auth-grey">
          B-email
        </label>
        <div className="formInputDiv flex items-center">
          <input
            type={"email"}
            className="text-black px-2"
            placeholder="xyz@binghamton.edu"
            id="email"
            name="email"
            required
            // pattern="^[a-zA-Z0-9]+@binghamton\.edu$"
            onChange={userNameChangeHandler}
            onBlur={validateUserNameHandler}
          />
        </div>
        <div className="flex justify-center mt-5">
          <AuthButton buttonText={"Generate Token"} />
        </div>
      </form>
      <form className="w-full flex flex-col gap-3" onSubmit={onTokenSubmit}>
        <label htmlFor="password" className="labelHeader text-auth-grey">
          Token (12 Digit)
        </label>
        <div className="formInputDiv flex items-center">
          <input
            type={"text"}
            className="text-black px-2"
            placeholder="*************"
            required
            // pattern="^[a-zA-Z0-9]+@binghamton\.edu$"
            onChange={tokenChangeHandler}
            onBlur={validateToken}
          />
        </div>
        <div className="flex justify-center mt-5">
          <AuthButton buttonText={"Submit"} />
        </div>
      </form>

      <div className="flex flex-col w-full items-center pt-2">
        <div
          className="flex gap-1"
          onClick={() => handleState(AUTHSTATE.SIGNUP)}
        >
          <button className="text-auth-grey authChangeBtn">New User?</button>
          <button className="text-binghamton-green authChangeBtn">
            Sign Up
          </button>
        </div>
        <div
          className="flex gap-1"
          onClick={() => handleState(AUTHSTATE.LOGIN)}
        >
          <button className="text-auth-grey authChangeBtn">
            Existing User?
          </button>
          <button className="text-binghamton-green authChangeBtn">Login</button>
        </div>
      </div>
    </div>
  );
};
