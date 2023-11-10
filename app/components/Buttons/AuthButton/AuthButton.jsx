import React from "react";
import "./AuthButton.css";

export const AuthButton = ({ buttonText }) => {
  return (
    <div className="authButtonDiv bg-binghamton-green px-5 flex items-center justify-center">
      <button className="authButton " type="submit">
        {buttonText}
      </button>
    </div>
  );
};
