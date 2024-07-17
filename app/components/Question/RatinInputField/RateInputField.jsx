"use client";
import { DD_INPUTS } from "@/app/enums/dd_input";
import { QuestionContext } from "@/app/store/questions-context";
import React, { useContext, useState } from "react";

export const RateInputField = ({
  noOfOptions,
  formValues,
  ratingFormValues,
  handleFormChange,
}) => {
  return (
    <>
      <div>
      <b>Objective</b>: You need to rank a list of possible actions or responses based on how likely you are to choose them. The most preferred action gets the highest score (X), and the least preferred gets the lowest score (Y).
      </div>
      <div>
        <br />
      <b>Ranking Preference:</b>
      <ul>
        <li>
        •	Most Likely to Choose: Assign the highest score (X) to the action you are most likely to select.
        </li>
        <li>
        •	Least Likely to Choose: Assign the lowest score (Y) to the action you are least likely to select.
        </li>
        <li>	
        •	Others: Rate the remaining options in between, based on how likely you are to choose them compared to the most and least likely options.
        </li>
      </ul>
      
      <b>Rating Quality:</b>
      <ul>
        <li>	•	Evaluate Quality: Besides ranking based on preference, you also need to assess the quality of each option. This could range from poor (all low scores) to excellent (all high scores).
        </li>
        <li>	•	Consistency in Rating: The option you are most likely to choose (score X) should not have a lower quality rating than the other options. It can be rated the same as or higher than the others in terms of quality, but not lower.
        </li>
      </ul>
      </div>
      <div>
        <br />
      <b>Key Condition:</b> Your top choice (in terms of preference) must not be rated as the lowest in quality compared to other options. It can share the lowest quality rating with others or have a higher quality rating, but it cannot be solely rated as the worst in quality.
      </div>
      <br />
      <div>
        <div>Scale</div>
      </div>
      <div className="flex w-full gap-14">
        <div className="flex flex-col gap-2">
          <div>
            <h4>Ranking: 1 = highest and {noOfOptions} = lowest</h4>
            <h4>Ranking: 1 = poor and {noOfOptions} = excellent</h4>
          </div>
          {formValues.map((elem, idx) => {
            return (
              <div key={idx} className="inputDiv flex gap-3">
                <label className="px-2">{elem.rank} : </label>
                <input
                  className="px-5 border border-black rounded-md"
                  type="number"
                  onChange={(event) =>
                    handleFormChange(event, idx, DD_INPUTS.RANKSR)
                  }
                  min={1}
                  max={`${noOfOptions}`}
                />
              </div>
            );
          })}
        </div>
        {ratingFormValues.length > 0 && (
          <div className="flex flex-col gap-2">
            <div>
              <h4>Rating: 1 = satisfied and {noOfOptions} = not satisfied </h4>
              <h4>Rating: 1 = not satisfied and {noOfOptions} = extremely satisfied </h4>
            </div>
            {ratingFormValues.length > 0 &&
              ratingFormValues.map((elem, idx) => {
                return (
                  <div key={idx} className="inputDiv flex gap-3">
                    <label> {elem.rating}: </label>
                    <input
                      type="number"
                      className="px-5 border border-black rounded-md"
                      onChange={(event) =>
                        handleFormChange(event, idx, DD_INPUTS.RATESR)
                      }
                      min={1}
                      max={`${noOfOptions}`}
                    />
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </>
  );
};
