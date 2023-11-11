import React from "react";
import "./StartButton.css";

export const StartButton = ({ buttonText }) => {
  return (
    <div className="StartQuizButton flex justify-center items-center">
      <button className="StartQuizText px-5 py-2">{buttonText}</button>
    </div>
  );
};
