import React from "react";
import BUpic from "./Binghamton-University-pic.jpg";
import Image from "next/image";

export const AuthImage = () => {
  return (
    <div>
      <Image src={BUpic} alt="BUpic" className="w-full min-h-screen" />
    </div>
  );
};
