export const BASEURL = {
    PBCT: "http://3.14.232.42",
    DDBI: "http://3.14.159.174",
    
  };

  export const URLPORT = {
    PB: "8441",
    CT: "8442",
    DD: "8443"
  }

  export const PB_ENDPOINTS = {
    BASE_ENDPOINT: "personal-beliefs/pb",
    GET_QUESTIONS: "getQuestions",
    SUBMIT_ANSWERS: "pbData",
  }

  export const CT_ENDPOINTS = {
    BASE_ENDPOINT: "critical-thinking/critical-thinking",
    GET_QUESTIONS: "getQuestions",
    SUBMIT_ANSWERS: "ctData",
  }

  export const DD_ENDPOINTS = {
    BASE_ENDPOINT: "situation_q/sq",
    GET_QUESTIONS: "getSQuestions"
  }
  
Object.freeze(BASEURL);
Object.freeze(URLPORT);
Object.freeze(PB_ENDPOINTS);
Object.freeze(CT_ENDPOINTS);
Object.freeze(DD_ENDPOINTS);