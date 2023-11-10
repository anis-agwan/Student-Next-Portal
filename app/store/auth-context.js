"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { TOKEN_ENUMS } from "../enums/token_enums";
import { USER_ROLE } from "../enums/role_enums";

export const AuthContext = createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (userName, password) => {},
  onSignup: (userName, password, fName, lName) => {},
  onGenerateToken: (email, access) => {},
  //   onTokenSubmit: (email, token) => {},
  //   onRegisterNewPassword: (email, newPass) => {},
  //   onUpdateStats: (email, section) => {},
  signUpStudentData: {},
  passStudentData: (student) => {},
});

export const AuthContextProvider = ({ children }) => {
  const baseURL = "http://3.13.110.40:8080/login-register/";

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [signUpStuData, setSignUpStudentData] = useState({});

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
        body: JSON.stringify(user),
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

  const signUpHandler = async (
    userName,
    bNum,
    fName,
    lName,
    password,
    userRole
  ) => {
    let url = `${baseURL}register/user`;
    if (userRole === USER_ROLE.ADMIN) {
      console.log("ADMIN Auth");
      url = url + `?role=${USER_ROLE.ADMIN}`;
    } else if (userRole === USER_ROLE.FACULTY) {
      console.log("Faculty Auth");
      url = url + `?role=${USER_ROLE.FACULTY}`;
    } else if (userRole === USER_ROLE.STUDENT) {
      console.log("STUD Auth");
      url = url + `?role=${USER_ROLE.STUDENT}`;
    }

    const user = {
      emailId: userName,
      bingNumber: bNum,
      firstName: fName,
      lastName: lName,
      password: password,
    };

    console.log(user);

    // console.log(user);
    let islog = false;

    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(res);

      res.text().then((body) => {
        console.log(body);
        if (body === "No Such email found" || body === "User already exists") {
          throw new Error(body);
        } else {
          // console.log(res.data);
          islog = true;
        }
      });
    } catch (err) {
      console.log(err);
      alert(err);
      islog = false;
    }

    return islog;
  };

  const generateTokenHandler = async (email, access) => {
    console.log("ON TOKEN");
    // const url = `${baseURL}login/generatetoken`;
    let url = "";
    if (access === TOKEN_ENUMS.REGISTER) {
      url = `${baseURL}register/generatetoken`;
    } else if (access === TOKEN_ENUMS.FORGOT) {
      url = `${baseURL}login/generatetoken`;
    } else {
      url = `${baseURL}login/generatetoken`;
    }

    const user = {
      email: email,
    };

    let token = "";

    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);

      res.text().then((body) => {
        console.log(body);
        if (body === "No Such email found" || body === "User already exists") {
          throw new Error(body);
        } else {
          // console.log(res.data);
          token = body;
        }
      });
    } catch (err) {
      console.log(err);
      alert(err);
    }

    return token;
  };

  const studentDataHandler = (student) => {
    console.log(student);
    setSignUpStudentData(student);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        onSignup: signUpHandler,
        onGenerateToken: generateTokenHandler,
        signUpStudentData: signUpStuData,
        passStudentData: studentDataHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
