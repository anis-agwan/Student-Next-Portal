import React, { useContext, useEffect, useState } from "react";
import "./Question.css";
import { OptionsButton } from "./OptionsButton/OptionsButton";
import { StartButton } from "../Buttons/StartButton/StartButton";
import { QuestionContext } from "@/app/store/questions-context";

export const Question = ({
  nextBtnHandler,
  prevBtnHandler,
  questionNo,
  isPrevBtnDisabled,
  isNextBtnDisabled,
}) => {
  const questionCtx = useContext(QuestionContext);
  const question = questionCtx.pbQuestions[questionNo];
  // const [questionStatus, setQuesStatus] = useState([]);

  useEffect(() => {
    // console.log(question);
    // setQuesStatus(questionCtx.pbQuestionStatus);
  }, []);

  const ansButtonHandler = (idx, answer) => {
    // console.log("Q: ", idx + 1, " ANS: ", answer);
    questionCtx.setPBQStatus(idx);
    questionCtx.setPBAnswer(idx, answer);
  };

  return (
    <div className="flex flex-col gap-3 justify-center px-10 ">
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
              answer={q.idx}
            />
          );
        })}
      </div>
      <div className="flex justify-around">
        <div onClick={prevBtnHandler}>
          <StartButton buttonText={"Prev"} isBtnDisabled={isPrevBtnDisabled} />
        </div>
        <div onClick={nextBtnHandler}>
          <StartButton buttonText={"Next"} isBtnDisabled={isNextBtnDisabled} />
        </div>
      </div>
    </div>
  );
};
