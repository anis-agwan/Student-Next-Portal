"use client";
import React, { useContext } from "react";
import { instructionsData } from "./InstructionsData";
import "./QuizInstruction.css";
import { StartButton } from "@/app/components/Buttons/StartButton/StartButton";
import Link from "next/link";
import { SECTION } from "@/app/enums/section_enums";
import { SECTIONTYPE } from "@/app/enums/section_type";
import { ArrowButton } from "@/app/components/Buttons/ArrowButton/ArrowButton";
import { AuthContext } from "@/app/store/auth-context";

const getInstData = (sectionName, type) => {
  if (sectionName === SECTION.PB) {
    return type === SECTIONTYPE.information
      ? instructionsData[SECTION.PB][SECTIONTYPE.information]
      : instructionsData[SECTION.PB][SECTIONTYPE.instructions];
  } else if (sectionName === SECTION.CT) {
    return instructionsData[SECTION.CT];
  } else if (sectionName === SECTION.DD) {
    return instructionsData[SECTION.DD];
  }
};

export default function QuizInstruction({ searchParams }) {
  const section = searchParams.section;
  const type = searchParams.type;

  const authCtx = useContext(AuthContext);

  console.log(authCtx.isLoggedIn);

  const data = getInstData(section, type);
  // console.log(data);

  return (
    <div className=" flex flex-col justify-evenly	items-center h-screen pt-20 px-10 pb-5">
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

      {type === SECTIONTYPE.information ? (
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
        <Link href="">
          <StartButton />
        </Link>
      )}
    </div>
  );
}
