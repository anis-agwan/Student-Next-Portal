import React from "react";
import { SECTION } from "../../enums/section_enums";
import Image from "next/image";
import juicy_multitasking from "./juicy-multitasking.gif";
import juicy_team_analyzes from "./juicy-team-analyzes-graphs-and-diagrams.gif";
import juicy_business from "./juicy-business-coach-explains-the-material-to-the-woman.gif";
import "./Card.css";
import Link from "next/link";
import { ArrowButton } from "../Buttons/ArrowButton/ArrowButton";
import { SECTIONTYPE } from "@/app/enums/section_type";

export const Card = ({ section }) => {
  return (
    <div className="flex justify-center p-7 p-5">
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
        <div>
          {section === SECTION.PB && (
            <h1 className="title">Personal Beliefs</h1>
          )}
          {section === SECTION.CT && (
            <h1 className="title">Critical Analysis</h1>
          )}
          {section === SECTION.DD && (
            <h1 className="title">Difficult Decisions</h1>
          )}
          <p className="description">
            This section consists of a number of statements about various
            issues. You need to select the extent to which you agree or disagree
            with each statement. There are no right or wrong answers in this
            section. You should respond accurately and candidly.
          </p>
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
        </div>
      </div>
    </div>
  );
};
