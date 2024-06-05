const { createSlice } = require("@reduxjs/toolkit");


const ddSlice = createSlice({
    name: 'difficult-decisions',
    initialState: {
        ddQuestions: [],
        ddQuestionsLength: 0,
        ddQuestionIdxStatus: [],
        ddAnswers: {},
        ddQuizCompleteStatus: false
    },
    reducers: {
        rdxSetDDQuestions(state, action) {
            const ddq = action.payload.ddQuestions;
            const qSize = ddq.length

            state.ddQuestions = ddq
            state.ddQuestionsLength = qSize
            state.ddQuestionIdxStatus = Array(qSize).fill(0)

            const user = JSON.parse(localStorage.getItem("userDetails"))

            if(user !== "" || user !== undefined) {
                state.ddAnswers = {
                    bingNumber: user.bingNumber,
                    firstName: user.firstName,
                    lastName: user.lastName,
                }
            }
        }
    }
})


export const ddActions = ddSlice.actions;

export default ddSlice;