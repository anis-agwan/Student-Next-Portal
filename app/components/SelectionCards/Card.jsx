import React, { useContext } from "react";
import { SECTION } from "../../enums/section_enums";
import Image from "next/image";
import juicy_multitasking from "./juicy-multitasking.gif";
import juicy_team_analyzes from "./juicy-team-analyzes-graphs-and-diagrams.gif";
import juicy_business from "./juicy-business-coach-explains-the-material-to-the-woman.gif";
import "./Card.css";
import Link from "next/link";
import { ArrowButton } from "../Buttons/ArrowButton/ArrowButton";
import { SECTIONTYPE } from "@/app/enums/section_type";
import { AuthContext } from "@/app/store/auth-context";

export const Card = ({ section }) => {
  return (
    <div className="flex justify-center pt-20 px-8">
      <div className="card">
        {section === SECTION.PB && (
          <Image src={juicy_multitasking} alt="PB" className="cardImg" />
        )}
        {section === SECTION.CT && (
          <Image src={juicy_team_analyzes} alt="CT" className="cardImg" />
        )}
        {section === SECTION.DD && (
          <Image src={juicy_business} alt="DD" className="cardImg" />
        )}
        {section === SECTION.BI && (
          <Image src={juicy_business} alt="DD" className="cardImg" />
        )}
        <div className="flex flex-col items-center">
          {section === SECTION.PB && (
            <h1 className="title">Personal Beliefs</h1>
          )}
          {section === SECTION.CT && (
            <h1 className="title">Critical Analysis</h1>
          )}
          {section === SECTION.DD && (
            <h1 className="title">Difficult Decisions</h1>
          )}{" "}
          {section === SECTION.BI && (
            <h1 className="title">Behavioral Interview</h1>
          )}
          {section === SECTION.BI ? (
            <>
              <p className="description">
                This section has a guide that features two behavioral interview
                simulations with no right or wrong answers. Feel free to
                structure the meeting and facility as you see fit. Respond
                candidly to showcase your abilities
              </p>
            </>
          ) : (
            <>
              <p className="description">
                This section consists of a number of statements about various
                issues. You need to select the extent to which you agree or
                disagree with each statement. There are no right or wrong
                answers in this section. You should respond accurately and
                candidly.
              </p>
            </>
          )}
          {section === SECTION.PB && (
            <Link
              href={{
                pathname: "/Quiz/QuizInstruction",
                query: {
                  section: SECTION.PB,
                  type: SECTIONTYPE.information,
                },
              }}
            >
              <ArrowButton />
            </Link>
          )}
          {section === SECTION.CT && (
            <Link
              href={{
                pathname: "/Quiz/QuizInstruction",
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
                pathname: "/Quiz/QuizInstruction",
                query: {
                  section: SECTION.DD,
                },
              }}
            >
              <ArrowButton />
            </Link>
          )}
          {section === SECTION.BI && (
            <Link
              href={{
                pathname: "/Quiz/BIGuide",
                query: {
                  section: SECTION.BI,
                },
              }}
            >
              <ArrowButton />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
