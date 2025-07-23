"use client";
import React from "react";
import LineChart from "../chart/line-chart";
import PieChart from "../chart/pie-chart";

const SalesReport = () => {
 
  return (
    <>
      <div className="chart-main-wrapper mb-6 grid grid-cols-12 gap-6">
        <div className=" col-span-12 2xl:col-span-7">
          <div className="chart-single bg-white py-3 px-3 sm:py-10 sm:px-10 h-fit rounded-md">
            <h3 className="text-xl">Sales Statistics</h3>
            <LineChart/>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 2xl:col-span-5 space-y-6">
          <div className="chart-widget bg-white p-4 sm:p-10 rounded-md">
            <h3 className="text-xl mb-8">Most Selling Category</h3>
            {/* <div className="md:h-[252px] 2xl:h-[398px] w-full">
              <canvas
                className="mx-auto md:!w-[240px] md:!h-[240px] 2xl:!w-[360px] 2xl:!h-[360px] "
                id="earningStatics"
              ></canvas>
            </div> */}
            <PieChart/>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesReport;
