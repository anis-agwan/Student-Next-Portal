import React, { useContext, useEffect, useState } from "react";
import "./Question.css";
import { OptionsButton } from "./OptionsButton/OptionsButton";
import { StartButton } from "../Buttons/StartButton/StartButton";
// import { QuestionContext } from "@/app/store/questions-context";
import { SECTION } from "@/app/enums/section_enums";
import { RateInputField } from "./RatinInputField/RateInputField";
import { AuthContext } from "@/app/store/auth-context";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { pbActions } from "@/app/redux-store/pbQuiz/pb-slice";
import { ctActions } from "@/app/redux-store/ctQuiz/ct-slice";
import { rdxSubmitDDAnswers } from "@/app/redux-store/ddQuiz/dd-actions";

export const Question = ({
  nextBtnHandler,
  prevBtnHandler,
  questionNo,
  isPrevBtnDisabled,
  isNextBtnDisabled,
  section,
  getOPCount,
  isSubmitBtnDisabled,
  formValues,
  ratingFormValues,
  handleFormChange,
}) => {
  // const questionCtx = useContext(QuestionContext);
  const authCtx = useContext(AuthContext);
  const router = useRouter();
  const dispatch = useDispatch();
  const ddQuestionIdxStatus = useSelector((state) => state.dd.ddQuestionIdxStatus)
  const ddAnswers = useSelector((state) => state.dd.ddAnswers)
  

  let sectionWhich = null;
  let sectionQuestions = null;
  if (section === SECTION.PB) {
    // question = questionCtx.pbQuestions[questionNo];
    sectionWhich = "pb"
    sectionQuestions = "pbQuestions"
    // question = useSelector((state) => state.pb.pbQuestions[questionNo]);
    
  } else if (section === SECTION.CT) {
    // question = questionCtx.ctQuestions[questionNo];
    sectionWhich = "ct"
    sectionQuestions = "ctQuestions"
    // question = useSelector((state) => state.ct.ctQuestions[questionNo]);
    
  } else if (section === SECTION.DD) {
    sectionWhich = "dd"
    sectionQuestions = "ddQuestions"
    // question = questionCtx.ddQuestions[questionNo];
    // question = useSelector((state) => state.dd.ddQuestions[questionNo]);
  }

  const question = useSelector((state) => state[sectionWhich][sectionQuestions][questionNo]);

  function createOptionsArr(q) {
    // console.log(q)
    let arr = [];
    for (const [key, value] of Object.entries(q)) {
      if (key === "r1Text" && value !== null) {
        arr.push({
          r1Text: "r1Text",
          value: value,
        });
      } else if (key === "r2Text" && value !== null) {
        arr.push({
          r2Text: "r2Text",
          value: value,
        });
      } else if (key === "r3Text" && value !== null) {
        arr.push({
          r3Text: "r3Text",
          value: value,
        });
      } else if (key === "r4Text" && value !== null) {
        arr.push({
          r4Text: "r4Text",
          value: value,
        });
      } else if (key === "r5Text" && value !== null) {
        arr.push({
          r5Text: "r5Text",
          value: value,
        });
      } else if (key === "r6Text" && value !== null) {
        arr.push({
          r6Text: "r6Text",
          value: value,
        });
      }
    }
// console.log(arr);
    return arr;
    
  }

  // const [questionStatus, setQuesStatus] = useState([]);
  let questionOptions = [];

  if (section === SECTION.CT) {
    questionOptions = [
      question.ansOption1,
      question.ansOption2,
      question.ansOption3,
    ];
  } else if (section === SECTION.DD) {
    questionOptions = createOptionsArr(question);
    // console.log(questionOptions);
    // console.log(questionOptions.length);
  }

  const onSubmitAnswers = async () => {
    await authCtx.onUpdateStats(section);

    if(!ddQuestionIdxStatus.includes(0)) {
      dispatch(rdxSubmitDDAnswers(ddAnswers))
      router.push("/Quiz/EndScreen");
    } else {
      alert("Please complete the assessment with all answers.");
    }

    

    // await questionCtx
    //   .submitDDAnswers()
    //   .then((res) => {
    //     router.push("/Quiz/EndScreen");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  useEffect(() => {
    // console.log(question);
    // setQuesStatus(questionCtx.pbQuestionStatus);
    if (section === SECTION.DD) {
      getOPCount(questionOptions.length);
    }
  }, [questionOptions]);

  const ansButtonHandler = (idx, answer) => {
    // console.log("Q: ", idx + 1, " ANS: ", answer);
    if (section === SECTION.PB) {
      dispatch(pbActions.rdxChangePBIdxStatus({
        idx: idx
      }))
      // questionCtx.setPBQStatus(idx);
      dispatch(pbActions.rdxSetPBAnswers({
        questionNo: idx,
        answer: answer
      }))
      
      // questionCtx.setPBAnswer(idx, answer);
    } else if (section === SECTION.CT) {
      // console.log(answer);
      dispatch(ctActions.rdxChangeCTIdxStatus({
        idx:idx
      }))

      dispatch(ctActions.rdxSetCTAnswers({
        questionNo: idx,
        answer: answer
      }))

      // questionCtx.setCTQStatus(idx);
      // questionCtx.setCTAnswer(idx, answer);
    }
  };

  return (
    <div className="flex flex-col gap-3 justify-center px-10 pb-8">
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
      {section === SECTION.DD && (
        <>
          <div className="pt-20">
            <div>
              <h2 className="sectionNumber">Section {question.snum}</h2>
            </div>
            <div>
              <h2 className="sectionDesc"> {question.stext}</h2>
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
      {section === SECTION.DD && (
        <>
          <div className="flex flex-col optionsDiv gap-y-2 items-center">
            {questionOptions.map((q, idx) => {
              return (
                <>
                  <div >
                  <OptionsButton
                    key={idx + 1}
                    buttonText={`Option ${idx + 1}: ${q.value} `}
                    handler={() => {
                      alert("Fill the below forms for rankings and ratings");
                    }}
                    idx={questionNo}
                    answer={idx + 1}
                    className="text-xs"
                    section={section}
                  />
                  </div>
                </>
              );
            })}
          </div>
        </>
      )}
      {section === SECTION.DD && (
        <>
          <div className="pt-8">
            {questionOptions.length > 0 && (
              <RateInputField
                noOfOptions={questionOptions.length}
                formValues={formValues}
                ratingFormValues={ratingFormValues}
                handleFormChange={handleFormChange}
              />
            )}
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
        {section === SECTION.DD && (
          <div onClick={onSubmitAnswers}>
            <StartButton
              buttonText={"Submit"}
              isBtnDisabled={isSubmitBtnDisabled}
            />
          </div>
        )}
      </div>
    </div>
  );
};
