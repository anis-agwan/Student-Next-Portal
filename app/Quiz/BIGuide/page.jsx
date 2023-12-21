import React from "react";
import { instructionsData } from "../QuizInstruction/InstructionsData";
import { SECTION } from "@/app/enums/section_enums";
import "./BIGuide.css";
import Image from "next/image";

import diagram from "./diagram.png";

const getInstData = (sectionName) => {
  if (sectionName === SECTION.BI) {
    console.log(instructionsData[SECTION.BI]);
    return instructionsData[SECTION.BI];
  }
};

export default function BIGuide({ searchParams }) {
  const section = searchParams.section;
  const data = getInstData(section);
  return (
    <div className="flex justify-center min-h-full w-full text-black pt-14">
      <div className="flex flex-col justify-center items-center gap-5 pt-8">
        <h1 className="titleText justify-center  flex">
          Participant Interview Guide
        </h1>
        <div className="flex w-5/6">
          <div className="flex flex-col gap-8 pb-6">
            {data.sections.map((instruction, idx) => {
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-md border-2	shadow-sm "
                >
                  <div className="flex gap-2">
                    <p className="sectionTitle ">{instruction.section}: </p>
                    <p className="sectionTitle ">{instruction.sectitle}</p>
                  </div>
                  {idx == 1 ? (
                    <>
                      <div>
                        <p className="sectionSub pt-4">
                          General Background Information
                        </p>
                        <p className="instructionText ">
                          {instruction.description}
                        </p>
                        <br />
                        <p className="sectionSub ">Your Task</p>
                        <p className="instructionText ">{instruction.task}</p>

                        <br />
                        <p className="sectionSub ">Keep In Mind</p>
                        <p className="instructionText ">
                          {instruction.keepInMind}
                        </p>
                      </div>
                    </>
                  ) : idx === 3 ? (
                    <>
                      <div>
                        <p className="sectionSub pt-4">
                          General Background Information
                        </p>
                        <p className="instructionText ">
                          {instruction.description.substring(0, 133)}
                        </p>
                        <Image src={diagram} className="w-5/6" />
                        <p className="instructionText ">
                          {instruction.description.substring(134)}
                        </p>
                        <br />
                        <p className="sectionSub ">
                          The primary problems seem to be as follows:
                        </p>
                        <ul className="instructionText">
                          {instruction.problems.map((prob, idx) => {
                            return (
                              <div key={idx} className="px-4 pt-2">
                                <li>{prob}</li>
                              </div>
                            );
                          })}
                        </ul>

                        <br />
                        <p className="instructionText ">
                          {instruction.keepInMind}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="instructionText ">
                          {instruction.description}
                        </p>
                      </div>
                    </>
                  )}
                  <br />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
