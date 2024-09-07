import React, { useContext, useState, useReducer, useEffect } from "react";

import { AuthButton } from "../../Buttons/AuthButton/AuthButton";
import { AUTHSTATE } from "@/app/enums/auth_state";
import { AuthContext } from "@/app/store/auth-context";

import { tokenReducer } from "./AuthReducers";
import { USER_ROLE } from "@/app/enums/role_enums";
import { TOKEN_ENUMS } from "@/app/enums/token_enums";
import { useDispatch, useSelector } from "react-redux";
import { onAuthRdxConfirmToken, onAuthRdxOptmSignUp } from "@/app/redux-store/optimizedApis/auth-optm-action";
import { onRdxConfirmToken, onRdxSignUp } from "@/app/redux-store/authRdxStore/auth-actions";

export const SignUpToken = ({ handleState }) => {
  const authCtx = useContext(AuthContext);

  const [studentData, setStudentData] = useState(authCtx.signUpStudentData);
  const [tokenFormIsValid, setTokenFormIsValid] = useState();
  const [tokenState, dispatchToken] = useReducer(tokenReducer, {
    value: "",
    isValid: null,
  });
  const { isValid: tokenIsValid } = tokenState;

  const newUserState = useSelector((state) => state.auth.newUserState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (tokenIsValid) {
      setTokenFormIsValid(tokenIsValid);
      if (tokenFormIsValid) {
        console.log("Token FORM OK");
      } else {
        console.log("Token FORM NOT OK");
      }
    }
  });

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

  const onTokenSubmit = async (event) => {
    event.preventDefault();
    if (tokenFormIsValid) {
      // console.log(studentData);
      
      const confirmTokenRequest = {
        emailId: newUserState.emailId,
        token: tokenState.value,
        requestType: "Register",
      }

      console.log(confirmTokenRequest);

      dispatch(
        onRdxConfirmToken(
          confirmTokenRequest
        )
      ).then(async (res) => {
        console.log(res);
        if(res) {
          console.log("CAN SiGNUP");
          const signUpUser = {
            
          }
          console.log(signUpUser);
          await dispatch(
            onRdxSignUp(
              newUserState.emailId,
              newUserState.bingNumber,
              newUserState.firstName,
              newUserState.lastName,
              newUserState.password,
              USER_ROLE.STUDENT
            )
          ).then((res) => {
            if(res) {
              console.log("SIGNUP SUCCESSFUL");
              alert("Account created successfully, please login");
              handleState(AUTHSTATE.LOGIN);
            } else {
              throw new Error("Some issue while creating the account");
            }
          }).catch((err) => {
            console.log(err);
            // alert(err.message);
            // handleState(AUTHSTATE.SIGNUP);
          })
        }
      })

      // await dispatch(
      //    onAuthRdxConfirmToken(confirmTokenRequest)
      // ).then((res) => {
      //   console.log("SUCCESSFUL");
      //   console.log(res);
      //   console.log(res === true);
      //   console.log("What is going on");
      //   if(res) {
      //     console.log("CAN SiGNUP");
      //     const signUpUser = {
      //       emailId: newUserState.emailId,
      //       bNumber: newUserState.bingNumber,
      //       firstName: newUserState.firstName,
      //       lastName: newUserState.lastName,
      //       password: newUserState.password,
      //       role: "student"
      //     }
      //     dispatch(
      //       onAuthRdxOptmSignUp(signUpUser)
      //     ).then((r) => {
      //       if(r && res.data.errorCode === 200) {
      //           alert(res.data.message);
      //           handleState(AUTHSTATE.LOGIN);
                
      //       } else {
      //         throw new Error("Some issue while creating the account");
      //       }
      //     }).catch((err) => {
      //       console.log(err);
      //     })
      //   } else {
      //     throw new Error("Some issue verifying the token");
      //   }
      // }).catch((err) => {
      //   console.log(err);
      // })
      // authCtx
      //   .onTokenSubmit(
      //     studentData.emailId,
      //     tokenState.value,
      //     TOKEN_ENUMS.REGISTER
      //   )
      //   .then((res) => {
      //     console.log(res);
      //     if (res) {
      //       authCtx
      //         .onSignup(
      //           studentData.emailId,
      //           studentData.bingNumber,
      //           studentData.firstName,
      //           studentData.lastName,
      //           studentData.password,
      //           USER_ROLE.STUDENT
      //         )
      //         .then((res) => {
      //           if(res) {
      //             alert("Successfully registered");
      //             handleState(AUTHSTATE.LOGIN);
      //           } else {
      //             alert("Error : Email / B-Number already exists")
      //             handleState(AUTHSTATE.SIGNUP);
      //           }
      //         });
      //     }
      //   });
    }
  };

  return (
    <div className="w-full">
      <form className="w-full flex flex-col gap-3" onSubmit={onTokenSubmit}>
        <label htmlFor="password" className="labelHeader text-auth-grey">
          Token (12 Digit)
        </label>
        <div className="formInputDiv flex items-center">
          <input
            type={"text"}
            className="text-black px-2 w-full"
            placeholder="*************"
            required
            // pattern="^[a-zA-Z0-9]+@binghamton\.edu$"
            onChange={tokenChangeHandler}
            onBlur={validateToken}
          />
        </div>
        <div className="flex justify-center mt-5">
          <AuthButton buttonText={"Verify"} />
        </div>
      </form>

      <div className="flex flex-col w-full items-center pt-2">
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
