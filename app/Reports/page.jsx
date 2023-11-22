import React from "react";
import "./Reports.css";
import { ReportCard } from "../components/Reports/ReportCards/ReportCard";
import { SECTION } from "../enums/section_enums";
import { ReportGraphs } from "../components/Reports/ReportGraphs/ReportGraphs";

export default function Reports() {
  return (
    <div className="flex min-h-screen justify-center items-center text-black pt-14">
      <div className="flex flex-col h-full w-full px-8 gap-2">
        <div>
          <h2 className="sectionTitle">Reports</h2>
        </div>
        <div className="flex gap-5">
          <div className="leftSection flex flex-col gap-5 w-1/4">
            <div>
              <ReportCard section={SECTION.PB} />
            </div>
            <div>
              <ReportCard section={SECTION.CT} />
            </div>
            <div>
              <ReportCard section={SECTION.DD} />
            </div>
          </div>
          <div className="rightSection flex items-center justify-center bg-white w-3/4 ">
            <ReportGraphs />
          </div>
        </div>
      </div>
    </div>
  );
}
