import React, { useEffect, useReducer, useState, useContext } from "react";

import "./Login.css";
import { AuthButton } from "../../Buttons/AuthButton/AuthButton";
import { passwordReducer } from "./AuthReducers";
import { AuthContext } from "@/app/store/auth-context";
import { AUTHSTATE } from "@/app/enums/auth_state";
import { useDispatch, useSelector } from "react-redux";
import { onAuthRdxNewPassword } from "@/app/redux-store/optimizedApis/auth-optm-action";
import { changePassword } from "@/app/redux-store/authRdxStore/auth-actions";

export const NewPassForm = ({ handleState }) => {
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();
  const forgotUser = useSelector((state) => state.auth.forgotUser);

  const [newpassFormIsValid, setNewPassFormIsValid] = useState(false);

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const { value: enteredPassword, isValid: isPassValid } = passwordState;
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const newTempToken = useSelector((state) => state.auth.tempToken);

  const passwordChangehandler = (event) => {
    dispatchPassword({
      type: "USER_INPUT",
      val: event.target.value,
    });
  };

  const confirmPasswordHandler = (event) => {
    setEnteredConfirmPassword(event.target.value);
  };

  const validatePassword = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  useEffect(() => {
    const identifier = setTimeout(() => {
      if (isPassValid && enteredPassword === enteredConfirmPassword) {
        setNewPassFormIsValid(isPassValid);
        if (newpassFormIsValid) {
          console.log("New pass FORM OK");
        }
      } else {
        console.log("new pass FORM NOT OK");
      }
    }, 500);

    return () => {
      console.log("cleanup");
      clearTimeout(identifier);
    };
  }, [[isPassValid, enteredPassword, enteredConfirmPassword]]);

  const onNewPassSubmit = async (event) => {
    event.preventDefault();
    // console.log(newTempToken.tokenState);
    // const user = {
    //   emailId: newTempToken.emailId,
    //   token: newTempToken.tokenState,
    //   newPassword: passwordState.value
    // }
    const user = {
      email: forgotUser.emailId,
      newPassword: passwordState.value
    }

    console.log(user);
    dispatch(changePassword(user)).then((res) => {
      if(res) {
        console.log("CHANGED");
        handleState(AUTHSTATE.LOGIN);
      } else {
        throw new Error("Password did not change");
      }
    }).catch((err) => {
      console.log(err);
      // alert(err);
    });
    
    // await dispatch(
    //   onAuthRdxNewPassword(user)
    // ).then((res) => {
    //   console.log("NEW PASS")
    //   if(res) {
    //     handleState(AUTHSTATE.LOGIN);
    //   }
    // })
    
    // await authCtx
    //   .onRegisterNewPassword(authCtx.signUpStudentData.emailId, enteredPassword)
    //   .then((r) => {
    //     if (r === true) {
    //       handleState(AUTHSTATE.LOGIN);
    //     } else {
    //       throw new Error("Password did not change");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <div className="w-full h-1/2">
      <form className="w-full flex flex-col gap-1" onSubmit={onNewPassSubmit}>
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
            onChange={passwordChangehandler}
            onBlur={validatePassword}
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
            onChange={confirmPasswordHandler}
            onBlur={validatePassword}
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
