import React from "react";
import "./OptionsButton.css";

export const OptionsButton = ({ buttonText, checkMark, handler, idx }) => {
  return (
    <div className="flex w-full justify-center">
      <button className="optionsArrangement" onClick={() => handler(idx)}>
        {buttonText}
      </button>
    </div>
  );
};
