import React from "react";
import { ReportData } from "./ReportData";
import { SECTION } from "@/app/enums/section_enums";
import Image from "next/image";
import "./ReportCard.css";

export const ReportCard = ({ section }) => {
  let data = {};

  if (section === SECTION.PB) {
    data = ReportData.pbCard;
  } else if (section === SECTION.CT) {
    data = ReportData.ctCard;
  } else if (section === SECTION.DD) {
    data = ReportData.ddCard;
  } else {
    data = ReportData.biCard;
  }

  return (
    <div className="card bg-white flex items-center">
      <div>
        <Image className="cardImg p-4" src={data.img.src} alt={data.img.alt} />
      </div>
      <div>
        <h2 className="cardTitle px-4">{data.title}</h2>
      </div>
    </div>
  );
};
