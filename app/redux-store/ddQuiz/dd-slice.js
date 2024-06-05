import { DD_INPUTS } from "@/app/enums/dd_input";

const { createSlice } = require("@reduxjs/toolkit");


const ddSlice = createSlice({
    name: 'difficult-decisions',
    initialState: {
        ddQuestions: [],
        ddQuestionsLength: 0,
        ddQuestionIdxStatus: [],
        ddAnswers: {},
        ddQuizCompleteStatus: false,
        ddAnsCounter: 0,
        ddPrevOpsCount: [],
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
        },

        rdxChangeDDIdxStatus(state, action) {
            const whatToDo = action.payload.whatToDo;
            const idx = action.payload.idx;
            console.log(idx, whatToDo)
            if(whatToDo === "+") {
                let prevArr = state.ddQuestionIdxStatus;
                prevArr[idx] = 1;
                
                state.ddQuestionIdxStatus = prevArr;
            } else if (whatToDo === "-") {
                let prevArr = state.ddQuestionIdxStatus;
                prevArr[idx] = 0;
                
                state.ddQuestionIdxStatus = prevArr;
            }

            state.ddQuizCompleteStatus = !state.ddQuestionIdxStatus.includes(0);
        },

        rdxChangeDDCounter(state, action) {
            const whichBtn = action.payload.whichBtn;
            const val = action.payload.val;

            switch (whichBtn) {
                case "next":
                    const nextCount = state.ddAnsCounter + val;
                    state.ddAnsCounter = nextCount;
                    let ddNextArr = state.ddPrevOpsCount.slice();
                    ddNextArr.push(val);
                    state.ddPrevOpsCount = ddNextArr;
                    break;
                case "prev":
                    let ddPrevArr = state.ddPrevOpsCount.slice(); 
                    const prevVal = ddPrevArr.pop();
                    // console.log(prevVal);
                    // console.log(ddPrevArr);
                    const prevCount = state.ddAnsCounter - prevVal;
                    state.ddAnsCounter = prevCount;
                    state.ddPrevOpsCount = ddPrevArr.slice();
                    break;
                default:
                    break;
            }

            console.log(state.ddAnsCounter);

        },

        rdxSetDDAnswers(state, action) {
            const opID = action.payload.opID;
            const answer = action.payload.answer;
            const whichInput = action.payload.whichInput
            let ques = `${whichInput}${state.ddAnsCounter + parseInt(opID) + 1}`;

            let tempAns = {...state.ddAnswers}
            console.log(tempAns)
            if(whichInput === DD_INPUTS.RANKSR) {
                tempAns[ques] = state.ddAnsCounter + parseInt(answer);
                console.log(tempAns);
             
            } else if(whichInput === DD_INPUTS.RATESR) {
                tempAns[ques] = parseInt(answer);
                console.log(tempAns);
            }
            state.ddAnswers = {...tempAns}
        },

        rdxSubmitDDAnswers(state) {
            state.ddAnswers = {}
            state.ddAnsCounter = 0
            state.ddPrevOpsCount = []
            state.ddQuestionIdxStatus = []
            state.ddQuizCompleteStatus = false
        }

    }
})


export const ddActions = ddSlice.actions;

export default ddSlice;