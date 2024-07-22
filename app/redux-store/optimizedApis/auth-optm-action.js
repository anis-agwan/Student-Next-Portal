import { data } from "autoprefixer";
import { authActions } from "../authRdxStore/auth-slice";


export const onAuthRdxOptmLogin = (email, password) => {
    return async (dispatch) => {
        const url = "http://localhost:8081/auth/login/userlogin"

        const user = {
            // "emailId": "faculty1@example.com",
            // "password": "password123"
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

            if(!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Login failed');
            }

            if(res.ok) {
                const data = await res.json();

                console.log("======================");

                console.log(data);

                console.log("======================");

                if(data.role === "faculty") {
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

        } catch (error) {
            console.log(error);
            alert(error);
            authActions.rdxLoginUser({
                user: {},
                isLoggedIn: false,
            })
            isAuthenticated = false
        }

        return isAuthenticated;
    }
}

export const onAuthRdxGenToken = (tokenRequest) => {
    return async () => {
        const url = "http://localhost:8081/auth/token/generatetoken"
        try {
            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify(tokenRequest),
                headers: {
                  "Content-Type": "application/json",
                },
            })

            if(!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Could not generate token');
            }

            if(res.ok) {
                const data = await res.json();

                console.log("======================");

                console.log(data);

                console.log("======================");
            }
            
        } catch(err) {
            console.log(err);
            alert(err);
            throw new Error(err);
        }
    }
}

export const onAuthRdxConfirmToken = (tokenRequest) => {
    return async () => {
        const url = "http://localhost:8081/auth/token/confirmtoken"
        let isVerified = false;
        try {
            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify(tokenRequest),
                headers: {
                  "Content-Type": "application/json",
                },
            })

            console.log(res);

            if(!res.ok) {
                const errorData = await res.json();
                isVerified = false;
                throw new Error(errorData.message || 'Could Not Verify the token');
            }

            if(res.ok) {
                const data = await res.json();

                console.log("======================");

                console.log(data);
                
                console.log("======================");
                isVerified = true
                return {isVerified: isVerified, data: data}
            }
            
        } catch(err) {
            console.log(err);
            isVerified = false;
            alert(err);
        }
        
        return {isVerified: isVerified, data: data}
    }
}




export const onAuthRdxOptmSignUp = (user) => {
    return async (dispatch) => {
        const url = "http://localhost:8081/auth/register/createuser"

        let isAuthenticated = false;

        try {
            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                  "Content-Type": "application/json",
                },
            })

            if(!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Login failed');
            }

            if(res.ok) {
                const data = await res.json();

                console.log("======================");

                console.log(data);

                console.log("======================");

                if(data.role === "faculty") {
                    throw new Error(
                        "Faculties need permission to access the student portals."
                    );
                }

                // localStorage.setItem("userDetails", JSON.stringify(data));
                // localStorage.setItem("isLoggedIn", "1");
                
                // dispatch(
                //     authActions.rdxLoginUser({
                //         user: data,
                //         isLoggedIn: true,
                //     })
                // );

                isAuthenticated = true;
            }

        } catch (error) {
            console.log(error);
            alert(error);
            // authActions.rdxLoginUser({
            //     user: {},
            //     isLoggedIn: false,
            // })
            isAuthenticated = false
        }

        return isAuthenticated;
    }
}

export const onAuthRdxNewPassword = (user) => {
    return async (dispatch) => {
        const url = "http://localhost:8081/auth/login/newpassword"

        let isAuthenticated = false;

        try {
            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                  "Content-Type": "application/json",
                },
            })

            if(!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Login failed');
            }

            if(res.ok) {
                const data = await res.json();

                console.log("======================");

                console.log(data);

                console.log("======================");

                

                // localStorage.setItem("userDetails", JSON.stringify(data));
                // localStorage.setItem("isLoggedIn", "1");
                
                // dispatch(
                //     authActions.rdxLoginUser({
                //         user: data,
                //         isLoggedIn: true,
                //     })
                // );

                isAuthenticated = true;
            }

        } catch (error) {
            console.log(error);
            alert(error);
            // authActions.rdxLoginUser({
            //     user: {},
            //     isLoggedIn: false,
            // })
            isAuthenticated = false
        }

        return isAuthenticated;
    }
}