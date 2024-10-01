"use client";

import React from "react";
import { Card } from "../components/SelectionCards/Card";
import { SECTION } from "../enums/section_enums";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";

export default function SelectionScreen() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  !isLoggedIn && redirect("/");
  return (
    <div className=" flex  min-h-screen justify-center items-center text-black ">
      <div className="flex justify-evenly items-center h-full w-11/12 pb-5">
        <div>
          <Card section={SECTION.PB} />
        </div>
        <div>
          <Card section={SECTION.CT} />
        </div>
        <div>
          <Card section={SECTION.DD} />
        </div>
        <div>
          <Card section={SECTION.BI} />
        </div>
      </div>
    </div>
  );
}
