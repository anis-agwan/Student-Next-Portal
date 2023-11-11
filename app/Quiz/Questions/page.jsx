import { ProgressBar } from "@/app/components/ProgressBar/ProgressBar";
import { QNumberGrid } from "@/app/components/QuestionNumberGrid/QNumberGrid";
import React from "react";

export default function QuestionsPage() {
  return (
    <div className="flex justify-center items-center w-screen h-screen text-black">
      <div className="flex w-full h-full justify-between items-center gap-2">
        <div className="w-3/4">
          <div className="h-1/4">
            <ProgressBar />
          </div>
          <div className="h-3/4">QuestionsPage</div>
        </div>
        <div className="flex w-1/4 justify-center items-center pt-20">
          <QNumberGrid />
        </div>
      </div>
    </div>
  );
}
