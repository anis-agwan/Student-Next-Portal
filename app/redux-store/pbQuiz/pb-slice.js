import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const pbSlice = createSlice({
    name: 'personal-beliefs',
    initialState: {
        pbQuestions: [],
        pbQuestionsLength: 0,
        pbQuestionIdxStatus: [],
        pbAnswers: {},
        pbQuizCompleteStatus: false
    },
    reducers: {

        rdxSetPBQuestions(state, action) {
           
            const pbq = action.payload.pbQuestions;
            const qSize = pbq.length
            
            state.pbQuestions = pbq
            state.pbQuestionsLength = qSize
            state.pbQuestionIdxStatus = Array(qSize).fill(0);

            const user = JSON.parse(localStorage.getItem("userDetails"));
            // console.log(user)

            if(user !== "" || user !== undefined) {
                state.pbAnswers = {
                    bingNumber: user.bingNumber,
                    firstName: user.firstName,
                    lastName: user.lastName,
                }
            }
            

            // console.log(state.pbQuestionIdxStatus);
        },

        rdxChangePBIdxStatus(state, action) {
            // console.log(action.payload.idx);
            // console.log(state.pbQuestionIdxStatus);
            let prevArr = state.pbQuestionIdxStatus;
            prevArr[action.payload.idx] = 1;
            // console.log(prevArr);
            state.pbQuestionIdxStatus = prevArr;
            console.log(state.pbQuestionIdxStatus);
            state.pbQuizCompleteStatus = !state.pbQuestionIdxStatus.includes(0);
        },

        rdxSetPBAnswers(state, action) {
            console.log(state.pbAnswers)
            const questionNo = action.payload.questionNo
            const answer = action.payload.answer
            let ques = `pbQ${parseInt(questionNo) + 1}`;
            let prevAns = state.pbAnswers;
            prevAns[ques] = parseInt(answer)
            state.pbAnswers = prevAns;
            console.log(state.pbAnswers)
        },

        rdxSubmitAnswers(state) {
            state.pbAnswers = {}
            state.pbQuestionIdxStatus = Array(qSize).fill(0);
            state.pbQuizCompleteStatus = false
        }
    }
});

export const pbActions = pbSlice.actions;

export default pbSlice;