import { AUTH_ENDPOINTS, BASEURL, URLPORT } from "@/app/enums/url_enums"
import { authActions } from "./auth-slice"
import { TOKEN_ENUMS } from "@/app/enums/token_enums"
import { USER_ROLE } from "@/app/enums/role_enums"


export const onRdxLogin = (email, password) => {
    return async (dispatch) => {
        const url = `${BASEURL.AUTH}:${URLPORT.AUTH}/${AUTH_ENDPOINTS.BASE_ENDPOINT}/${AUTH_ENDPOINTS.LOGIN}`
        
        const user = {
            emailId: email,
            password: password
        }

        let isAuthenticated = false;

        try {

            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                  "Content-Type": "application/json",
                },
            })

            const data = await res.json();

            if (data["validationIndicator"] === "Invalid") {
                throw new Error("Invalid Login, Please check your email and password");
            } else if (data["validationIndicator"] === "Valid") {
                if (data["role"] === "faculty") {
                    throw new Error(
                      "Faculties need permission to access the student portals."
                    );
                }
                localStorage.setItem("userDetails", JSON.stringify(data));
                localStorage.setItem("isLoggedIn", "1");
                dispatch(
                    authActions.rdxLoginUser({
                        user: data,
                        isLoggedIn: true,
                    })
                );

                isAuthenticated = true;
            }
            
        } catch (err) {
            console.log(err);
            alert(err);
            authActions.rdxLoginUser({
                user: {},
                isLoggedIn: false,
            })
            isAuthenticated = false
        }
        
        return isAuthenticated;
    }
    
}

export const onRdxSignUp = (
        userName,
        bNum,
        fName,
        lName,
        password,
        userRole) => {
    return async(dispatch) => {
        let url = `${BASEURL.AUTH}:${URLPORT.AUTH}/${AUTH_ENDPOINTS.BASE_ENDPOINT}/${AUTH_ENDPOINTS.REGISTER}`
        
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
        let islog = false;
        const user = {
            emailId: userName,
            bingNumber: bNum,
            firstName: fName,
            lastName: lName,
            password: password,
          };

          try {
            const res = await fetch(url, {
              method: "POST",
              body: JSON.stringify(user),
              headers: {
                "Content-Type": "application/json",
              },
            });
      
            console.log(res);
      
            await res.text().then((body) => {
              console.log(body);
              if (body === "Error : Email / B-Number already exists" 
                || body === "No Such email found" || body === "User already exists"
              ) {
                islog = false;
                alert(body);
                return islog;
              } else {
                console.log(res);
                islog = true;
                return islog;
              }
            });
          } catch (err) {
            console.log(err);
            alert(err);
            islog = false;
          }
          console.log(islog);
          return islog;
    }
        
}

export const onRdxGenToken = (tokenRequest) => {
  return async () => {
      console.log(tokenRequest);
      let url = "";
      if(tokenRequest.requestType === "Register") {
        url = `${BASEURL.AUTH}:${URLPORT.AUTH}/${AUTH_ENDPOINTS.BASE_ENDPOINT}/${AUTH_ENDPOINTS.GENERATESIGNUPTOKEN}`
      } else {
        url = `${BASEURL.AUTH}:${URLPORT.AUTH}/${AUTH_ENDPOINTS.BASE_ENDPOINT}/${AUTH_ENDPOINTS.GENERATELOGINTOKEN}`
      }

      const user = {
        email: tokenRequest.email,
      };

      let token = "";
      let notError = false;

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
            notError = false;
            console.log(body);
            throw new Error(body);
          } else {
            // console.log(res.data);
            token = body;
            notError = true;
          }
        })
        .catch((err) => {
          notError=false;
          alert(err);
        });
          
      } catch(err) {
          console.log(err);
          notError=false;
          alert(err);
          throw new Error(err);
      }

      return notError;
  }
}

export const onRdxConfirmToken = (tokenRequest) => {
  return async () => {
    console.log(tokenRequest);
    let url = "";
    if(tokenRequest.requestType === "Register") {
      url = `${BASEURL.AUTH}:${URLPORT.AUTH}/${AUTH_ENDPOINTS.BASE_ENDPOINT}/${AUTH_ENDPOINTS.CONFIRMSIGNUPTOKEN}`
    } else {
      url = `${BASEURL.AUTH}:${URLPORT.AUTH}/${AUTH_ENDPOINTS.BASE_ENDPOINT}/${AUTH_ENDPOINTS.CONFIRMLOGINTOKEN}`
    }
      
    const user = {
      email: tokenRequest.emailId,
      token: tokenRequest.token
    };

    console.log(user);

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

  }
}