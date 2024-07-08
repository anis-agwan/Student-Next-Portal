import { AUTH_ENDPOINTS, BASEURL, URLPORT } from "@/app/enums/url_enums"
import { authActions } from "./auth-slice"


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
    }
        
}