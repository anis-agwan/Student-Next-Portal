import React from "react";
import "./OptionsButton.css";

export const OptionsButton = ({ buttonText, handler, idx, answer }) => {
  return (
    <div className="flex w-full justify-center px-1">
      <button
        className="optionsArrangement"
        onClick={() => handler(idx, answer)}
      >
        {buttonText}
      </button>
    </div>
  );
};
