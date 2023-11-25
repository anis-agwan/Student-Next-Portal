"use client";

import React, { useState, useRef, useEffect, useContext } from "react";
import Link from "next/link";

import { useRouter } from "next/navigation";

//Assets
import Image from "next/image";
import BULogo from "./BUBCLSLogo.png";
import Avatar from "./UserLogo.png";

//Styles
import "./Menu.css";
import { AuthContext } from "@/app/store/auth-context";

// let useClickOutside = (handler) => {
//   let domNode = useRef();
//   useEffect(() => {
//     let maybeHandler = (e) => {
//       try {
//         console.log(e.target);
//         console.log(domNode.current);
//         console.log(domNode.current.contains(e.target));
//         if (!domNode.current.contains(e.target)) {
//           handler();
//         } else {
//           throw new Error("Its okay");
//         }
//       } catch (err) {
//         console.log(err);
//       }
//       if (!domNode.current.contains(e.target)) {
//         handler();
//       }
//     };
//     document.addEventListener("mousedown", maybeHandler);
//     return () => {
//       document.removeEventListener("mousedown", maybeHandler);
//     };
//   }, [domNode]);
//   return domNode;
// };

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuActive, setMenuActive] = useState(false);
  const [user, setUser] = useState({});
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  // let domNode = useClickOutside(() => {
  //   setMenuActive(false);
  // });

  useEffect(() => {
    console.log(authCtx.user);
    if (authCtx.isLoggedIn && authCtx.user) {
      setUser(authCtx.user);
      setIsLoggedIn(true);
    }
  });

  const dashboardRoute = () => {
    // let path = `/SelectionScreen`;
    setMenuActive(false);
    if (authCtx.isLoggedIn) {
      router.push("SelectionScreen");
    } else {
      router.push("/");
    }
  };
  const reportRoute = () => {
    setMenuActive(false);
    if (authCtx.isLoggedIn) {
      setMenuActive(false);
      router.push("Reports");
    } else {
      router.push("/");
    }
  };

  const logginOut = () => {
    authCtx.onLogout();
    setIsLoggedIn(false);
    setMenuActive(false);
    router.push("/");
  };

  const imgClick = () => {
    if (authCtx.isLoggedIn) {
      router.push("/SelectionScreen");
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <nav className="fixed flex h-fit w-full bg-binghamton-green justify-between py-2 px-10 z-10">
        <div>
          <Image
            src={BULogo}
            alt="BULogo"
            className="flex w-5/12 h-auto"
            onClick={imgClick}
          />
        </div>
        {isLoggedIn && (
          <div
            className="flex"
            // ref={(el) => {
            //   domNode.current = el;
            // }}
          >
            <div className={`dropDown ${isMenuActive ? "active" : "inactive"}`}>
              <div className="menuStyle">
                {user && (
                  <div className="Dropdownlabel">
                    {/* {user.firstName + " " + user.lastName} */}
                  </div>
                )}
                <div className="Dropdownlabel">
                  {user.firstName + " " + user.lastName}
                </div>
                {/* <button onClick={profileRoute} className="ProfileBtn">
                Profile
              </button> */}
                {/* <Link href="/SelectionScreen"> */}
                <button
                  className="DashboardBtn1"
                  onClick={() => {
                    dashboardRoute();
                    setMenuActive(false);
                  }}
                >
                  Dashboard
                </button>{" "}
                {/* </Link> */}
                <button
                  className="ReportsBtn1"
                  onClick={() => {
                    reportRoute();
                  }}
                >
                  Reports
                </button>
                {/* <button onClick={aboutUsRoute} className='AboutUsBtn1' >About Us</button> */}
                <button className="LogoutBtn" onClick={logginOut}>
                  Logout
                </button>
              </div>
            </div>
            <div className="flex justify-end pe-8">
              <Image
                src={Avatar}
                className=" w-1/5 "
                alt="avatar"
                onClick={() => {
                  setMenuActive(!isMenuActive);
                }}
              />
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
