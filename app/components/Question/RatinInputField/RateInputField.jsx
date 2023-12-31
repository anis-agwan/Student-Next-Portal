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
        <div>Scale</div>
      </div>
      <div className="flex w-full gap-14">
        <div className="flex flex-col gap-2">
          <div>
            <h4>Ranking: 1 = highest and {noOfOptions} = lowest</h4>
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
