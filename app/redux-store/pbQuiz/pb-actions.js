import { useSelector } from "react-redux";
import { fetchData } from "../apiCall";
import { pbActions } from "./pb-slice";

import { BASEURL, PB_ENDPOINTS, URLPORT } from "@/app/enums/url_enums"



export const fetchPBQuestions = () => {
    return async (dispatch) => {
        const url = `${BASEURL.PBCT}:${URLPORT.PB}/${PB_ENDPOINTS.BASE_ENDPOINT}/${PB_ENDPOINTS.GET_QUESTIONS}`

        try {
            const pbQuestions = await fetchData(url);
            // console.log("INSIDE REDUX: ", pbQuestions);
            dispatch(
                pbActions.rdxSetPBQuestions({
                    pbQuestions: pbQuestions || []
                })
            );
        } catch (error) {
            console.log(error)
        }
    }
}

export const rdxSubmitPBAnswers = (answers) => {
    return async (dispatch) => {
        const url = `${BASEURL.PBCT}:${URLPORT.PB}/${PB_ENDPOINTS.BASE_ENDPOINT}/${PB_ENDPOINTS.SUBMIT_ANSWERS}`
            

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
                    pbActions.rdxSubmitAnswers()
                )

            } catch (err) {
                console.log(err)
            }
        
    }
}