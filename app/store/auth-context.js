"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { TOKEN_ENUMS } from "../enums/token_enums";
import { USER_ROLE } from "../enums/role_enums";

export const AuthContext = createContext({
  isLoggedIn: false,
  user: {},
  onLogout: () => {},
  onLogin: (userName, password) => {},
  onSetLogin: () => {},
  onSignup: (userName, password, fName, lName) => {},
  onGenerateToken: (email, access) => {},
  onTokenSubmit: (email, token) => {},
  onRegisterNewPassword: (email, newPass) => {},
  onUpdateStats: (email, section) => {},
  signUpStudentData: {},
  passStudentData: (student) => {},
});

export const AuthContextProvider = ({ children }) => {
  const baseURL = "http://3.13.110.40:8080/login-register/";

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [signUpStuData, setSignUpStudentData] = useState({});

  useEffect(() => {
    const storedUserLoggedInInfo = localStorage.getItem("isLoggedIn");
    const user = JSON.parse(localStorage.getItem("userDetails"));

    // console.log(user);
    setUser(user);

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
        setUser(data);
        setLoggedIn(true);
        islog = true;
      }
    } catch (err) {
      console.log(err);
      alert(err);
      islog = false;
    }

    if (islog) {
      console.log(islog);
      setLoggedIn(true);
    }

    return islog;
  };

  const isLoginHandler = async () => {
    setLoggedIn(true);
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

      await res
        .text()
        .then((body) => {
          console.log(body);
          if (
            body === "No Such email found" ||
            body === "User already exists"
          ) {
            throw new Error(body);
          } else {
            // console.log(res.data);
            token = body;
          }
        })
        .catch((err) => {
          alert(err);
        });
    } catch (err) {
      console.log(err);
      alert(err);
    }

    return token;
  };

  const tokenSubmitHandler = async (email, token, access) => {
    // const url = `${baseURL}login/confirmtoken`;
    let url = "";
    if (access === TOKEN_ENUMS.REGISTER) {
      url = `${baseURL}register/confirmtoken`;
    } else if (access === TOKEN_ENUMS.FORGOT) {
      url = `${baseURL}login/confirmtoken`;
    } else {
      url = `${baseURL}login/confirmtoken`;
    }

    const user = {
      email: email,
      token: token,
    };

    let tokenAuthValid = false;

    console.log(url);

    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = res.json();

      await data
        .then((resp) => {
          if (resp.isValid) {
            tokenAuthValid = resp.isValid;

            return tokenAuthValid;
          } else {
            throw new Error(resp.message);
          }
        })
        .catch((err) => {
          alert(err);
        });
    } catch (err) {
      console.log(err);
      alert(err);
    }

    return tokenAuthValid;
  };

  const registerNewPassword = async (email, password) => {
    console.log(email, password);
    const url = `${baseURL}login/newPassword`;
    const user = {
      email: email,
      newPassword: password,
    };

    let registeredValid = false;
    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      const data = res.json();
      await data.then((r) => {
        alert(r.message);
      });
      registeredValid = true;
      // console.log(data);
    } catch (err) {
      registeredValid = false;
      console.log(err);
      alert(err);
    }

    // console.log(registeredValid);

    // await axios
    //   .post(url, user)
    //   .then((res) => {
    //     if (res.data.isValid && res.data.status === 200) {
    //       // navigate("/");
    //       registeredValid = res.data.isValid;
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    return registeredValid;
  };

  const updateStats = async (section) => {
    const url = `${baseURL}login/updatestats`;

    const userID = JSON.parse(localStorage.getItem("userDetails"));
    const emailId = userID.emailId;

    const user = {
      email: emailId,
      section: section,
    };

    try {
      const res = fetch(url, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const studentDataHandler = (student) => {
    console.log(student);
    setSignUpStudentData(student);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        user: user,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        onSetLogin: isLoginHandler,
        onSignup: signUpHandler,
        onGenerateToken: generateTokenHandler,
        onTokenSubmit: tokenSubmitHandler,
        onRegisterNewPassword: registerNewPassword,
        onUpdateStats: updateStats,
        signUpStudentData: signUpStuData,
        passStudentData: studentDataHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
