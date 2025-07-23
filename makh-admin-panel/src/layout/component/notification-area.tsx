import Image from "next/image";
import dayjs from "dayjs";
import React, { } from "react";
import { Notification, Close } from "@/svg";
import { useGetAllOrdersQuery } from "@/redux/order/orderApi";
import default_img from '@assets/img/product/prodcut-1.jpg';

// prop type
type IPropType = {
  nRef: React.RefObject<HTMLDivElement>;
  notificationOpen: boolean;
  handleNotificationOpen: () => void;
};

const NotificationArea = ({nRef,notificationOpen,handleNotificationOpen}: IPropType) => {
  const {data: allOrders,isError,isLoading} = useGetAllOrdersQuery();

  return (
    <div ref={nRef}>
      <button
        onClick={handleNotificationOpen}
        className="relative w-[40px] h-[40px] leading-[40px] rounded-md text-gray border border-gray hover:bg-themeLight hover:text-theme hover:border-themeLight"
      >
        <Notification />
        <span className="w-[20px] h-[20px] inline-block bg-danger rounded-full absolute -top-[4px] -right-[4px] border-[2px] border-white text-xs leading-[18px] font-medium text-white">
          {allOrders?.data && allOrders?.data.slice(0,4).length}
        </span>
      </button>

      {notificationOpen && (
        <div className="absolute w-[280px] sm:w-[350px] h-auto top-full -right-[60px] sm:right-0 shadow-lg rounded-md bg-white py-5 px-5">
          {allOrders?.data &&
            allOrders?.data.slice(0,4).map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between last:border-0 border-b border-gray pb-4 mb-4 last:pb-0 last:mb-0"
              >
                <div className="flex items-center space-x-3">
                  <div className="">
                    <Image
                      className="w-[40px] h-[40px] rounded-md"
                      src={default_img}
                      alt="img"
                      width={40}
                      height={40}
                      priority
                    />
                  </div>
                  <div className="">
                    <h6 className="font-medium text-gray-500 mb-0">{item.name} <span className="font-bold">
                      ₹{item.totalAmount}</span> USD order!</h6>
                    <div className="flex items-center mt-2">
                      <span
                        className={`text-[11px] px-2 py-1 rounded-md leading-none text-success bg-success/10  font-medium`}
                      >
                        New Order
                      </span>

                      <span className="text-tiny leading-none">
                        {dayjs(item.createdAt).format("MMM D, YYYY h:mm A")}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="">
                  <button className="hover:text-danger">
                    <Close />
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default NotificationArea;
