import { StartButton } from "@/app/components/Buttons/StartButton/StartButton";
import Link from "next/link";
import React from "react";
import "./EndScreen.css";

export default function EndScreen() {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-endScreen">
      <div className="flex justify-center items-center w-full h-full text-black backdrop-blur-xs">
        <div className="flex flex-col items-center p-10 bg-white/[0.8] gap-4 rounded-lg">
          <label className="CongratsHead">Congratulations!</label>
          <label className="CongratsTxt">
            Your quiz has been submitted successfully!
          </label>
          <Link href={"/SelectionScreen"}>
            <StartButton buttonText={"Go to Dashboard"} />
          </Link>
        </div>
      </div>
    </div>
  );
}
