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

export const ReportCT = () => {
  const reportCtx = useContext(ReportContext);
  const [ctData, setCTData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const getCTData = async () => {
    setLoading(true);
    await reportCtx.getCTGraphData().then((r) => {
      // console.log(r);
      let data = {
        Data: {
          labels: ["Decisiveness", "Reasoning", "Analysis"],
          datasets: [
            {
              data: [
                r.sec1AnalysisScore,
                r.sec2ConnectionsScore,
                r.sec3DepthScore,
              ],
              backgroundColor: [
                // data[0] > 6 ? ("green rgba(89, 247, 108, 0.8)") :((data[0] < 6 && data[0] > 3) ? (" yellow rgba(227, 247, 88, 0.8)") : ("orange rgba(255, 106, 31, 0.8)") ),

                //First Bar
                r.sec1AnalysisScore > 6
                  ? "rgba(89, 247, 108, 0.8)"
                  : r.sec1AnalysisScore < 6 && r.sec1AnalysisScore > 3
                  ? "rgba(227, 247, 88, 0.8)"
                  : "rgba(255, 106, 31, 0.8)",

                //Second Bar
                r.sec2ConnectionsScore > 6
                  ? "rgba(89, 247, 108, 0.8)"
                  : r.sec2ConnectionsScore <= 6 && r.sec2ConnectionsScore > 3
                  ? "rgba(227, 247, 88, 0.8)"
                  : "rgba(255, 106, 31, 0.8)",

                //Third Bar
                r.sec3DepthScore > 6
                  ? "rgba(89, 247, 108, 0.8)"
                  : r.sec3DepthScore <= 6 && r.sec3DepthScore > 3
                  ? "rgba(227, 247, 88, 0.8)"
                  : "rgba(255, 106, 31, 0.8)",
              ],
              borderColor: "rgba(0,0,0,1)",
              borderWidth: 2,
            },
          ],
        },
      };

      const comments = [
        r.decisivenessScoreComment,
        r.logicalReasoningScoreComment,
        r.analysesScoreComment,
      ];

      setComments(comments);
      setCTData(data);
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
            console.log(value, index, ticks);

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
    getCTData();
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
          {Object.keys(ctData).length > 0 ? (
            <>
              <div className="w-10/12 pt-3">
                <Bar data={ctData.Data} options={config} />
              </div>
              <div className="flex flex-col w-full px-6 pb-4">
                <ol type="1">
                  {comments.map((e, idx) => {
                    return (
                      <div key={idx}>
                        <li>
                          <h3>
                            <b>{ctData.Data.labels[idx]} :</b> {e}
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
