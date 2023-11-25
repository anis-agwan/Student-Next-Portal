import { ReportContext } from "@/app/store/reports-context";
import React, { useContext, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { splitStringAfterEightWords } from "./split";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const ReportDD = () => {
  const reportCtx = useContext(ReportContext);
  const [ddData, setDDData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const commlabels = [
    "Judgement Score Comment",
    "Consideration of Alternatives Score Comment",
  ];

  const getDDData = async () => {
    setLoading(true);
    await reportCtx.getDDGraphData().then((res) => {
      console.log(res);
      let data = {
        Data: {
          labels: ["Rank Score", "Rate Score"],
          datasets: [
            {
              backgroundColor: [
                "rgba(255, 45, 45, 0.8)",
                "rgba(45, 154, 255, 0.8)",
              ],
              borderColor: "rgba(0,0,0,1)",
              // ["rgba(255, 45, 45, 1)", "rgba(45, 154, 255, 1)"],
              borderWidth: 2,
              data: [
                res.rankData.convertedRankDecisionScore,
                res.rateData.convertedDesirabilityDecisionsScore,
              ],
            },
          ],
        },
      };

      const comments = [
        res.rankData.judgementScoreComment,
        res.rateData.considerationOfAlternativesScoreComment,
      ];

      setComments(comments);
      setDDData(data);
    });

    setLoading(false);
  };

  const config = {
    responsive: true,
    scale: {
      beginAtZero: true,
      max: 10,
      min: 0,
      stepSize: 1,
    },
    plugins: {
      legend: false,
      tooltip: {
        displayColors: false,
        callbacks: {
          title: (context) => {
            return `Score: ${context[0].formattedValue}`;
          },
          label: (context) => {
            const st = splitStringAfterEightWords(comments[context.dataIndex]);
            return st;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, ticks) {
            if (index === 0) {
              return "Needs Development: " + value;
            } else if (index === config.scale.max) {
              return "Excellent: " + value;
            } else {
              return value;
            }

            // return "$" + value;
          },
          align: "center",
        },
      },
    },
  };

  useEffect(() => {
    getDDData();
  }, []);

  return (
    <div className="pt-2 overflow-auto flex flex-col w-full justify-center items-center ">
      {isLoading ? (
        <>
          <div>
            <h3> Loading....</h3>
          </div>
        </>
      ) : (
        <>
          {Object.keys(ddData).length > 0 ? (
            <>
              <div className="w-10/12 pt-3">
                <Bar data={ddData.Data} options={config} />
              </div>
              <div className="flex flex-col w-full px-6 pb-4">
                <ol type="1">
                  {comments.map((e, idx) => {
                    return (
                      <div key={idx} className="p-2">
                        <li>
                          <h3>
                            <b>{commlabels[idx]} :</b> {e}
                          </h3>
                        </li>
                      </div>
                    );
                  })}
                </ol>
              </div>
            </>
          ) : (
            <>
              <div>
                <h3>No Data</h3>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
