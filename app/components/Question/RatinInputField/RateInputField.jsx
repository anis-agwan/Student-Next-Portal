"use client";
import React, { useState } from "react";

export const RateInputField = ({ noOfOptions }) => {
  const [formValues, setFormValues] = useState([{ rank: "Rank1", value: "" }]);
  const [ratingFormValues, setRatingFormValues] = useState([]);

  const handleChange = (event, idx) => {
    console.log(idx);
    if (formValues.length === noOfOptions) {
      if (ratingFormValues.length === 0) {
        addRatingFields(-1);
      } else if (
        ratingFormValues.length !== noOfOptions &&
        idx + 1 === ratingFormValues.length
      ) {
        addRatingFields(idx);
      }
    }

    if (formValues.length !== noOfOptions && idx + 1 === formValues.length) {
      //   console.log("IDX: ", idx + 1);
      addFields(idx);
    }
  };

  const addFields = (idx) => {
    setFormValues([...formValues, { rank: `Rank${idx + 2}`, value: "" }]);
  };

  const addRatingFields = (idx) => {
    // if (idx === -1) {
    //   setRatingFormValues([
    //     ...ratingFormValues,
    //     { rating: `Rating${idx + 2}`, value: "" },
    //   ]);

    //   return;
    // }
    setRatingFormValues([
      ...ratingFormValues,
      { rating: `Rating${idx + 2}`, value: "" },
    ]);
  };

  return (
    <>
      <div className="flex">
        <div className="flex flex-col gap-2">
          {formValues.map((elem, idx) => {
            return (
              <div key={idx}>
                <label> {elem.rank}</label>
                <input
                  type="number"
                  onChange={(event) => handleChange(event, idx)}
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
                  <div key={idx}>
                    <label> {elem.rating}</label>
                    <input
                      type="number"
                      onChange={(event) => handleChange(event, idx)}
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
