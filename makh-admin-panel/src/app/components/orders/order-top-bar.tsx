import { Search } from "@/svg";
import React from "react";

const OrderTopBar = () => {
  return (
    <div className="tp-search-box flex items-center justify-between px-8 py-8 flex-wrap">
      <div className="search-input relative">
        <input
          className="input h-[44px] w-full pl-14"
          type="text"
          placeholder="Search by order id"
        />
        <button className="absolute top-1/2 left-5 translate-y-[-50%] hover:text-theme">
          <Search />
        </button>
      </div>
      <div className="flex justify-end space-x-6">
        <div className="search-select mr-3 flex items-center space-x-3 ">
          <span className="text-tiny inline-block leading-none -translate-y-[2px]">
            Status :{" "}
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

export default OrderTopBar;
