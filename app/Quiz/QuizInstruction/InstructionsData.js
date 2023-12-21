export const instructionsData = {
  PB: {
    information: {
      instructionArr: [
        "You are about to begin an assessment process on the computer. This is one part of an in-depth assessment program designed for managerial positions.",
        "The computerized portion of this system is self-guided and self-paced. You are free to work at your own pace. Start with Step 1 to register. Each time you finish a section you will come back to this menu to continue with the next step. You will be asked to enter your ID number as you begin each section.",
      ],
      routeTo: "/Quiz/QuizInstruction",
    },
    instructions: {
      instructionArr: [
        "This section contains a number of statements about various issues. You need to select the extent to which you agree or disagree with each statement. There are no right or wrong answers in this section. Read each statement and respond accurately and candidly. Using the rating scale given, chose the answer that matches the extent of your agreement.",
        "Click on the button below to go to the Personal Beliefs Statements.",
      ],
      routeTo: "",
    },
  },

  CT: {
    instructionArr: [
      "This section provides you with some information from an experiment. There are various conclusions drawn from the experiment. Your task will be to review the experiment and then evaluate various assumptions from which decisions were made. Additionally, you will evaluate the logic and appropriateness of those assumptions.",
      "Although the experiment involves testing the effectiveness of using an oil additive, you do not need to know anything about engines, automobiles, or automotive oil in order to perform this exercise. You may find it helpful to use a calculator.",
      "There are 3 sections in this Critical Thinking exercise. Each section requires you to perform a slightly different task.",
      "To go to the Experiment Description, please click on the button below.",
    ],
    routeTo: "/Quiz/ct/ExperimentDetails",
  },

  DD: {
    instructionArr: [
      "This section contains 11 situations along with several possible ways of handling the situation. Read each situation carefully and then read each response and rate the desirability of that response using the scale provided.",
      " To make your response click on the circle under the appropriate rating.",
      "Be sure to make a response to every statement, even if you have to guess at some.",
      "Click on the button below to go to the first scenario.",
    ],
    // routeTo: "Quiz/Questions",
  },
  BI: {
    sections: [
      {
        section: "Section 1",
        sectitle: "Opening & Introduction",
        description: `This section will be explained by the interviewer`,
        problems: [],
        task: "",
        keepInMind: "",
      },
      {
        section: "Section 2",
        sectitle: "Leadership Simulation 1",
        description: `You've just been selected as the production manager for a new manufacturing firm. The firm will be operating in a team-based format although there is currently very little structure. You have 5 group leaders that report to you. Each group leader oversees 3 - 5 teams, each consisting of 4 - 8 team members. Currently, there are no team leaders in place for the teams; in fact, the team members are currently being selected and will not be in the facility for about two weeks. Manufacturing machinery has been delivered and final installations are ongoing now. Plans are to begin production within three weeks.
        
        You have never met your group leaders although you've heard that they are technically competent with at least some supervisory experience. This is a brand new facility and as yet there are no clear vision and strategies to implement the teams, to determine how things should run, what the rules are, etc. As it relates to the manufacturing side of the plant, establishing those things is your responsibility.`,
        problems: [],
        task: `You have about 5 minutes to think about this situation and determine how you would like to approach it. You will be meeting with one of your group leaders in about 5 minutes and you need to give him/her an overview of your philosophy for the facility, what general things you want to cover, short and/or long term plans/goals, etc. Essentially you need to let him/her know your general plans, style of leadership, expectations, etc. You can ask questions of the group leader if you like, although he/she may not be able to answer all your questions. You will be able to spend about 10 minutes with the group leader.`,
        keepInMind:
          "There are no right or wrong answers. You are free to structure this meeting, the facility, etc., any way that you feel most comfortable. Treat the group leader as if he/she actually were one of your group leaders.",
      },
      {
        section: "Section 3",
        sectitle: "Past Behavior Questions",
        description: `We will ask you a number of questions about your recent experiences.`,
        problems: [],
        task: "",
        keepInMind: "",
      },
      {
        section: "Section 4",
        sectitle: "Leadership Simulation 2",
        description: `You work as an area manager at one of your company's largest call centers. Your direct line of reports is shown in the diagram below.
        
        As you can see from the diagram, you have 6 group leaders who report directly to you. Each group leader has 10 team leaders as direct reports. Each team leader overviews a team of approximately 15 team members. In total, there are over 900 employees who report directly or indirectly to you.
        
        One of your group leaders, Kerri, has been having a lot of problems with the teams that report to him/her, and especially with 3 of them. Overall, the performance of Kerri's group (approximately 150 employees) has been less than acceptable for the past two months. You mentioned your concern with him/her once about 4 weeks ago. Kerri assured you that (s)he would take care of the problems. Unfortunately, nothing has changed since then.
`,
        problems: [
          `There has been a high level of absenteeism on 3 of his/her teams (teams 1, 3, 5) for the past 3 months and the past month it was much higher. Team members are allowed 5 personal health days during the year in addition to vacation days and medical leave days for serious problems. Most team members don't use these personal leave days, but it's common knowledge that some team members "work the system" and use up all 5 days. Over the past month, there has been a high amount of personal leave days on these 3 teams causing them to use temporary employees as replacements.`,
          `In addition to the absenteeism, these 3 teams have had a high level of missed production goals (i.e., calls per hour) and service problems (e.g., customer complaints, recalls, etc.), which is probably associated with the heavy reliance on temporary employees. This level of quality and production problems is clearly unacceptable and needs to be resolved quickly.`,
        ],
        task: "",
        keepInMind:
          "Kerri's a young leader who you feel has a lot of potential. At the same time (s)he has a lot of problems relating to others because (s)he is such a perfectionist and tough disciplinarian. (S)he expects a lot of himself/herself and expects the same high standards from others. This is why Kerry has moved up so quickly in the organization after starting only 2 years ago as a team member. You feel that Kerri needs to develop skills in effectively demanding high standards of others without alienating them. You asked Kerri to stop by and talk about what's happening on his/her team and what to do about it to get things turned around. Your schedule is pretty busy and you only have about 15 minutes to talk with Kerri. Also, you're going to be out of the plant for the next 3 days at a training seminar.",
      },
      {
        section: "Section 5",
        sectitle: "Wrap Up and Closing",
        description: `It will be explained by the interviewer`,
        problems: [],
        task: "",
        keepInMind: "",
      },
    ],
  },
};
