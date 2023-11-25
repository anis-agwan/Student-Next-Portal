import React from "react";
import { Card } from "../components/SelectionCards/Card";
import { SECTION } from "../enums/section_enums";

export default function SelectionScreen() {
  return (
    <div className=" flex  min-h-screen justify-center items-center text-black ">
      <div className="flex justify-evenly items-center h-full w-11/12 pb-5">
        <div>
          <Card section={SECTION.PB} />
        </div>
        <div>
          <Card section={SECTION.CT} />
        </div>
        <div>
          <Card section={SECTION.DD} />
        </div>
      </div>
    </div>
  );
}
