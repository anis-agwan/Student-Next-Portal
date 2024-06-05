import { BASEURL, DD_ENDPOINTS, URLPORT } from "@/app/enums/url_enums"
import { fetchData } from "../apiCall"
import { ddActions } from "./dd-slice"


export const fetchDDQuestions = () => {
    return async (dispatch) => {
        const url = `${BASEURL.DDBI}:${URLPORT.DD}/${DD_ENDPOINTS.BASE_ENDPOINT}/${DD_ENDPOINTS.GET_QUESTIONS}`

        try {
            const ddQuestions = await fetchData(url)
            dispatch(
                ddActions.rdxSetDDQuestions({
                    ddQuestions: ddQuestions || []
                })
            );
        } catch (error) {
            console.log(error)
        }

    }
}

export const rdxSubmitDDAnswers = (answers) => {
    return async (dispatch) => {
        const url = `${BASEURL.DDBI}:${URLPORT.DD}/${DD_ENDPOINTS.BASE_ENDPOINT}/${DD_ENDPOINTS.SUBMIT_ANSWERS}`
            

            try {
                
                const res = await fetch(
                    url,
                    {
                        method: "POST",
                        body: JSON.stringify(answers),
                        headers: {
                        "Content-Type": "application/json",
                        },
                    }
                )
                if(!res.ok) {
                    throw new Error("Error while submitting the answers")
                }

                // const data = await res.json();

                // alert("SUBMITTEDx")

                dispatch(
                    ddActions.rdxSubmitDDAnswers()
                )

            } catch (err) {
                console.log(err)
            }
        
    }
}