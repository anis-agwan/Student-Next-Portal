"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth-context";

export const QuestionContext = createContext({
  pbQuestions: {},
  pbQuestionStatus: [],
  pbStatusComplete: false,
  pbAnswers: {},
  getPBQuestion: () => {},
  createPBQStatus: () => {},
  setPBQStatus: (idx) => {},
  setPBData: ({}) => {},
  setPBAnswer: (questionNo, answer) => {},
  submitPBAnswers: () => {},
});

export const QuestionContextProvider = ({ children }) => {
  const authCtx = useContext(AuthContext);
  const [pbQuestions, setPBQuestions] = useState(null);
  const [pbQuestionStatus, setPBQStatus] = useState([]);
  const [pbAnswers, setPBAnswers] = useState();
  const [pbCompleteStatus, setPBCompleteStatus] = useState(false);

  const basePBCT = "http://3.14.232.42";

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      const user = JSON.parse(localStorage.getItem("userDetails"));
      setPBAnswers({
        bingNumber: user.bingNumber,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    }
  }, [authCtx.isLoggedIn]);

  const getPBQ = async () => {
    const url = `${basePBCT}:8441/personal-beliefs/pb/getQuestions`;
    try {
      const res = await fetch(url);

      const data = await res.json();
      // console.log(data);

      setPBQuestions(data);

      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const setPBData = (data) => {
    // console.log("IS WORKING");
    setPBQuestions(data);
  };

  const createPBQuesStatus = (size) => {
    const arr = Array(size).fill(0);
    setPBQStatus(arr);
  };

  const settingPBQStatus = (idx) => {
    let prevArr = pbQuestionStatus;
    prevArr[idx] = 1;
    // console.log(prevArr);
    // console.log("IS THERE 0: ", prevArr.includes(0));

    setPBQStatus(prevArr);
    setPBCompleteStatus(pbQuestionStatus.includes(0));
  };

  const settingPBAnswer = (questionNo, answer) => {
    let ques = `pbQ${parseInt(questionNo) + 1}`;
    pbAnswers[ques] = parseInt(answer);
    console.log(pbAnswers);
    setPBAnswers({ ...pbAnswers });
  };

  const submittingPBAnswers = () => {
    if (!pbQuestionStatus.includes(0)) {
      if (authCtx.isLoggedIn) {
        // const user = JSON.parse(localStorage.getItem("userDetails"));
        try {
          const res = fetch(`${basePBCT}:8441/personal-beliefs/pb/pbData/`, {
            method: "POST",
            body: JSON.stringify(pbAnswers),
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(res);
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      alert("Please complete the assessment with all answers.");
    }
  };

  return (
    <QuestionContext.Provider
      value={{
        pbQuestions: pbQuestions,
        pbQuestionStatus: pbQuestionStatus,
        pbAnswers: pbAnswers,
        pbStatusComplete: pbCompleteStatus,
        getPBQuestion: getPBQ,
        createPBQStatus: createPBQuesStatus,
        setPBQStatus: settingPBQStatus,
        setPBData: setPBData,
        setPBAnswer: settingPBAnswer,
        submitPBAnswers: submittingPBAnswers,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};
