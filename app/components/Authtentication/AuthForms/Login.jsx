"use client";

import React, { useContext, useEffect, useReducer, useState } from "react";
import { useRouter } from "next/navigation";

//CSS
import "./Login.css";

//components
import { AuthButton } from "../../Buttons/AuthButton/AuthButton";

//Enums
import { AUTHSTATE } from "@/app/enums/auth_state";

//Store
import { AuthContext } from "@/app/store/auth-context";

//Reducers
import { passwordReducer, userNameReducer } from "./AuthReducers";
import { useDispatch } from "react-redux";
import { authActions } from "@/app/redux-store/authRdxStore/auth-slice";
import { onRdxLogin } from "@/app/redux-store/authRdxStore/auth-actions";

export const Login = ({ handleState }) => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();
  const dispatch = useDispatch();

  const [formIsValid, setFormIsValid] = useState(false);

  const [userNameState, dispatchUserName] = useReducer(userNameReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: userNameIsValid } = userNameState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity");
      setFormIsValid(userNameIsValid && passwordIsValid);
      if (formIsValid) {
        console.log("FORM OK");
      }
    }, 500);

    return () => {
      console.log("cleanup");
      clearTimeout(identifier);
    };
  }, [userNameIsValid, passwordIsValid, formIsValid]);

  const userNameChangeHandler = (event) => {
    dispatchUserName({
      type: "USER_INPUT",
      val: event.target.value,
    });
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({
      type: "USER_INPUT",
      val: event.target.value,
    });
  };

  const validateUserNameHandler = () => {
    // setUserNameIsValid(enteredUserName.includes("@binghamton.edu"));
    // console.log(userNameIsValid);
    dispatchUserName({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    // console.log(passwordIsValid);
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const onLoginSubmit = async (event) => {
    event.preventDefault();
    let success = false;
    console.log("CLICK");
    if (formIsValid) {
      //Uncomment this

      dispatch(onRdxLogin(userNameState.value, passwordState.value)).then((res) => {
        console.log(res);
        if(res) {
            authCtx.onSetLogin();
            console.log(authCtx.isLoggedIn);
            router.push("/SelectionScreen");
        } else {
          console.log("Authentication failed, try again.")
        }
      });
      await authCtx
        .onLogin(userNameState.value, passwordState.value)
        .then((res) => {
          // console.log(res);
          if (res) {
            authCtx.onSetLogin();
            console.log(authCtx.isLoggedIn);
            router.push("/SelectionScreen");
          } else {
            console.log("SOME ISSUE");
          }
        });
    } else {
      alert(
        "Please check your email and password.\n(Email should only be BU email)"
      );
    }
  };

  return (
    <div className="w-full">
      <form className="w-full flex flex-col gap-3" onSubmit={onLoginSubmit}>
        <label htmlFor="email" className="labelHeader text-auth-grey">
          B-email
        </label>
        <div className="formInputDiv flex items-center">
          <input
            type={"email"}
            className="text-black px-2 w-full"
            placeholder="xyz@binghamton.edu"
            id="email"
            name="email"
            required
            // pattern="^[a-zA-Z0-9]+@binghamton\.edu$"
            onChange={userNameChangeHandler}
            onBlur={validateUserNameHandler}
          />
        </div>
        <label htmlFor="password" className="labelHeader text-auth-grey">
          Password
        </label>
        <div className="formInputDiv flex items-center">
          <input
            type={"password"}
            className="text-black px-2 w-full"
            placeholder="*************"
            id="password"
            name="password"
            required
            // pattern="^[a-zA-Z0-9]+@binghamton\.edu$"
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className="flex justify-center mt-5">
          <AuthButton buttonText={"Login"} />
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
        <div onClick={() => handleState(AUTHSTATE.FORGOT)}>
          <button className="text-auth-grey authChangeBtn">
            Forgot your password?
          </button>
        </div>
      </div>
    </div>
  );
};
