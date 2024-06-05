import React, { useContext, useEffect } from "react";
import "./QNumberGrid.css";
import { AuthButton } from "../Buttons/AuthButton/AuthButton";
import { StartButton } from "../Buttons/StartButton/StartButton";
// import { QuestionContext } from "@/app/store/questions-context";
import { AuthContext } from "@/app/store/auth-context";
import { useRouter } from "next/navigation";
import { SECTION } from "@/app/enums/section_enums";
import { useDispatch, useSelector } from "react-redux";
import { rdxSubmitPBAnswers } from "@/app/redux-store/pbQuiz/pb-actions";
import { rdxSubmitCTAnswers } from "@/app/redux-store/ctQuiz/ct-actions";

export const QNumberGrid = ({
  noOfQuestions,
  whichQues,
  isSubmitBtnDisabled,
  section,
}) => {
  const router = useRouter();
  // const questionCtx = useContext(QuestionContext);
  const authCtx = useContext(AuthContext);
  let questionStatus = [];

  if (section === SECTION.PB) {
    // console.log(isSubmitBtnDisabled)
    questionStatus = useSelector((state) => state.pb.pbQuestionIdxStatus);
  } else if (section === SECTION.CT) {
    // console.log(questionCtx.ctQuestionStatus);
    // questionStatus = questionCtx.ctQuestionStatus;
    questionStatus = useSelector((state) => state.ct.ctQuestionIdxStatus);
  }

  const dispatch = useDispatch();
  const pbAnswers = useSelector((state) => state.pb.pbAnswers)
  const ctAnswers = useSelector((state) => state.ct.ctAnswers)

  // console.log(section);

  const submitAnswers = () => {
    authCtx.onUpdateStats(section);
    if(!questionStatus.includes(0)) {
      if (section === SECTION.PB) {
        dispatch(
          rdxSubmitPBAnswers(pbAnswers)
        )
        router.push("EndScreen");
        // questionCtx
        //   .submitPBAnswers()
        //   .then(() => {
        //     router.push("EndScreen");
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
       
      } else if (section === SECTION.CT) {
        // console.log("CLICKS CT");
        dispatch(
          rdxSubmitCTAnswers(ctAnswers)
        )
        router.push("EndScreen");
        // questionCtx.submitCTAnswers().then((res) => {
        //   if (res) {
        //     router.push("EndScreen");
        //   }
        // });
      }

    } else {
      alert("Please complete the assessment with all answers.");
    }
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
