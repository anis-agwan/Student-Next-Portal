import React from "react";
import "./QNumberGrid.css";
import { AuthButton } from "../Buttons/AuthButton/AuthButton";
import { StartButton } from "../Buttons/StartButton/StartButton";

const arr = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 0, 1, 2, 3, 4, 5, 6, 7, 8,
  9, 10, 11, 12,
];

export const QNumberGrid = () => {
  return (
    <div className="boxContainer overflow-auto gap-3 p-5">
      <div className=" questionHeading">Question 1/53</div>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg: grid-cols-4 gap-y-2 justify-around items-center">
        {arr.map((value, idx) => {
          return (
            <div key={idx} className="circleDiv text-white">
              {value}
            </div>
          );
        })}
      </div>
      <div className=" pt-5">
        <StartButton buttonText={"Submit"} />
      </div>
    </div>
  );
};
