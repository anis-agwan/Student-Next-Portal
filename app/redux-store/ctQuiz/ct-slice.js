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
        },

        rdxChangeCTIdxStatus(state, action) {
            let prevArr = state.ctQuestionIdxStatus;
            prevArr[action.payload.idx] = 1;
            state.ctQuestionIdxStatus = prevArr;
            console.log(state.ctQuestionIdxStatus);
            state.ctQuizCompleteStatus = !state.ctQuestionIdxStatus.includes(0);
        },

        rdxSetCTAnswers(state, action) {
            console.log(state.ctAnswers)
            const questionNo = action.payload.questionNo
            const answer = action.payload.answer
            let ques = `que${parseInt(questionNo) + 1}`;
            let prevAns = state.ctAnswers;
            prevAns[ques] = parseInt(answer);
            state.ctAnswers = prevAns
            console.log(state.ctAnswers)
        },

        rdxSubmitCTAnswers(state) {
            state.ctAnswers = {}
            state.ctQuestionIdxStatus = [];
            state.ctQuizCompleteStatus = false;
        }
    }
})

export const ctActions = ctSlice.actions;

export default ctSlice;