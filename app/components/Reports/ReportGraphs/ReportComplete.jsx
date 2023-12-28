import { AuthContext } from "@/app/store/auth-context";
import { ReportContext } from "@/app/store/reports-context";
import React, { useContext, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Pdfcreate } from "../../PDF/Pdfcreate";

export const ReportComplete = () => {
  const authCtx = useContext(AuthContext);
  const reportCtx = useContext(ReportContext);
  console.log(authCtx.user);
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [completeStudentData, setCompStudentData] = useState({});

  const checkUser = async (bNum) => {
    let data = {};

    let whatit = await authCtx.didStudentComplete(bNum).then((r) => {
      console.log("DBDB", r);
      if (!r) {
        alert(
          "You have not completed all the assessment quizes and interview."
        );
        // return;
      }

      return r;
    });

    if (!whatit) {
      console.log(whatit);
      return;
    }

    await authCtx.pdfStudentInfo(bNum).then((r) => {
      // console.log(r);
      data = r;
    });
    console.log("HERE: ", data);
    return data;
  };

  const pdfLoadHandler = async (bNum) => {
    console.log(completeStudentData);

    let sData = {};
    await authCtx.pdfStudentInfo(bNum).then((r) => {
      console.log(r);
      sData["info"] = r;
    });

    await reportCtx.getPBGraphData(bNum).then((r) => {
      sData["PB"] = r;
    });

    await reportCtx.getCTGraphData(bNum).then((r) => {
      // console.log("CT: ", r);
      sData["CT"] = r;
    });
    await reportCtx.getDDGraphData(bNum).then((r) => {
      // console.log("DD: ", r);
      sData["DD"] = r;
    });
    await reportCtx.getBIGraphData(bNum).then((r) => {
      console.log("BI: ", r);
      sData["BI"] = r;
    });
    console.log(sData);
    setCompStudentData(sData);
    // console.log(completeStudentData);
  };

  return (
    <div className="pt-2 overflow-auto flex flex-col gap-8 w-full justify-center items-center ">
      <div className="flex flex-col w-2/3 justify-center items-center">
        <h3 className="text-2xl text-center	">
          Click on the button below to download a PDF copy of your assessment
        </h3>
        <h3 className="text-md text-center	">
          (The reports are only available if you are done with your behavioral
          interview session. if not, then please coordinate with your faculty.)
        </h3>
      </div>
      <div>
        {isDataLoaded ? (
          <>
            <PDFDownloadLink
              className="Pdfcreate"
              document={<Pdfcreate studentData={completeStudentData} />}
              fileName={`${authCtx.user.bingNumber}_MBA_Assessment_Report`}
            >
              {({ loading }) =>
                loading ? (
                  <button className="bg-black text-white">
                    loading PDF...
                  </button>
                ) : (
                  <button
                    className="w-full h-1/2 z-0 "
                    // onClick={handlePDFClick}
                  >
                    <div className="w-full bg-binghamton-green hover:bg-green-700 px-8 py-4 rounded-lg text-white">
                      Download PDF
                    </div>
                  </button>
                )
              }
              {/* <div className="searchBtn h-2/4 p-5 flex justify-center items-center">
                Click to download reports
              </div> */}
            </PDFDownloadLink>
          </>
        ) : (
          <>
            <div
              className="w-full bg-binghamton-green hover:bg-green-700 px-8 py-4 rounded-lg text-white"
              onClick={async () => {
                let dd = await checkUser(authCtx.user.bingNumber);
                console.log(dd);
                if (dd === undefined) {
                  return;
                }
                if (dd && Object.keys(dd).length === 0) {
                  return;
                }
                await pdfLoadHandler(authCtx.user.bingNumber);
                setDataLoaded(true);
              }}
            >
              Load PDF
            </div>
          </>
        )}
      </div>
    </div>
  );
};
