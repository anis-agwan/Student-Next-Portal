import React from "react";
import { Card } from "../components/SelectionCards/Card";
import { SECTION } from "../enums/section_enums";

export default function SelectionScreen() {
  return (
    <div className=" flex justify-evenly	items-center bg-gray-800 h-screen">
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
  );
}
