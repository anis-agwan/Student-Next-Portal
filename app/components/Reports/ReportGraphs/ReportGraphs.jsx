import { SECTION } from "@/app/enums/section_enums";
import React, { useContext, useEffect, useState } from "react";
import { ReportPB } from "./ReportPB";
import { ReportCT } from "./ReportCT";
import { ReportDD } from "./ReportDD";
import { ReportContext } from "@/app/store/reports-context";

export const ReportGraphs = ({ section }) => {
  const reportCtx = useContext(ReportContext);

  useEffect(() => {
    if (section === SECTION.PB) {
      reportCtx.changeGraphState(SECTION.PB);
    } else if (section === SECTION.CT) {
      reportCtx.changeGraphState(SECTION.CT);
    } else if (section === SECTION.DD) {
      reportCtx.changeGraphState(SECTION.DD);
    }
  });

  return (
    <div className="w-full h-full">
      {section === SECTION.PB && (
        <div className="flex w-full h-full">
          <ReportPB />
        </div>
      )}
      {section === SECTION.CT && (
        <div>
          <ReportCT />
        </div>
      )}
      {section === SECTION.DD && (
        <div>
          <ReportDD />
        </div>
      )}
    </div>
  );
};
