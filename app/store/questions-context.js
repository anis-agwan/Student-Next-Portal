"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth-context";
import { data } from "autoprefixer";
import { DD_INPUTS } from "../enums/dd_input";

export const QuestionContext = createContext({
  pbQuestions: {},
  ctQuestions: {},
  ddQuestions: {},
  pbQuestionStatus: [],
  pbStatusComplete: false,
  ctQuestionStatus: [],
  ctStatusComplete: false,
  ddQuestionStatus: [],
  ddStatusComplete: false,
  pbAnswers: {},
  ctAnswers: {},
  ddAnswers: {},
  getPBQuestion: () => {},
  getCTQuestion: () => {},
  getDDQuestion: () => {},
  createPBQStatus: () => {},
  createCTQStatus: () => {},
  createDDQStatus: () => {},
  setPBQStatus: () => {},
  setCTQStatus: () => {},
  setDDQStatus: () => {},
  setPBData: ({}) => {},
  setCTData: ({}) => {},
  setDDData: ({}) => {},
  setPBAnswer: (questionNo, answer) => {},
  setCTAnswer: (questionNo, answer) => {},
  setDDAnswer: (questionNo, opID, answer, whichInput) => {},
  submitPBAnswers: () => {},
  submitCTAnswers: () => {},
  submitDDAnswers: () => {},
  ddCounter: 0,
  setDDCounter: () => {},
});

