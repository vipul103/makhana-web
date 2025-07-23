import dayjs from "dayjs";
import React from "react";

const OrderDetailsTop = ({invoice,date}:{invoice:number,date:string}) => {
  return (
    <div className="flex items-center flex-wrap justify-between px-8 mb-6 bg-white rounded-t-md rounded-b-md shadow-xs py-6">
      <div className="relative">
        <h5 className="font-normal mb-0">Invoice No : #{invoice}</h5>
        <p className="mb-0 text-tiny">Order Created : {dayjs(date).format('ddd, MMM D, YYYY h:mm A')}</p>
      </div>
      <div className="flex sm:justify-end flex-wrap sm:space-x-6 mt-5 md:mt-0">
        <div className="search-select mr-3 flex items-center space-x-3 ">
          <span className="text-tiny inline-block leading-none -translate-y-[2px]">
            Change Status :{" "}
          </span>
          <select>
            <option>Delivered</option>
            <option>Pending</option>
            <option>Refunded</option>
            <option>Denied</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsTop;
