"use client";

import { ProgressBar } from "@/app/components/ProgressBar/ProgressBar";
import { Question } from "@/app/components/Question/Question";
import { QNumberGrid } from "@/app/components/QuestionNumberGrid/QNumberGrid";
import { DD_INPUTS } from "@/app/enums/dd_input";
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
  const [isPrevBtnDisabled, setPrevBtnDisabled] = useState(false);
  const [isNextBtnDisabled, setNextBtnDisabled] = useState(false);
  const [isSubmitBtnDisabled, setSubmitBtnDisabled] = useState(true);

  const [optCount, setOPCount] = useState(0);

  //FOR DD
  const [formValues, setFormValues] = useState([{ rank: "Rank1", value: "" }]);
  const [ratingFormValues, setRatingFormValues] = useState([]);

  const [rankArr, setRankArr] = useState([""]);
  const [rateArr, setRateArr] = useState([""]);

  const handleFormChange = (event, idx, whichOP) => {
    // console.log(rankArr, rateArr);
    console.log(questionCtx.ddAnswers);
    if (formValues.length === optCount) {
      if (ratingFormValues.length === 0) {
        addRatingFields(-1);
      } else if (
        ratingFormValues.length !== optCount &&
        idx + 1 === ratingFormValues.length
      ) {
        addRatingFields(idx);
      }
    }

    if (formValues.length !== optCount && idx + 1 === formValues.length) {
      //   console.log("IDX: ", idx + 1);
      addFields(idx);
    }

    if (whichOP === DD_INPUTS.RANKSR) {
      // questionCtx.setDDQStatus(idx);
      let prevRankArr = rankArr;
      prevRankArr[idx] = event.target.value;
      setRankArr(prevRankArr);
      questionCtx.setDDAnswer(idx, event.target.value, DD_INPUTS.RANKSR);
    } else if (whichOP === DD_INPUTS.RATESR) {
      // questionCtx.setDDQStatus(idx);
      let prevRateArr = rateArr;
      prevRateArr[idx] = event.target.value;
      setRateArr(prevRateArr);
      questionCtx.setDDAnswer(idx, event.target.value, DD_INPUTS.RATESR);
    }
  };

  const ratingCheck = (rateArr) => {
    console.log(rateArr);
    for (let i = 1; i < rateArr.length; i++) {
      if (rateArr[i - 1] < rateArr[i]) {
        // console.log("Rating "+[i]+" less than Rating "+[i+1]+" which is Invalid!\n");
        return true;
      }
      return false;
    }
  };

  const duplicatesCheck = (rankArr) => {
    if (rankArr.length !== new Set(rankArr).size) {
      return true;
    }

    return false;
  };

  const addFields = (idx) => {
    setRankArr([...rankArr, ""]);
    setFormValues([...formValues, { rank: `Rank${idx + 2}`, value: "" }]);
  };

  const addRatingFields = (idx) => {
    setRateArr([...rateArr, ""]);
    setRatingFormValues([
      ...ratingFormValues,
      { rating: `Rating${idx + 2}`, value: "" },
    ]);
  };

  const getPB = async () => {
    setLoadingData(true);
    // console.log(questionCtx.pbQuestions);
    setQuestions(questionCtx.pbQuestions);
    try {
      const size = Object.keys(questions).length;
      console.log("NO OF QUES: ", size);
      setNoOfQuestions(size);
    } catch (err) {
      console.log(err);
    }
    setLoadingData(false);
  };

  const getCT = async () => {
    setLoadingData(true);
    // console.log(questionCtx.ctQuestions);
    setQuestions(questionCtx.ctQuestions);
    try {
      const size = Object.keys(questions).length;
      console.log("NO OF QUES: ", size);
      setNoOfQuestions(size);
    } catch (err) {
      console.log(err);
    }
    setLoadingData(false);
  };

  const getDD = async () => {
    setLoadingData(true);
    console.log(questionCtx.ddQuestions);
    setQuestions(questionCtx.ddQuestions);

    try {
      const size = Object.keys(questions).length;
      console.log("NO OF QUES: ", size);
      setNoOfQuestions(size);
      questionCtx.createDDQStatus(size);
    } catch (err) {
      console.log(err);
    }
    setLoadingData(false);
  };

  const nextBtnHandler = () => {
    // console.log(rankArr, rateArr);
    if (section === SECTION.PB) {
      setSubmitBtnDisabled(questionCtx.pbStatusComplete);
    } else if (section === SECTION.CT) {
      setSubmitBtnDisabled(questionCtx.ctStatusComplete);
    }

    if (
      section === SECTION.DD &&
      !(rankArr.includes(0) || rankArr.includes("")) &&
      !(rateArr.includes(0) || rateArr.includes(""))
    ) {
      if (!(ratingCheck(rateArr) || duplicatesCheck(rankArr))) {
        questionCtx.setDDCounter(optCount, "next", noOfQuestions);
        setRankArr([]);
        setRateArr([]);
        setFormValues([{ rank: "Rank1", value: "" }]);
        setRatingFormValues([]);
        console.log(questionNo);
        questionCtx.setDDQStatus(questionNo);
      } else {
        alert(
          "Invalid: Rank (Ranking should be unique with correct options and should be in descending order)"
        );
        // throw new Error(
        //   "Invalid Rating or Rank (Rating should be unique with correct options and Rank should be in descending order)"
        // );
        return;
      }
      // return;
    }

    // else {
    //   alert("Please fill all the options");
    //   return;
    // }

    // console.log(questionNo + 1, noOfQuestions);
    // console.log(questionNo, noOfQuestions);
    console.log(questionCtx.ddQuestionStatus);
    console.log(questionCtx.ddStatusComplete);
    if (section === SECTION.DD && questionNo + 1 === noOfQuestions) {
      // console.log(questionCtx.ddAnswers);
      questionCtx.setDDQStatus(questionNo);
      console.log(questionCtx.ddQuestionStatus);
      console.log(questionCtx.ddStatusComplete);
      if (!questionCtx.ddQuestionStatus.includes(0)) {
        setSubmitBtnDisabled(false);
      }
    }
    if (questionNo + 1 < noOfQuestions) {
      setQuestionNo(questionNo + 1);
      setPrevBtnDisabled(false);
      setNextBtnDisabled(false);
    } else {
      setNextBtnDisabled(true);

      setPrevBtnDisabled(false);
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
      // if (questionNo - 1 <= 0) {
      //   console.log("NOO");
      //   setBtnDisabled(true);
      // } else {
      //   setBtnDisabled(false);
      // }
      setPrevBtnDisabled(false);
      setNextBtnDisabled(false);

      if (section === SECTION.DD) {
        questionCtx.setDDCounter(optCount, "prev");
        setFormValues([{ rank: "Rank1", value: "" }]);
        setRatingFormValues([]);
      }
    } else {
      setPrevBtnDisabled(true);
      setNextBtnDisabled(false);
    }
  };

  const getOptionsCount = (val) => {
    // console.log(val);
    setOPCount(val);

    // const arr = Array(val).fill(0);
  };

  useEffect(() => {
    // console.log(section);
    if (section === SECTION.PB) {
      setLoadingData(true);
      // getQuestionsData(section);
      getPB();
      setLoadingData(false);
    } else if (section === SECTION.CT) {
      setLoadingData(true);
      getCT();
      setLoadingData(false);
    } else if (section === SECTION.DD) {
      setLoadingData(true);
      getDD();
      setLoadingData(false);
    }

    // console.log(rankArr, rateArr);

    // console.log(questions);
    // console.log(questionNo);
  }, [questions]);

  return (
    <div className="flex justify-center items-center min-w-screen min-h-screen text-black">
      {!loadingData && noOfQuestions > 0 ? (
        <div className="flex w-full h-full justify-between items-center gap-2">
          {!(section === SECTION.DD) ? (
            <>
              <div className="flex flex-col w-3/4 gap-5 justify-center items-center">
                <div className="h-1/4 pe-20 w-full px-20">
                  {section === SECTION.PB && (
                    <ProgressBar completed={progress} />
                  )}
                </div>
                <div className="h-3/4 px-5 w-full">
                  {noOfQuestions > 0 && (
                    <Question
                      nextBtnHandler={nextBtnHandler}
                      prevBtnHandler={prevBtnHandler}
                      questionNo={questionNo}
                      isPrevBtnDisabled={isPrevBtnDisabled}
                      isNextBtnDisabled={isNextBtnDisabled}
                      section={section}
                    />
                  )}
                </div>
              </div>
              <div className="flex w-1/4 justify-center items-center pt-20">
                <QNumberGrid
                  noOfQuestions={noOfQuestions}
                  whichQues={questionNo}
                  isSubmitBtnDisabled={isSubmitBtnDisabled}
                  section={section}
                  // questionStatus={questionStatus}
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col w-full justify-center items-center">
                <div className="h-3/4 px-5 w-full">
                  {noOfQuestions > 0 && (
                    <Question
                      nextBtnHandler={nextBtnHandler}
                      prevBtnHandler={prevBtnHandler}
                      questionNo={questionNo}
                      isPrevBtnDisabled={isPrevBtnDisabled}
                      isNextBtnDisabled={isNextBtnDisabled}
                      section={section}
                      getOPCount={getOptionsCount}
                      isSubmitBtnDisabled={isSubmitBtnDisabled}
                      formValues={formValues}
                      ratingFormValues={ratingFormValues}
                      handleFormChange={handleFormChange}
                    />
                  )}
                </div>
              </div>
            </>
          )}
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
