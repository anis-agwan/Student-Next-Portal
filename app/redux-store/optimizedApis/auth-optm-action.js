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