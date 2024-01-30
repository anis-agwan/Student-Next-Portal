"use client";

import React, { useEffect, useState } from "react";

import {
  Page,
  Line,
  Svg,
  Text,
  Image,
  Document,
  StyleSheet,
  Canvas,
} from "@react-pdf/renderer";

import BIcon from "./BinghamtonIcon.png";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    color: "black",
  },
  title: {
    fontSize: 12,
    fontFamily: "Times-Roman",
  },
  horiLine: {
    width: 1000,
    height: 1,
    top: 2,
  },
  bIcon: {
    position: "absolute",
    minWidth: "100%",
    minHeight: "100%",
    height: "80%",
    width: "100%",
    top: "15%",
    left: "5%",
    opacity: 0.06,
    margin: 10,
  },
  sname: {
    position: "relative",
    top: 20,
    left: 0,
    fontSize: 18,
    fontWeight: 600,
    fontFamily: "Times-Roman",
  },
  bNumber: {
    fontSize: 14,
    fontWeight: 400,
    fontFamily: "Times-Roman",
  },
  date: {
    top: 23,
    fontSize: 14,
    fontWeight: 200,
    color: "grey",
    marginBottom: 40,
  },
  Score: {
    position: "relative",
    top: 40,
    left: 20,
    fontSize: 28,
    textAlign: "left",
    color: "#FA8D33",
  },
  text: {
    top: 1,
    left: 65,
    marginBottom: 7,
    fontSize: 16,
    fontWeight: 600,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  comment: {
    left: 65,
    marginRight: 100,
    fontSize: 14,
    fontWeight: 400,
    textAlign: "justify",
    fontFamily: "Times-Roman",
    flexWrap: "wrap",
    color: "#525252",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 460,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  svgLine: {
    marginBottom: 20,
    left: -35,
    backgroundColor: "#E5E4E2",
    height: 1,
    top: 10,
    width: 600,
  },

  startLine: {
    left: 38,
    backgroundColor: "black",
    height: 20,
    top: 10,
    width: 2,
  },

  redBarLine: {
    marginBottom: 20,
    left: 40,
    height: 10,
    top: -15,
    backgroundColor: "orange",
  },

  greenBarLine: {
    marginBottom: 20,
    left: 40,
    height: 10,
    top: -15,
    backgroundColor: "green",
  },

  yellowBarLine: {
    marginBottom: 20,
    left: 40,
    height: 10,
    top: -15,
    backgroundColor: "yellow",
  },

  barBg: {
    left: 40,
    right: 40,
    backgroundColor: "#d9d9d9",
    height: 10,
    top: -5,
  },

  needsImprov: {
    top: 50,
    left: 20,
    fontSize: 10,
    textAlign: "left",
    color: "#FA8D33",
  },

  excellent: {
    top: -22,
    left: -20,
    right: 110,
    width: "100%",
    fontSize: 10,
    textAlign: "right",
    color: "green",
  },
});

