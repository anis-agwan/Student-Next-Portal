"use client";

import { ProgressBar } from "@/app/components/ProgressBar/ProgressBar";
import { Question } from "@/app/components/Question/Question";
import { QNumberGrid } from "@/app/components/QuestionNumberGrid/QNumberGrid";
import { SECTION } from "@/app/enums/section_enums";
import { QuestionContext } from "@/app/store/questions-context";
import React, { useContext, useEffect, useState } from "react";

export default function QuestionsPage({ searchParams }) {
  const section = searchParams.section;
  const questionCtx = useContext(QuestionContext);
  const [questions, setQuestions] = useState();
  const [loadingData, setLoadingData] = useState(false);

  const [questionNo, setQuestionNo] = useState(0);
  const [noOfQuestions, setNoOfQuestions] = useState(0);
  const [progress, setProgress] = useState(0);

  const getPB = async () => {
    setLoadingData(true);
    console.log(questionCtx.pbQuestions);
    setQuestions(questionCtx.pbQuestions);
    const size = Object.keys(questions).length;
    console.log(size);
    setNoOfQuestions(size);
    setLoadingData(false);
  };

  const nextBtnHandler = () => {
    console.log(questionNo);
    if (questionNo < noOfQuestions) {
      setQuestionNo(questionNo + 1);
    }
    if (progress >= 100) {
      setProgress(0);
    } else {
      const newProgress = Math.floor(((questionNo + 1) / noOfQuestions) * 100);
      setProgress(newProgress);
    }
  };

  const prevBtnHandler = () => {
    console.log(questionNo);
    if (questionNo > 0) {
      setQuestionNo(questionNo - 1);
    }
  };

  useEffect(() => {
    if (section === SECTION.PB) {
      setLoadingData(true);
      // getQuestionsData(section);
      getPB();
      setLoadingData(false);
    }

    console.log(questions);
    console.log(questionNo);
  }, [questions]);

  return (
    <div className="flex justify-center items-center w-screen h-screen text-black">
      {!loadingData && noOfQuestions > 0 ? (
        <div className="flex w-full h-full justify-between items-center gap-2">
          <div className="flex flex-col w-3/4 gap-5 justify-center items-center">
            <div className="h-1/4 pe-20 w-full px-20">
              <ProgressBar completed={progress} />
            </div>
            <div className="h-3/4">
              <Question
                nextBtnHandler={nextBtnHandler}
                prevBtnHandler={prevBtnHandler}
                questionNo={questionNo}
              />
            </div>
          </div>
          <div className="flex w-1/4 justify-center items-center pt-20">
            <QNumberGrid
              noOfQuestions={noOfQuestions}
              whichQues={questionNo}
              // questionStatus={questionStatus}
            />
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col">
            <h1>Loading...</h1>
            <h1>Please go back to instructions page to start again.</h1>
          </div>
        </>
      )}
    </div>
  );
}
