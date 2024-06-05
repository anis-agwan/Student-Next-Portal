import { fetchData } from "../apiCall";
import { ctActions } from "./ct-slice";

import { BASEURL, CT_ENDPOINTS, URLPORT } from "@/app/enums/url_enums"

export const fetchCTQuestions = () => {
    return async (dispatch) => {
        const url = `${BASEURL.PBCT}:${URLPORT.CT}/${CT_ENDPOINTS.BASE_ENDPOINT}/${CT_ENDPOINTS.GET_QUESTIONS}`

        try {
            const ctQuestions = await fetchData(url);
            dispatch(
                ctActions.rdxSetCTQuestions({
                    ctQuestions: ctQuestions || []
                })
            )
        } catch (error) {
            console.log(error);
        }
    }
}