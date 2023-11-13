"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export const QuestionContext = createContext({
  pbQuestions: {},
  pbQuestionStatus: [],
  getPBQuestion: () => {},
  createPBQStatus: () => {},
  setPBQStatus: (idx) => {},
  setPBData: ({}) => {},
});

export const QuestionContextProvider = ({ children }) => {
  const [pbQuestions, setPBQuestions] = useState(null);
  const [pbQuestionStatus, setPBQStatus] = useState([]);

  const basePBCT = "http://3.14.232.42";

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
    console.log("IS WORKING");
    setPBQuestions(data);
  };

  const createPBQuesStatus = (size) => {
    const arr = Array(size).fill(0);
    setPBQStatus(arr);
  };

  const settingPBQStatus = (idx) => {
    let prevArr = pbQuestionStatus;
    prevArr[idx] = 1;
    console.log(prevArr);
    setPBQStatus(prevArr);
  };

  return (
    <QuestionContext.Provider
      value={{
        pbQuestions: pbQuestions,
        pbQuestionStatus: pbQuestionStatus,
        getPBQuestion: getPBQ,
        createPBQStatus: createPBQuesStatus,
        setPBQStatus: settingPBQStatus,
        setPBData: setPBData,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};
