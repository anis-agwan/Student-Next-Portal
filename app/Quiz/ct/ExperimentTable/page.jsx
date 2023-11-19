import { ArrowButton } from "@/app/components/Buttons/ArrowButton/ArrowButton";
import tableImg from "./ddtable.png";
import "./ExperimentTable.css";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { StartButton } from "@/app/components/Buttons/StartButton/StartButton";

export default function ExperimentTable() {
  return (
    <div className=" flex flex-col justify-evenly items-center h-screen w-screen pt-24 px-10 pb-5 text-black">
      <h1 className="titleText flex">Results and Findings of Experiment</h1>
      <div className="flex">
        <div className="flex items-center justify-center">
          <div className="rotate-180">
            <Link href={"ExperimentDetails"}>
              <ArrowButton />
            </Link>
          </div>

          <div className="flex justify-center imgContainer">
            <Image src={tableImg} alt="Table" className="tableImg" />
          </div>

          <div>
            <ArrowButton />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="flex items-center">
          <p>
            The scientists concluded that the oil additive significantly reduced
            engine problems.
            <br />
            (10 engines were used in each group. A total of 80 engines were used
            in the experiment.)
          </p>
        </div>
        <Link href={""}>
          <StartButton buttonText={"Start"} />
        </Link>
      </div>
    </div>
  );
}
