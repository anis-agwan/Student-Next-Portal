import React from "react";
import "./Question.css";

export const PBQuestion = ({ question }) => {
  return (
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
    </>
  );
};
