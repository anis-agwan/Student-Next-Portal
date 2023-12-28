"use client";
import React, { useContext, useEffect, useState } from "react";
import "./Reports.css";
import { ReportCard } from "../components/Reports/ReportCards/ReportCard";
import { SECTION } from "../enums/section_enums";
import { ReportGraphs } from "../components/Reports/ReportGraphs/ReportGraphs";
import { ReportContext, ReportContextProvider } from "../store/reports-context";

export default function Reports() {
  const [graphState, setGraphState] = useState(null);

  useEffect(() => {
    // console.log(graphState);
  }, [graphState]);

  return (
    <ReportContextProvider>
      <div className="flex min-h-screen justify-center items-center text-black pt-14">
        <div className="flex flex-col h-full w-full px-8 gap-2 pb-8">
          <div>
            <h2 className="sectionTitle">Reports</h2>
          </div>
          <div className="flex gap-5">
            <div className="leftSection flex flex-col gap-5 w-1/4">
              <div
                onClick={() => {
                  setGraphState(SECTION.PB);
                }}
              >
                <ReportCard section={SECTION.PB} />
              </div>
              <div
                onClick={() => {
                  setGraphState(SECTION.CT);
                }}
              >
                <ReportCard section={SECTION.CT} />
              </div>
              <div
                onClick={() => {
                  setGraphState(SECTION.DD);
                }}
              >
                <ReportCard section={SECTION.DD} />
              </div>
              <div
                onClick={() => {
                  setGraphState(SECTION.BI);
                }}
              >
                <ReportCard section={SECTION.BI} />
              </div>
            </div>
            <div className="rightSection flex items-center justify-center bg-white w-3/4  ">
              {graphState !== null ? (
                <ReportGraphs section={graphState} />
              ) : (
                <>
                  <div className="flex justify-center items-center">
                    <h3>Click on a section to see the results</h3>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </ReportContextProvider>
  );
}
