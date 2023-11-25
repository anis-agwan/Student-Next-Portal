import { ReportContext } from "@/app/store/reports-context";
import React, { useContext, useEffect, useState } from "react";

export const ReportDD = () => {
  const reportCtx = useContext(ReportContext);
  const [ddData, setDDData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);

  const getDDData = async () => {
    setLoading(true);

    setLoading(false);
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
          <>ReportDD</>
        </>
      )}
    </div>
  );
};
