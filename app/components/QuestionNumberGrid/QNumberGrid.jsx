import React, { useContext, useEffect } from "react";
import "./QNumberGrid.css";
import { AuthButton } from "../Buttons/AuthButton/AuthButton";
import { StartButton } from "../Buttons/StartButton/StartButton";
import { QuestionContext } from "@/app/store/questions-context";
import { AuthContext } from "@/app/store/auth-context";
import { useRouter } from "next/navigation";

export const QNumberGrid = ({
  noOfQuestions,
  whichQues,
  isSubmitBtnDisabled,
  section,
}) => {
  const router = useRouter();
  const questionCtx = useContext(QuestionContext);
  const authCtx = useContext(AuthContext);
  const questionStatus = questionCtx.pbQuestionStatus;

  // console.log(section);

  const submitAnswers = () => {
    authCtx.onUpdateStats(section);
    questionCtx
      .submitPBAnswers()
      .then(() => {
        router.push("Quiz/EndScreen");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="boxContainer overflow-auto gap-3 p-5">
      <div className=" questionHeading">
        Question {whichQues + 1}/{noOfQuestions}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg: grid-cols-4 gap-y-2 justify-around items-center">
        {/* {arr.map((value, idx) => {
          return (
            <div key={idx} className="circleDiv text-white">
              {value}
            </div>
          );
        })} */}

        {Array(noOfQuestions)
          .fill(1)
          .map((value, idx) => {
            return (
              <div
                key={idx}
                className={
                  whichQues == idx
                    ? "circleDivCurrent"
                    : questionStatus[idx] == 1
                    ? "circleDivComplete"
                    : "circleDiv"
                }
              >
                {idx + 1}
              </div>
            );
          })}
      </div>
      <div className=" pt-5" onClick={submitAnswers}>
        <StartButton
          buttonText={"Submit"}
          isBtnDisabled={isSubmitBtnDisabled}
        />
      </div>
    </div>
  );
};
