const { createSlice } = require("@reduxjs/toolkit");


const ctSlice = createSlice({
    name: 'criticial-thinking',
    initialState: {
        ctQuestions: [],
        ctQuestionsLength: 0,
        ctQuestionIdxStatus: [],
        ctAnswers: {},
        ctQuizCompleteStatus: false,
    },
    reducers: {
        rdxSetCTQuestions(state, action) {
            const ctq = action.payload.ctQuestions;
            const qSize = ctq.length
            
            state.ctQuestions = ctq;
            state.ctQuestionsLength = qSize;
            state.ctQuestionIdxStatus = Array(qSize).fill(0);
            // console.log(state.ctQuestions);

            const user = JSON.parse(localStorage.getItem("userDetails"));
            // console.log(user)

            if(user !== "" || user !== undefined) {
                state.ctAnswers = {
                    bingNumber: user.bingNumber,
                    firstName: user.firstName,
                    lastName: user.lastName,
                }
            }
        }
    }
})

export const ctActions = ctSlice.actions;

export default ctSlice;