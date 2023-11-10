import React from "react";

import "./Login.css";
import { AuthButton } from "../../Buttons/AuthButton/AuthButton";
import { AUTHSTATE } from "@/app/enums/auth_state";

export const ForgotPassword = ({ handleState }) => {
  return (
    <div className="w-full">
      <form className="w-full flex flex-col gap-3">
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
            // onChange={userNameChangeHandler}
            // onBlur={validateUserNameHandler}
          />
        </div>
        <div className="flex justify-center mt-5">
          <AuthButton buttonText={"Generate Token"} />
        </div>
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
            // onChange={userNameChangeHandler}
            // onBlur={validateUserNameHandler}
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
