import React, { useContext, useEffect, useState } from "react";
import "./Question.css";
import { OptionsButton } from "./OptionsButton/OptionsButton";
import { StartButton } from "../Buttons/StartButton/StartButton";
import { QuestionContext } from "@/app/store/questions-context";

export const Question = ({ nextBtnHandler, prevBtnHandler, questionNo }) => {
  const questionCtx = useContext(QuestionContext);
  const question = questionCtx.pbQuestions[questionNo];
  // const [questionStatus, setQuesStatus] = useState([]);

  useEffect(() => {
    console.log(question);
    // setQuesStatus(questionCtx.pbQuestionStatus);
  }, []);

  const ansButtonHandler = (idx) => {
    questionCtx.setPBQStatus(idx);
  };

  return (
    <div className="flex flex-col gap-3 justify-center px-10">
      <div>
        <div>
          <h2 className="questionNumber">Question {question.quesNum}</h2>
        </div>
      </div>
      <div>
        <div>
          <h2 className="questionDesc">{question.quesDesc}</h2>
        </div>
      </div>
      <div className="flex flex-col optionsDiv gap-y-2 items-center">
        {question.options.map((q) => {
          return (
            <OptionsButton
              key={q.idx}
              buttonText={q.value}
              handler={ansButtonHandler}
              idx={questionNo}
            />
          );
        })}
      </div>
      <div className="flex justify-around">
        <div onClick={prevBtnHandler}>
          <StartButton buttonText={"Prev"} />
        </div>
        <div onClick={nextBtnHandler}>
          <StartButton buttonText={"Next"} />
        </div>
      </div>
    </div>
  );
};
