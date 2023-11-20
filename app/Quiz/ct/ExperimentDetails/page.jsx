"use client";

import { StartButton } from "@/app/components/Buttons/StartButton/StartButton";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

import "./ExperimentDetails.css";
import { ArrowButton } from "@/app/components/Buttons/ArrowButton/ArrowButton";
import { QuestionContext } from "@/app/store/questions-context";

export default function ExperimentDetails() {
  const questionCtx = useContext(QuestionContext);
  const [questions, setQuestions] = useState();

  const getQuestionsData = async () => {
    console.log("RUNNING");
    console.log(questionCtx.ctQuestions);
    if (questionCtx.ctQuestions === null) {
      // setLoadingData(true);
      try {
        let data = {};
        await questionCtx.getCTQuestion().then((res) => {
          data = res;
        });

        // console.log(data);

        questionCtx.setCTData(data);
        questionCtx.createCTQStatus(Object.keys(data).length);

        setQuestions(data);
      } catch (err) {}
    }
  };

  useEffect(() => {
    getQuestionsData();
  }, []);

  return (
    <div className=" flex flex-col justify-evenly items-center h-screen pt-20 px-10 pb-5 gap-y-1 text-black">
      <h1 className="titleText flex">Experiment Description</h1>
      <div className="flex justify-center max-h-2/3">
        <div className="flex flex-col gap-y-3">
          <p className="instructionText ">
            An experiment was performed by two scientists, Dr. J. Roberts and
            Dr. R. Brown, of the New Product Development Center at Brax
            Petroleum Co. The scientists were interested in what happens to
            heavy equipment machine engines that use a new oil additive
            manufactured by Brax Petroleum.
          </p>
          <p className="instructionText ">
            Four commonly used engine types were obtained from the
            manufacturers. These were new engines, which had never been used
            before. Each engine type was split into two equal groups of 10. The
            engines were run in a simulated environment designed to provide the
            equivalent of running at normal load capacity and speed for 40,000
            miles. This is approximately one year of normal usage for these
            types of engines. Oil was changed every 4,000 miles, i.e., 10 times
            during this testing period. One half of the engine group (10 for
            each type of engine) used a common oil for all oil changes and
            general usage. The other half of the engine group (again, 10 for
            each type of engine) used the engine oil plus the newly developed
            oil additive from Brax petroleum.
          </p>
          <p className="instructionText ">
            During this testing period, any engine repairs that were required,
            as determined by a team of three mechanics, were made to the
            engines. The numbers and types of repairs were recorded by the
            mechanics. At the end of the 40,000-mile testing period, the engines
            were thoroughly reviewed by the mechanics following a standard
            20-point checklist. To pass the final checklist, an engine needed to
            pass all 20 points. The number of engines that did not pass
            inspection was noted.
          </p>
          <p className="instructionText ">
            The results of the experiment are shown in the chart on the Results
            Table page.
          </p>
          <p className="instructionText ">
            Click on the “Results Table” button to go to the Results Table page.
          </p>
        </div>
      </div>
      <Link href={"ExperimentTable"}>
        <ArrowButton />
      </Link>
    </div>
  );
}
