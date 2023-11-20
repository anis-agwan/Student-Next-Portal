import React, { useContext, useEffect, useState } from "react";
import "./Question.css";
import { OptionsButton } from "./OptionsButton/OptionsButton";
import { StartButton } from "../Buttons/StartButton/StartButton";
import { QuestionContext } from "@/app/store/questions-context";
import { SECTION } from "@/app/enums/section_enums";

export const Question = ({
  nextBtnHandler,
  prevBtnHandler,
  questionNo,
  isPrevBtnDisabled,
  isNextBtnDisabled,
  section,
}) => {
  const questionCtx = useContext(QuestionContext);

  let question = null;
  if (section === SECTION.PB) {
    question = questionCtx.pbQuestions[questionNo];
  } else if (section === SECTION.CT) {
    question = questionCtx.ctQuestions[questionNo];
  }

  // const [questionStatus, setQuesStatus] = useState([]);
  const questionOptions = [
    question.ansOption1,
    question.ansOption2,
    question.ansOption3,
  ];

  useEffect(() => {
    console.log(question);
    // setQuesStatus(questionCtx.pbQuestionStatus);
  }, []);

  const ansButtonHandler = (idx, answer) => {
    // console.log("Q: ", idx + 1, " ANS: ", answer);
    if (section === SECTION.PB) {
      questionCtx.setPBQStatus(idx);
      questionCtx.setPBAnswer(idx, answer);
    } else if (section === SECTION.CT) {
      console.log(answer);
      questionCtx.setCTQStatus(idx);
      questionCtx.setCTAnswer(idx, answer);
    }
  };

  return (
    <div className="flex flex-col gap-3 justify-center px-10 ">
      {section === SECTION.PB && (
        <>
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
        </>
      )}
      {section === SECTION.CT && (
        <>
          <div>
            <div>
              <h2 className="sectionNumber">Section {question.secNum}</h2>
            </div>
            <div>
              <h2 className="sectionDesc"> {question.secDesc}</h2>
            </div>
          </div>
          <div>
            <div>
              <h2 className="sectionNumber">Question {question.quesNum}</h2>
            </div>
            <div>
              {question.quesOption2 !== "" ? (
                <ol className="list-[lower-roman]">
                  <li>
                    <h2 className="sectionDesc">{question.quesOption1}</h2>
                  </li>
                  <li>
                    <h2 className="sectionDesc">{question.quesOption2}</h2>
                  </li>
                </ol>
              ) : (
                <h2 className="sectionDesc">{question.quesOption1}</h2>
              )}
            </div>
          </div>
        </>
      )}
      {section === SECTION.PB && (
        <>
          <div className="flex flex-col optionsDiv gap-y-2 items-center">
            {question.options.map((q, idx) => {
              return (
                <OptionsButton
                  key={idx}
                  buttonText={q.value}
                  handler={ansButtonHandler}
                  idx={questionNo}
                  answer={q.idx}
                />
              );
            })}
          </div>
        </>
      )}
      {section === SECTION.CT && (
        <>
          <div className="flex flex-col optionsDiv gap-y-2 items-center">
            {questionOptions.map((q, idx) => {
              return (
                <OptionsButton
                  key={idx + 1}
                  buttonText={q}
                  handler={ansButtonHandler}
                  idx={questionNo}
                  answer={idx + 1}
                  className="text-xs"
                />
              );
            })}
          </div>
        </>
      )}
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
