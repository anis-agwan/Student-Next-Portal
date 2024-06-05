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