export const QuestionContextProvider = ({ children }) => {
  const authCtx = useContext(AuthContext);
  const [pbQuestions, setPBQuestions] = useState(null);
  const [ctQuestions, setCTQuestions] = useState(null);
  const [ddQuestions, setDDQuestions] = useState(null);
  const [pbQuestionStatus, setPBQStatus] = useState([]);
  const [ctQuestionStatus, setCTQStatus] = useState([]);
  const [ddQuestionStatus, setDDQStatus] = useState([]);
  const [pbAnswers, setPBAnswers] = useState();
  const [ctAnswers, setCTAnswers] = useState();
  const [ddAnswers, setDDAnswers] = useState();
  const [pbCompleteStatus, setPBCompleteStatus] = useState(false);
  const [ctCompleteStatus, setCTCompleteStatus] = useState(false);
  const [ddCompleteStatus, setDDCompleteStatus] = useState(false);

  const [ddCounter, setDDCounter] = useState(0);

  const basePBCT = "http://3.14.232.42";
  const baseDDBI = "http://3.14.159.174";

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      const user = JSON.parse(localStorage.getItem("userDetails"));
      setPBAnswers({
        bingNumber: user.bingNumber,
        firstName: user.firstName,
        lastName: user.lastName,
      });

      setCTAnswers({
        bingNumber: user.bingNumber,
        firstName: user.firstName,
        lastName: user.lastName,
      });

      setDDAnswers({
        bingNumber: user.bingNumber,
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

  const getCTQ = async () => {
    const url = `${basePBCT}:8442/critical-thinking/critical-thinking/getQuestions`;
    try {
      const res = await fetch(url);
      const data = await res.json();

      setCTQuestions(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const getDDQ = async () => {
    const url = `${baseDDBI}:8443/situation_q/sq/getSQuestions`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      // console.log(data);
      setDDQuestions(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const setPBData = (data) => {
    // console.log("IS WORKING");
    setPBQuestions(data);
  };

  const setCTData = (data) => {
    // console.log(data);
    setCTQuestions(data);
  };

  const setDDData = (data) => {
    setDDQuestions(data);
  };

  const createPBQuesStatus = (size) => {
    const arr = Array(size).fill(0);
    setPBQStatus(arr);
  };

  const createCTQStatus = (size) => {
    const arr = Array(size).fill(0);
    setCTQStatus(arr);
  };

  const createDDQStatus = (size) => {
    const arr = Array(size).fill(0);
    // setCTQStatus(arr);
    setDDQStatus(arr);
    console.log(arr);
  };

  const settingPBQStatus = (idx) => {
    let prevArr = pbQuestionStatus;
    prevArr[idx] = 1;
    // console.log(prevArr);
    // console.log("IS THERE 0: ", prevArr.includes(0));

    setPBQStatus(prevArr);
    setPBCompleteStatus(pbQuestionStatus.includes(0));
  };

  const settingCTQStatus = (idx) => {
    let prevArr = ctQuestionStatus;
    prevArr[idx] = 1;

    setCTQStatus(prevArr);
    setCTCompleteStatus(ctQuestionStatus.includes(0));
  };

  const settingDDQStatus = (idx) => {
    let prevArr = ddQuestionStatus;
    prevArr[idx] = 1;

    setDDQStatus(prevArr);
    setDDCompleteStatus(ddQuestionStatus.includes(0));

    // console.log(prevArr);

    // setDDCompleteStatus(comp);
  };

  const settingPBAnswer = (questionNo, answer) => {
    let ques = `pbQ${parseInt(questionNo) + 1}`;
    pbAnswers[ques] = parseInt(answer);
    console.log(pbAnswers);
    setPBAnswers({ ...pbAnswers });
  };

  const settingCTAnswer = (questionNo, answer) => {
    let ques = `que${parseInt(questionNo) + 1}`;
    ctAnswers[ques] = parseInt(answer);
    console.log(ctAnswers);
    setCTAnswers({ ...ctAnswers });
  };

  const settingDDAnswer = (opID, answer, whichInput) => {
    let ques = `${whichInput}${ddCounter + parseInt(opID) + 1}`;
    console.log(ddAnswers);
    if (whichInput === DD_INPUTS.RANKSR) {
      ddAnswers[ques] = ddCounter + parseInt(answer);
      console.log(ddAnswers);
      setDDAnswers({ ...ddAnswers });
    } else if (whichInput === DD_INPUTS.RATESR) {
      ddAnswers[ques] = parseInt(answer);
      console.log(ddAnswers);
      setDDAnswers({ ...ddAnswers });
    }
  };

  const submittingPBAnswers = async () => {
    if (!pbQuestionStatus.includes(0)) {
      if (authCtx.isLoggedIn) {
        // const user = JSON.parse(localStorage.getItem("userDetails"));
        try {
          const res = await fetch(
            `${basePBCT}:8441/personal-beliefs/pb/pbData/`,
            {
              method: "POST",
              body: JSON.stringify(pbAnswers),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          // return res.json();
          // console.log(res);
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      alert("Please complete the assessment with all answers.");
    }
  };

  const submittingCTAnswers = async () => {
    // console.log("SUBMITTING CT");
    console.log(ctQuestionStatus);
    if (!ctQuestionStatus.includes(0)) {
      if (authCtx.isLoggedIn) {
        try {
          const res = await fetch(
            `${basePBCT}:8442/critical-thinking/critical-thinking/ctData/`,
            {
              method: "POST",
              body: JSON.stringify(ctAnswers),
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          );

          return true;
          // const data = await res.json();

          // console.log(res);
        } catch (err) {
          console.log(err);
          return false;
        }
      }
    } else {
      alert("Please complete the assessment with all answers.");
    }
    return false;
  };

  const submittingDDAnswers = async () => {
    console.log(ddQuestionStatus.includes(0));

    console.log(ddAnswers);
    if (!ddQuestionStatus.includes(0)) {
      if (authCtx.isLoggedIn) {
        try {
          const res = await fetch(`${baseDDBI}:8443/situation_q/sq/sqData`, {
            method: "POST",
            body: JSON.stringify(ddAnswers),
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

  const settingDDCounter = (val, whichBtn, quesLen) => {
    // console.log(ddCounter, quesLen);
    if (whichBtn === "next") {
      let newCount = ddCounter + val;
      // console.log(newCount);
      setDDCounter(newCount);
    } else if (whichBtn === "prev") {
      let newCount = ddCounter - val;
      setDDCounter(newCount);
    }

    console.log(ddCounter);
  };

  return (
    <QuestionContext.Provider
      value={{
        pbQuestions: pbQuestions,
        ctQuestions: ctQuestions,
        ddQuestions: ddQuestions,
        pbQuestionStatus: pbQuestionStatus,
        pbAnswers: pbAnswers,
        ctAnswers: ctAnswers,
        pbStatusComplete: pbCompleteStatus,
        ctQuestionStatus: ctQuestionStatus,
        ctStatusComplete: ctCompleteStatus,
        ddQuestionStatus: ddQuestionStatus,
        ddStatusComplete: ddCompleteStatus,
        getPBQuestion: getPBQ,
        getCTQuestion: getCTQ,
        getDDQuestion: getDDQ,
        createPBQStatus: createPBQuesStatus,
        createCTQStatus: createCTQStatus,
        createDDQStatus: createDDQStatus,
        setDDQStatus: settingDDQStatus,
        setPBQStatus: settingPBQStatus,
        setCTQStatus: settingCTQStatus,
        setPBData: setPBData,
        setCTData: setCTData,
        setDDData: setDDData,
        setPBAnswer: settingPBAnswer,
        setCTAnswer: settingCTAnswer,
        setDDAnswer: settingDDAnswer,
        submitPBAnswers: submittingPBAnswers,
        submitCTAnswers: submittingCTAnswers,
        submitDDAnswers: submittingDDAnswers,
        ddCounter: ddCounter,
        setDDCounter: settingDDCounter,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};
