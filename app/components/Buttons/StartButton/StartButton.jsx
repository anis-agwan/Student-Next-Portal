import React from "react";
import "./StartButton.css";

export const StartButton = ({ buttonText, isBtnDisabled }) => {
  return (
    <div className="StartQuizButton flex justify-center items-center">
      <button
        className="StartQuizText px-5 py-2 w-full"
        disabled={isBtnDisabled}
      >
        {buttonText}
      </button>
    </div>
  );
};
