"use client";
import React, { useContext, useEffect, useState } from "react";
import { instructionsData } from "./InstructionsData";
import "./QuizInstruction.css";
import { StartButton } from "@/app/components/Buttons/StartButton/StartButton";
import Link from "next/link";
import { SECTION } from "@/app/enums/section_enums";
import { SECTIONTYPE } from "@/app/enums/section_type";
import { ArrowButton } from "@/app/components/Buttons/ArrowButton/ArrowButton";
import { AuthContext } from "@/app/store/auth-context";
import { QuestionContext } from "@/app/store/questions-context";
import { useDispatch } from "react-redux";
import { fetchPBQuestions } from "@/app/redux-store/pbQuiz/pb-actions";
import { fetchCTQuestions } from "@/app/redux-store/ctQuiz/ct-actions";

const getInstData = (sectionName, type) => {
  if (sectionName === SECTION.PB) {
    return type === SECTIONTYPE.information
      ? instructionsData[SECTION.PB][SECTIONTYPE.information]
      : instructionsData[SECTION.PB][SECTIONTYPE.instructions];
  } else if (sectionName === SECTION.CT) {
    return instructionsData[SECTION.CT];
  } else if (sectionName === SECTION.DD) {
    return instructionsData[SECTION.DD];
  } else if (sectionName === SECTION.BI) {
    console.log(instructionsData[SECTION.BI]);
    return instructionsData[SECTION.BI];
  }
};

export default function QuizInstruction({ searchParams }) {
  const section = searchParams.section;
  const type = searchParams.type;

  const questionCtx = useContext(QuestionContext);

  const data = getInstData(section, type);

  const dispatch = useDispatch();

  const getQuestionsData = async (sectionName) => {
    if (sectionName === SECTION.PB) {
      // console.log(questionCtx.pbQuestions);
      // if (questionCtx.pbQuestions === null) {
      //   // setLoadingData(true);
      //   try {
      //     let data = {};
      //     await questionCtx.getPBQuestion().then((res) => {
      //       data = res;
      //     });

      //     // console.log(data);

      //     questionCtx.setPBData(data);
      //     questionCtx.createPBQStatus(Object.keys(data).length);

      //     // setQuestions(data);
      //   } catch (err) {
      //     console.log(err);
      //   }
      // }
      dispatch(fetchPBQuestions())
    } else if (sectionName === SECTION.CT) {
      dispatch(fetchCTQuestions())
    } else if (sectionName === SECTION.DD) {
      console.log(questionCtx.ddQuestions);
      if (questionCtx.ddQuestions === null) {
        // console.log("NULL");
        try {
          let data = {};
          await questionCtx.getDDQuestion().then((res) => {
            data = res;
          });
          console.log(data);

          questionCtx.setDDData(data);
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  useEffect(() => {
    getQuestionsData(section);
  }, []);

  return (
    <div className=" flex flex-col justify-evenly	items-center h-screen pt-20 px-10 pb-5">
      {section !== SECTION.BI && (
        <>
          <h1 className="titleText flex">INSTRUCTIONS</h1>

          <div>
            {data.instructionArr.map((instruction, idx) => {
              return (
                <div key={idx}>
                  <p className="instructionText ">{instruction}</p>
                  <br />
                </div>
              );
            })}
          </div>
        </>
      )}

      {section === SECTION.PB &&
        (type === SECTIONTYPE.information ? (
          <Link
            href={{
              pathname: data.routeTo,
              query: {
                section: SECTION.PB,
                type: SECTIONTYPE.instructions,
              },
            }}
          >
            <ArrowButton />
          </Link>
        ) : (
          <Link
            href={{
              pathname: "/Quiz/Questions",
              query: {
                section: SECTION.PB,
              },
            }}
          >
            <StartButton buttonText={"Start Quiz"} />
          </Link>
        ))}

      {/* {type === SECTIONTYPE.information ? (
        <Link
          href={{
            pathname: data.routeTo,
            query: {
              section: SECTION.PB,
              type: SECTIONTYPE.instructions,
            },
          }}
        >
          <ArrowButton />
        </Link>
      ) : (
        <Link
          href={{
            pathname: "/Quiz/Questions",
            query: {
              section: SECTION.PB,
            },
          }}
        >
          <StartButton buttonText={"Start Quiz"} />
        </Link>
      )} */}

      {section === SECTION.CT && (
        <Link
          href={{
            pathname: data.routeTo,
            query: {
              section: SECTION.CT,
            },
          }}
        >
          <ArrowButton />
        </Link>
      )}

      {section === SECTION.DD && (
        <Link
          href={{
            pathname: "/Quiz/Questions",
            query: {
              section: SECTION.DD,
            },
          }}
        >
          <ArrowButton />
        </Link>
      )}
    </div>
  );
}
