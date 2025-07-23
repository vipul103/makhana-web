"use client"
import React from "react";
import OrderTable from "./order-table";

const OrderArea = () => {
  return (
    <>
      <div className="bg-white rounded-t-md rounded-b-md shadow-xs py-4">
        {/* order top bar start */}
        {/* <OrderTopBar /> */}
        {/* order top bar end */}

        {/* order table start */}
        <OrderTable />
        {/* order table end */}
      </div>
    </>
  );
};

export default OrderArea;
