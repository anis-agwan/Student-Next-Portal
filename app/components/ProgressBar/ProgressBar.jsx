import React from "react";
import "./ProgressBar.css";

export const ProgressBar = (props) => {
  const { completed } = props;

  const containerStyles = {
    width: "100%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    borderRadius: "inherit",
    textAlign: "right",
    transition: "width 1s ease-in-out",
  };

  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  };

  return (
    <div>
      <h4 className="Progresstitle">Progress</h4>
      <div className="progressBarContainer">
        <div style={fillerStyles} className="bg-binghamton-green">
          <span style={labelStyles}>{`${completed}%`}</span>
        </div>
      </div>
    </div>
  );
};
