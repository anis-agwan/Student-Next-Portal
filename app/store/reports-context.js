"use client";

import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { AuthContext } from "./auth-context";

export const ReportContext = createContext({
  graphState: null,
  changeGraphState: () => {},
  getPBGraphData: () => {},
  getCTGraphData: () => {},
  getDDGraphData: () => {},
  getBIGraphData: () => {},
});

export const ReportContextProvider = ({ children }) => {
  const authCtx = useContext(AuthContext);
  const basePBCT = "http://3.14.232.42";
  const baseDDBI = "http://3.14.159.174";
  const [user, setUser] = useState();
  const [stateOfGraph, setGraphState] = useState(null);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("userDetails"));
    setUser(u);
  }, []);

  const changingState = (section) => {
    // console.log(stateOfGraph);
    setGraphState(section);
  };

  const gettingPBGraphData = async () => {
    try {
      const res = await fetch(
        `${basePBCT}:8441/personal-beliefs/pb/getScores/${user.bingNumber}`
      );

      let data = {};

      await res
        .json()
        .then((rdata) => {
          console.log(rdata);
          data = rdata;
        })
        .catch((err) => {
          // throw new Error(err);
          console.log(err);
        });

      // return res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const gettingCTGraphData = async () => {
    try {
      const res = await fetch(
        `${basePBCT}:8442/critical-thinking/critical-thinking/getScores/${user.bingNumber}`
      );

      let data = {};
      await res
        .json()
        .then((r) => {
          // console.log(r);
          data = r;
        })
        .catch((err) => {
          // throw new Error(err);
          console.log(err);
        });

      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const gettingDDGraphData = async () => {
    try {
      const rankRes = await fetch(
        `${baseDDBI}:8443/situation_q/sq/getRankScores/${user.bingNumber}`
      );
      const rateRes = await fetch(
        `${baseDDBI}:8443/situation_q/sq/getRateScores/${user.bingNumber}`
      );

      let data = {};

      await rankRes.json().then((res) => {
        data["rankData"] = res;
      });

      await rateRes.json().then((res) => {
        data["rateData"] = res;
      });

      // console.log(data);

      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const gettingBIGrapgData = async (bingNumber) => {
    try {
      const url = `${baseDDBI}:8448/bbim/bi/getScores/${bingNumber}`;
      const res = await fetch(url);

      // console.log(res);
      let data = {};
      await res.json().then((r) => {
        // console.log(r);
        data = r;
      });

      return data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ReportContext.Provider
      value={{
        graphState: stateOfGraph,
        changeGraphState: changingState,
        getPBGraphData: gettingPBGraphData,
        getCTGraphData: gettingCTGraphData,
        getDDGraphData: gettingDDGraphData,
        getBIGraphData: gettingBIGrapgData,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};
