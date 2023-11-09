"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

//Assets
import Image from "next/image";
import BULogo from "./BUBCLSLogo.png";
import Avatar from "./UserLogo.png";

//Styles
import "./Menu.css";

let useClickOutside = (handler) => {
  let domNode = useRef();
  useEffect(() => {
    let maybeHandler = (e) => {
      if (!domNode.current.contains(e.target)) {
        handler();
      }
    };
    document.addEventListener("mousedown", maybeHandler);
    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });
  return domNode;
};

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isMenuActive, setMenuActive] = useState(false);

  let domNode = useClickOutside(() => {
    setMenuActive(false);
  });

  return (
    <>
      <nav className="fixed flex w-auto h-1/12 w-full bg-binghamton-green p-2">
        <div>
          <Image src={BULogo} alt="BULogo" className="flex w-1/3 h-auto" />
        </div>
        {isLoggedIn && (
          <div className="flex justify-items-end" ref={domNode}>
            <div>
              <Image
                src={Avatar}
                className=" w-1/6"
                alt="avatar"
                onClick={() => {
                  setMenuActive(!isMenuActive);
                }}
              />
            </div>

            <div className={`dropDown ${isMenuActive ? "active" : "inactive"}`}>
              <div className="menuStyle">
                {/* {user && (
                  <div className="Dropdownlabel">
                    {user.firstName + " " + user.lastName}
                  </div>
                )} */}
                <div className="Dropdownlabel">
                  {/* {user.firstName + " " + user.lastName} */}
                </div>
                {/* <button onClick={profileRoute} className="ProfileBtn">
                Profile
              </button> */}
                <Link href="/SelectionScreen">
                  <button className="DashboardBtn1">Dashboard</button>{" "}
                </Link>

                <button className="ReportsBtn1">Reports</button>
                {/* <button onClick={aboutUsRoute} className='AboutUsBtn1' >About Us</button> */}
                <button className="LogoutBtn">Logout</button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
