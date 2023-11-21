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
  const questionCtx = useContext(QuestionContext);

  //   const [formValues, setFormValues] = useState([{ rank: "Rank1", value: "" }]);
  //   const [ratingFormValues, setRatingFormValues] = useState([]);

  //   const handleChange = (event, idx, whichOP) => {
  //     console.log(event.target.value, idx);
  //     if (formValues.length === noOfOptions) {
  //       if (ratingFormValues.length === 0) {
  //         addRatingFields(-1);
  //       } else if (
  //         ratingFormValues.length !== noOfOptions &&
  //         idx + 1 === ratingFormValues.length
  //       ) {
  //         addRatingFields(idx);
  //       }
  //     }

  //     if (formValues.length !== noOfOptions && idx + 1 === formValues.length) {
  //       //   console.log("IDX: ", idx + 1);
  //       addFields(idx);
  //     }

  //     if (whichOP === DD_INPUTS.RANKSR) {
  //       questionCtx.setDDAnswer(idx, event.target.value, DD_INPUTS.RANKSR);
  //     } else if (whichOP === DD_INPUTS.RATESR) {
  //       questionCtx.setDDAnswer(idx, event.target.value, DD_INPUTS.RATESR);
  //     }
  //   };

  //   const addFields = (idx) => {
  //     setFormValues([...formValues, { rank: `Rank${idx + 2}`, value: "" }]);
  //   };

  //   const addRatingFields = (idx) => {
  //     setRatingFormValues([
  //       ...ratingFormValues,
  //       { rating: `Rating${idx + 2}`, value: "" },
  //     ]);
  //   };

  return (
    <>
      <div className="flex w-full gap-14">
        <div className="flex flex-col gap-2">
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
