import React from "react";
import "./Login.css";
import "./Signup.css";
import { AuthButton } from "../../Buttons/AuthButton/AuthButton";
import { AUTHSTATE } from "@/app/enums/auth_state";

export const Signup = ({ handleState }) => {
  return (
    <div className="w-full h-1/2">
      <form className="w-full flex flex-col gap-1">
        <div className="flex justify-around gap-1 flex-1">
          <div className="flex flex-col flex-1">
            <label htmlFor="email" className="namesLabel text-auth-grey">
              First Name
            </label>
            <div className="namesFormInputDiv flex items-center">
              <input
                type={"text"}
                className="text-black px-1"
                placeholder="First Name"
                required
                // pattern="^[a-zA-Z0-9]+@binghamton\.edu$"
                // onChange={userNameChangeHandler}
                // onBlur={validateUserNameHandler}
              />
            </div>
          </div>
          <div className="flex flex-col flex-1 ">
            <label htmlFor="email" className="namesLabel text-auth-grey">
              Last Name
            </label>
            <div className="namesFormInputDiv flex items-center">
              <input
                type={"text"}
                className="text-black px-2"
                placeholder="Last Name"
                required
                // pattern="^[a-zA-Z0-9]+@binghamton\.edu$"
                // onChange={userNameChangeHandler}
                // onBlur={validateUserNameHandler}
              />
            </div>
          </div>
        </div>
        <label htmlFor="email" className="namesLabel text-auth-grey">
          B-Number
        </label>
        <div className="namesFormInputDiv flex items-center">
          <input
            type={"text"}
            className="text-black px-2"
            placeholder="B#"
            required
            // pattern="^[a-zA-Z0-9]+@binghamton\.edu$"
            // onChange={userNameChangeHandler}
            // onBlur={validateUserNameHandler}
          />
        </div>
        <label htmlFor="email" className="namesLabel text-auth-grey">
          B-email
        </label>
        <div className="namesFormInputDiv flex items-center">
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
        <label htmlFor="password" className="namesLabel text-auth-grey">
          Password
        </label>
        <div className="namesFormInputDiv flex items-center">
          <input
            type={"password"}
            className="text-black px-2"
            placeholder="*************"
            id="password"
            name="password"
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
            id="password"
            name="password"
            required
            // pattern="^[a-zA-Z0-9]+@binghamton\.edu$"
            // onChange={userNameChangeHandler}
            // onBlur={validateUserNameHandler}
          />
        </div>
        <div className="flex justify-center mt-5">
          <AuthButton buttonText={"Sign Up"} />
        </div>
      </form>

      <div className="flex flex-col w-full items-center pt-2">
        <div
          className="flex gap-1 items-cente"
          onClick={() => handleState(AUTHSTATE.LOGIN)}
        >
          <button className="text-auth-grey authChangeBtn">
            Already User?
          </button>
          <button className="text-binghamton-green authChangeBtn">Login</button>
        </div>
      </div>
    </div>
  );
};