export const Pdfcreate = ({ studentData }) => {
  const [chartsLoaded, setChartsLoaded] = useState(false);
  // console.log(studentData);
  const todayDate = new Date();
  const [monthName, setMonthName] = useState();

  useEffect(() => {
    const month = todayDate.toLocaleString("default", { month: "long" });

    // console.log(month);
    setMonthName(month);
  }, []);

  const widthCalculator = (size) => {
    let tempVal = size * 10;
    return (tempVal * 85) / 100;
  };

  return (
    <>
      <>
        <Document>
          <Page size="A4" style={styles.body}>
            <Text style={styles.title} fixed>
              LEADERSHIP COMPETENCIES
            </Text>
            <Svg style={styles.svgLine} fixed>
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={1}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Text style={styles.sname}>
              {studentData.info.firstName} {studentData.info.lastName}
              <Text style={styles.bNumber}>
                {" "}
                ({studentData.info.bingNumber})
              </Text>
            </Text>

            <Text style={styles.date}>
              {`${monthName} ${todayDate.getDate()}, ${todayDate.getFullYear()}`}
            </Text>
            <Image style={styles.bIcon} src={BIcon} fixed></Image>

            {/* Personal Beliefs */}

            <Text style={styles.Score}>
              {Math.floor(studentData.PB.openToChangeScore / 10) === 0
                ? `0${studentData.PB.openToChangeScore}`
                : studentData.PB.openToChangeScore}
            </Text>

            <Text style={styles.text}>Open to Change/New Ideas </Text>
            <Text style={styles.comment}>
              {studentData.PB.openToChangeScoreComment}
            </Text>

            <Text style={styles.needsImprov}>Needs Improvement</Text>
            <Svg style={styles.startLine}>
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Svg style={styles.barBg} width={"85%"}>
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>

            <Svg
              style={
                widthCalculator(studentData.PB.openToChangeScore) > 60
                  ? styles.greenBarLine
                  : widthCalculator(studentData.PB.openToChangeScore) > 30
                  ? styles.yellowBarLine
                  : styles.redBarLine
              }
              width={`${widthCalculator(studentData.PB.openToChangeScore)}%`}
            >
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Text style={styles.excellent}>Excellent</Text>

            <Text style={styles.Score}>
              {Math.floor(studentData.PB.coachingScore / 10) === 0
                ? `0${studentData.PB.coachingScore}`
                : studentData.PB.coachingScore}
            </Text>
            <Text style={styles.text}>Coaching Behaviors and Beliefs </Text>
            <Text style={styles.comment}>
              {studentData.PB.coachingScoreComment}
            </Text>

            <Text style={styles.needsImprov}>Needs Improvement</Text>
            <Svg style={styles.startLine}>
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Svg style={styles.barBg} width={"85%"}>
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>

            <Svg
              style={
                widthCalculator(studentData.PB.coachingScore) > 60
                  ? styles.greenBarLine
                  : widthCalculator(studentData.PB.coachingScore) > 30
                  ? styles.yellowBarLine
                  : styles.redBarLine
              }
              width={`${widthCalculator(studentData.PB.coachingScore)}%`}
            >
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Text style={styles.excellent}>Excellent</Text>

            <Text style={styles.Score}>
              {Math.floor(studentData.PB.empoweringScore / 10) === 0
                ? `0${studentData.PB.empoweringScore}`
                : studentData.PB.empoweringScore}
            </Text>
            <Text style={styles.text}>Empowerment Beliefs </Text>
            <Text style={styles.comment}>
              {studentData.PB.empoweringScoreComment}
            </Text>

            <Text style={styles.needsImprov}>Needs Improvement</Text>
            <Svg style={styles.startLine}>
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Svg style={styles.barBg} width={"85%"}>
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>

            <Svg
              style={
                widthCalculator(studentData.PB.empoweringScore) > 60
                  ? styles.greenBarLine
                  : widthCalculator(studentData.PB.empoweringScore) > 30
                  ? styles.yellowBarLine
                  : styles.redBarLine
              }
              width={`${widthCalculator(studentData.PB.empoweringScore)}%`}
            >
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Text style={styles.excellent}>Excellent</Text>

            <Text style={styles.Score}>
              {Math.floor(studentData.PB.teamworkScore / 10) === 0
                ? `0${studentData.PB.teamworkScore}`
                : studentData.PB.teamworkScore}
            </Text>
            <Text>{"          "}</Text>
            <Text style={styles.text}>Teamwork Beliefs </Text>
            <Text style={styles.comment}>
              {studentData.PB.teamworkScoreComment}
            </Text>

            <Text style={styles.needsImprov}>Needs Improvement</Text>
            <Svg style={styles.startLine}>
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Svg style={styles.barBg} width={"85%"}>
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>

            <Svg
              style={
                widthCalculator(studentData.PB.teamworkScore) > 60
                  ? styles.greenBarLine
                  : widthCalculator(studentData.PB.teamworkScore) > 30
                  ? styles.yellowBarLine
                  : styles.redBarLine
              }
              width={`${widthCalculator(studentData.PB.teamworkScore)}%`}
            >
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Text style={styles.excellent}>Excellent</Text>

            <Text style={styles.Score}>
              {Math.floor(studentData.PB.planningAndOrganizingScore / 10) === 0
                ? `0${studentData.PB.planningAndOrganizingScore}`
                : studentData.PB.planningAndOrganizingScore}
            </Text>
            <Text style={styles.text}>Planning and Organizing </Text>
            <Text style={styles.comment}>
              {studentData.PB.planningAndOrganizingScoreComment}
            </Text>

            <Text style={styles.needsImprov}>Needs Improvement</Text>
            <Svg style={styles.startLine}>
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Svg style={styles.barBg} width={"85%"}>
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Svg
              style={
                widthCalculator(studentData.PB.planningAndOrganizingScore) > 60
                  ? styles.greenBarLine
                  : widthCalculator(studentData.PB.planningAndOrganizingScore) >
                    30
                  ? styles.yellowBarLine
                  : styles.redBarLine
              }
              width={`${widthCalculator(
                studentData.PB.planningAndOrganizingScore
              )}%`}
            >
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Text style={styles.excellent}>Excellent</Text>

            {/* End of PB */}

            {/* Critical Thinking */}
            {/* <Text style={styles.text}>" "</Text> */}

            {/* <Text style={styles.text}>Little Doubt in CT section</Text> */}

            <Text style={styles.Score}>
              {Math.floor(studentData.CT.sec1AnalysisScore / 10) === 0
                ? `0${studentData.CT.sec1AnalysisScore}`
                : studentData.CT.sec1AnalysisScore}
            </Text>
            <Text style={styles.text}>Analyses Critical Thinking</Text>
            <Text style={styles.comment}>
              {studentData.CT.analysesScoreComment}
            </Text>

            <Text style={styles.needsImprov}>Needs Improvement</Text>
            <Svg style={styles.startLine}>
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Svg style={styles.barBg} width={"85%"}>
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Svg
              style={
                widthCalculator(studentData.CT.sec1AnalysisScore) > 60
                  ? styles.greenBarLine
                  : widthCalculator(studentData.CT.sec1AnalysisScore) > 30
                  ? styles.yellowBarLine
                  : styles.redBarLine
              }
              width={`${widthCalculator(studentData.CT.sec1AnalysisScore)}%`}
            >
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Text style={styles.excellent}>Excellent</Text>

            <Text style={styles.Score}>
              {Math.floor(studentData.CT.sec2ConnectionsScore / 10) === 0
                ? `0${studentData.CT.sec2ConnectionsScore}`
                : studentData.CT.sec2ConnectionsScore}
            </Text>
            <Text style={styles.text}>Decisiveness Critical Thinking</Text>
            <Text style={styles.comment}>
              {studentData.CT.decisivenessScoreComment}
            </Text>

            <Text style={styles.needsImprov}>Needs Improvement</Text>
            <Svg style={styles.startLine}>
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Svg style={styles.barBg} width={"85%"}>
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Svg
              style={
                widthCalculator(studentData.CT.sec2ConnectionsScore) > 60
                  ? styles.greenBarLine
                  : widthCalculator(studentData.CT.sec2ConnectionsScore) > 30
                  ? styles.yellowBarLine
                  : styles.redBarLine
              }
              width={`${widthCalculator(studentData.CT.sec2ConnectionsScore)}%`}
            >
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Text style={styles.excellent}>Excellent</Text>

            <Text style={styles.Score}>
              {Math.floor(studentData.CT.sec3DepthScore / 10) === 0
                ? `0${studentData.CT.sec3DepthScore}`
                : studentData.CT.sec3DepthScore}
            </Text>
            <Text style={styles.text}>Logical Reasoning Critical Thinking</Text>
            <Text style={styles.comment}>
              {studentData.CT.logicalReasoningScoreComment}
            </Text>

            <Text style={styles.needsImprov}>Needs Improvement</Text>
            <Svg style={styles.startLine}>
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Svg style={styles.barBg} width={"85%"}>
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Svg
              style={
                widthCalculator(studentData.CT.sec3DepthScore) > 60
                  ? styles.greenBarLine
                  : widthCalculator(studentData.CT.sec3DepthScore) > 30
                  ? styles.yellowBarLine
                  : styles.redBarLine
              }
              width={`${widthCalculator(studentData.CT.sec3DepthScore)}%`}
            >
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Text style={styles.excellent}>Excellent</Text>

            {/* End of CT */}

            {/* Difficult Decisions */}

            <Text style={styles.Score}>
              {Math.floor(
                studentData.DD.rankData.convertedRankDecisionScore / 10
              ) === 0
                ? `0${studentData.DD.rankData.convertedRankDecisionScore}`
                : studentData.DD.rarankDatankScore.convertedRankDecisionScore}
            </Text>
            <Text style={styles.text}>Judgement </Text>
            <Text style={styles.comment}>
              {studentData.DD.rankData.judgementScoreComment}
            </Text>

            <Text style={styles.needsImprov}>Needs Improvement</Text>
            <Svg style={styles.startLine}>
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Svg style={styles.barBg} width={"85%"}>
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Svg
              style={
                widthCalculator(
                  studentData.DD.rankData.convertedRankDecisionScore
                ) > 60
                  ? styles.greenBarLine
                  : widthCalculator(
                      studentData.DD.rankData.convertedRankDecisionScore
                    ) > 30
                  ? styles.yellowBarLine
                  : styles.redBarLine
              }
              width={`${widthCalculator(
                studentData.DD.rankData.convertedRankDecisionScore
              )}%`}
            >
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Text style={styles.excellent}>Excellent</Text>

            <Text style={styles.Score}>
              {Math.floor(
                studentData.DD.rateData.convertedDesirabilityDecisionsScore / 10
              ) === 0
                ? `0${studentData.DD.rateData.convertedDesirabilityDecisionsScore}`
                : studentData.DD.rateData.convertedDesirabilityDecisionsScore}
            </Text>
            <Text style={styles.text}>Consideration of Alternatives </Text>
            <Text style={styles.comment}>
              {studentData.DD.rateData.considerationOfAlternativesScoreComment}
            </Text>

            <Text style={styles.needsImprov}>Needs Improvement</Text>
            <Svg style={styles.startLine}>
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Svg style={styles.barBg} width={"85%"}>
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Svg
              style={
                widthCalculator(
                  studentData.DD.rateData.convertedDesirabilityDecisionsScore
                ) > 60
                  ? styles.greenBarLine
                  : widthCalculator(
                      studentData.DD.rateData
                        .convertedDesirabilityDecisionsScore
                    ) > 30
                  ? styles.yellowBarLine
                  : styles.redBarLine
              }
              width={`${widthCalculator(
                studentData.DD.rateData.convertedDesirabilityDecisionsScore
              )}%`}
            >
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Text style={styles.excellent}>Excellent</Text>

            {/* End of DD */}

            {/* Behavioral Interview */}
            <Text>{"      "}</Text>
            <Text>{"      "}</Text>
            <Text>{"      "}</Text>
            <Text>{"      "}</Text>
            <Text>{"      "}</Text>
            <Text>{"      "}</Text>
            <Text>{"      "}</Text>
            <Text>{"      "}</Text>
            <Text style={styles.Score}>
              {Math.floor(studentData.BI.biScoreCR / 10) === 0
                ? `0${studentData.BI.biScoreCR}`
                : studentData.BI.biScoreCR}
            </Text>
            <Text style={styles.text}>Contingent Reward</Text>
            <Text style={styles.comment}>{studentData.BI.biCommentCR}</Text>

            <Text style={styles.needsImprov}>Needs Improvement</Text>
            <Svg style={styles.startLine}>
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Svg style={styles.barBg} width={"85%"}>
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Svg
              style={
                widthCalculator(studentData.BI.biScoreCR) > 60
                  ? styles.greenBarLine
                  : widthCalculator(studentData.BI.biScoreCR) > 30
                  ? styles.yellowBarLine
                  : styles.redBarLine
              }
              width={`${widthCalculator(studentData.BI.biScoreCR)}%`}
            >
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Text style={styles.excellent}>Excellent</Text>

            <Text style={styles.Score}>
              {Math.floor(studentData.BI.biScoreIII / 10) === 0
                ? `0${studentData.BI.biScoreIII}`
                : studentData.BI.biScoreIII}
            </Text>
            <Text style={styles.text}>
              Idealized Influence and Inspiration{" "}
            </Text>
            <Text style={styles.comment}>{studentData.BI.biCommentIII}</Text>

            <Text style={styles.needsImprov}>Needs Improvement</Text>
            <Svg style={styles.startLine}>
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Svg style={styles.barBg} width={"85%"}>
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Svg
              style={
                widthCalculator(studentData.BI.biScoreIII) > 60
                  ? styles.greenBarLine
                  : widthCalculator(studentData.BI.biScoreIII) > 30
                  ? styles.yellowBarLine
                  : styles.redBarLine
              }
              width={`${widthCalculator(studentData.BI.biScoreIII)}%`}
            >
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Text style={styles.excellent}>Excellent</Text>

            <Text style={styles.Score}>
              {Math.floor(studentData.BI.biScoreIS / 10) === 0
                ? `0${studentData.BI.biScoreIS}`
                : studentData.BI.biScoreIS}
            </Text>
            <Text style={styles.text}>Intellectual Stimulation </Text>
            <Text style={styles.comment}>{studentData.BI.biCommentIS}</Text>

            <Text style={styles.needsImprov}>Needs Improvement</Text>
            <Svg style={styles.startLine}>
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Svg style={styles.barBg} width={"85%"}>
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Svg
              style={
                widthCalculator(studentData.BI.biScoreIS) > 60
                  ? styles.greenBarLine
                  : widthCalculator(studentData.BI.biScoreIS) > 30
                  ? styles.yellowBarLine
                  : styles.redBarLine
              }
              width={`${widthCalculator(studentData.BI.biScoreIS)}%`}
            >
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Text style={styles.excellent}>Excellent</Text>

            <Text>{"      "}</Text>
            <Text>{"      "}</Text>
            <Text>{"      "}</Text>
            <Text>{"      "}</Text>
            <Text>{"      "}</Text>
            <Text>{"      "}</Text>
            <Text>{"      "}</Text>
            <Text>{"      "}</Text>
            <Text style={styles.Score}>
              {Math.floor(studentData.BI.biScoreIC / 10) === 0
                ? `0${studentData.BI.biScoreIC}`
                : studentData.BI.biScoreIC}
            </Text>
            <Text style={styles.text}>Individualized Consideration </Text>
            <Text style={styles.comment}>{studentData.BI.biCommentIC}</Text>

            <Text style={styles.needsImprov}>Needs Improvement</Text>
            <Svg style={styles.startLine}>
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Svg style={styles.barBg} width={"85%"}>
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Svg
              style={
                widthCalculator(studentData.BI.biScoreIC) > 60
                  ? styles.greenBarLine
                  : widthCalculator(studentData.BI.biScoreIC) > 30
                  ? styles.yellowBarLine
                  : styles.redBarLine
              }
              width={`${widthCalculator(studentData.BI.biScoreIC)}%`}
            >
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Text style={styles.excellent}>Excellent</Text>

            <Text style={styles.Score}>
              {Math.floor(studentData.BI.biScoreSR / 10) === 0
                ? `0${studentData.BI.biScoreSR}`
                : studentData.BI.biScoreSR}
            </Text>
            <Text style={styles.text}>Sharing Responsibility </Text>
            <Text style={styles.comment}>{studentData.BI.biCommentSR}</Text>

            <Text style={styles.needsImprov}>Needs Improvement</Text>
            <Svg style={styles.startLine}>
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Svg style={styles.barBg} width={"85%"}>
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Svg
              style={
                widthCalculator(studentData.BI.biScoreSR) > 60
                  ? styles.greenBarLine
                  : widthCalculator(studentData.BI.biScoreSR) > 30
                  ? styles.yellowBarLine
                  : styles.redBarLine
              }
              width={`${widthCalculator(studentData.BI.biScoreSR)}%`}
            >
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Text style={styles.excellent}>Excellent</Text>

            <Text style={styles.Score}>
              {Math.floor(studentData.BI.biScoreSMI / 10) === 0
                ? `0${studentData.BI.biScoreSMI}`
                : studentData.BI.biScoreSMI}
            </Text>

            <Text style={styles.text}>Seeking More Information </Text>
            <Text style={styles.comment}>{studentData.BI.biCommentSMI}</Text>

            <Text style={styles.needsImprov}>Needs Improvement</Text>
            <Svg style={styles.startLine}>
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Svg style={styles.barBg} width={"85%"}>
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Svg
              style={
                widthCalculator(studentData.BI.biScoreSMI) > 60
                  ? styles.greenBarLine
                  : widthCalculator(studentData.BI.biScoreSMI) > 30
                  ? styles.yellowBarLine
                  : styles.redBarLine
              }
              width={`${widthCalculator(studentData.BI.biScoreSMI)}%`}
            >
              <Line
                x1="0"
                y1="3"
                x2="0"
                y2="3"
                strokeWidth={10}
                stroke="rgb(0,0,0)"
              />
            </Svg>
            <Text style={styles.excellent}>Excellent</Text>

            {/* End of BI */}

            {/* <Text style={styles.Score}> 07 </Text>
            <Text style={styles.text}>
              Transactional Leadership (NEEDS TO BE CHANGED){" "}
            </Text>
            <Text style={styles.comment}>
              Clearly enjoys change. Solicits new ideas from others and acts on
              them to help produce change.
            </Text> */}

            <Text
              style={styles.pageNumber}
              render={({ pageNumber, totalPages }) =>
                `Page ${pageNumber} of ${totalPages}`
              }
              fixed
            />
          </Page>
        </Document>
      </>
    </>
  );
};
