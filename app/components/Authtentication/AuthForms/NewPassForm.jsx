import React from "react";

import "./Login.css";
import { AuthButton } from "../../Buttons/AuthButton/AuthButton";

export const NewPassForm = () => {
  return (
    <div className="w-full h-1/2">
      <form className="w-full flex flex-col gap-1">
        <label htmlFor="password" className="namesLabel text-auth-grey">
          Password
        </label>
        <div className="namesFormInputDiv flex items-center">
          <input
            type={"password"}
            className="text-black px-2"
            placeholder="*************"
            required
            // pattern="^[a-zA-Z0-9]+@binghamton\.edu$"
            // onChange={userNameChangeHandler}
            // onBlur={validateUserNameHandler}
          />
        </div>
        <label htmlFor="password" className="namesLabel text-auth-grey">
          Confirm Password
        </label>
        <div className="namesFormInputDiv flex items-center">
          <input
            type={"password"}
            className="text-black px-2"
            placeholder="*************"
            required
            // pattern="^[a-zA-Z0-9]+@binghamton\.edu$"
            // onChange={userNameChangeHandler}
            // onBlur={validateUserNameHandler}
          />
        </div>
        <div className="flex justify-center mt-5">
          <AuthButton buttonText={"Submit"} />
        </div>
      </form>

      <div className="flex flex-col w-full items-center pt-2">
        <div className="flex gap-1 items-cente">
          <button className="text-auth-grey authChangeBtn">
            Already User?
          </button>
          <button className="text-binghamton-green authChangeBtn">Login</button>
        </div>
      </div>
    </div>
  );
};
