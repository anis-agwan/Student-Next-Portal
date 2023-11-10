"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (userName, password) => {},
  onSignup: (userName, password, fName, lName) => {},
  //   onGenerateToken: (email, access) => {},
  //   onTokenSubmit: (email, token) => {},
  //   onRegisterNewPassword: (email, newPass) => {},
  //   onUpdateStats: (email, section) => {},
});

export const AuthContextProvider = ({ children }) => {
  const baseURL = "http://3.13.110.40:8080/login-register/";

  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInfo = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInfo === "1") {
      setLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userDetails");
    setLoggedIn(false);
  };

  const loginHandler = async (userName, password) => {
    console.log("ON LOGIN");
    const url = `${baseURL}login/verify-user`;
    const user = {
      emailId: userName,
      password: password,
    };

    console.log(user);

    let islog = false;

    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          emailId: userName,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data["validationIndicator"] === "Invalid") {
        islog = false;
        throw new Error("Invalid Login, Please check your email and password");
      } else if (data["validationIndicator"] === "Valid") {
        console.log("SUCCESS");
        if (data["role"] === "faculty") {
          islog = false;
          throw new Error(
            "Faculties need permission to access the student portals."
          );
        }
        localStorage.setItem("userDetails", JSON.stringify(data));
        localStorage.setItem("isLoggedIn", "1");
        setLoggedIn(true);
        islog = true;
      }
    } catch (err) {
      console.log(err);
      alert(err);
      islog = false;
    }

    return islog;
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
