"use client";

import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

//Assets
import Image from "next/image";
import BULogo from "./BUBCLSLogo.png";
import Avatar from "./UserLogo.png";

//Styles
import "./Menu.css";
import { AuthContext } from "@/app/store/auth-context";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "@/app/redux-store/authRdxStore/auth-slice";

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
  const dispatch = useDispatch();
  const rdxUser = useSelector((state) => state.auth.user)
  const rdxIsLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  // let domNode = useClickOutside(() => {
  //   setMenuActive(false);
  // });

  useEffect(() => {
    console.log(rdxUser);

    // console.log(authCtx.isLoggedIn);
    if(rdxIsLoggedIn) {
      setIsLoggedIn(true);
      setUser(rdxUser);
    }

    // if (authCtx.isLoggedIn && authCtx.user) {
    //   setUser(authCtx.user);
    //   setIsLoggedIn(true);
    // }
  });

  const dashboardRoute = () => {
    // let path = `/SelectionScreen`;
    setMenuActive(false);
    if(rdxIsLoggedIn) {
      router.replace("/SelectionScreen");
    } else {
      window.location.href = "/";
    }
    // if(rdxIsLoggedIn) {
    //   router.replace("/SelectionScreen");
    // } else {
    //   router.push("/");
    // }
    // if (authCtx.isLoggedIn) {
    //   // router.push("SelectionScreen");
    //   router.replace("/SelectionScreen");
    // } else {
    //   router.push("/");
    // }
  };
  const reportRoute = () => {
    setMenuActive(false);
    if(rdxIsLoggedIn) {
      router.replace("/Reports");
    } else {
      window.location.href = "/";
    }
    // if(rdxIsLoggedIn) {
    //   router.replace("/Reports");
    // } else {
    //   // router.push("/");
    //   redirect("/");
    // }

    // if (authCtx.isLoggedIn) {
    //   setMenuActive(false);
    //   // router.push("Reports");
    //   router.replace("/Reports");
    // } else {
    //   // router.push("/");
    //   redirect("/");
    // }
  };

  const logginOut = () => {
    dispatch(authActions.rdxLogoutUser())
    // authCtx.onLogout();
    // setIsLoggedIn(false);
    // setMenuActive(false);
    router.push("/");
  };

  const imgClick = () => {
    console.log("IMAGE CLICK")
    if(rdxIsLoggedIn) {
      router.push("/SelectionScreen");
    } else {
      window.location.href = "/";
    }
    // if(rdxIsLoggedIn) {
    //   router.push("/SelectionScreen");
    //   // return;
    // } else {
    //   router.push("/");
    //   // return;
    // }

    // if (authCtx.isLoggedIn) {
    //   router.push("/SelectionScreen");
    // } else {
    //   router.push("/");
    // }
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
        {rdxIsLoggedIn && (
          <div
            className="flex"
            // ref={(el) => {
            //   domNode.current = el;
            // }}
          >
            <div className={`dropDown ${isMenuActive ? "active" : "inactive"}`}>
              <div className="menuStyle">
                {rdxIsLoggedIn && (
                  <div className="Dropdownlabel">
                    {/* {rdxUser.firstName + " " + rdxUser.lastName} */}
                  </div>
                )}
                <div className="Dropdownlabel">
                  {rdxUser.firstName + " " + rdxUser.lastName}
                  {/* {authCtx.user.firstName + " " + authCtx.user.lastName} */}
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
                  Quiz Menu
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
