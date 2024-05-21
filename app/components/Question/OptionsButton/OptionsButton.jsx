import React from "react";
import "./OptionsButton.css";
import { SECTION } from "@/app/enums/section_enums";

export const OptionsButton = ({ buttonText, handler, idx, answer, section }) => {
  return (
    <div className="flex w-full justify-center px-1">
      <button
        className={section === SECTION.DD ? "optionsArrangementDD" : "optionsArrangement"}
        onClick={() => handler(idx, answer)}
        disabled={section === SECTION.DD ? true : false}
      >
        {buttonText}
      </button>
    </div>
  );
};
