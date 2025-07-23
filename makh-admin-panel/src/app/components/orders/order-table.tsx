import React, { useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
// internal
import OrderActions from "./order-actions";
import { Search } from "@/svg";
import ErrorMsg from "../common/error-msg";
import Pagination from "../ui/Pagination";
import OrderStatusChange from "./status-change";
import {useGetAllOrdersQuery} from "@/redux/order/orderApi";
import usePagination from "@/hooks/use-pagination";


const OrderTable = () => {
  const { data: orders, isError, isLoading, error } = useGetAllOrdersQuery();
  const [searchVal,setSearchVal] = useState<string>("");
  const [selectVal,setSelectVal] = useState<string>("");
  const paginationData = usePagination(orders?.data || [], 5);
  const { currentItems, handlePageClick, pageCount } = paginationData;

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <h2>Loading....</h2>;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && orders?.data.length === 0) {
    content = <ErrorMsg msg="No Orders Found" />;
  }

  if (!isLoading && !isError && orders?.success) {
    let orderItems = orders.data;
    if(searchVal){
      orderItems = orderItems.filter(v => v.invoice.toString().includes(searchVal))
    }
    if(selectVal){
      orderItems = orderItems.filter(v => v.status.toLowerCase() === selectVal.toLowerCase())
    }

    content = (
      <>
        <table className="w-[1500px] 2xl:w-full text-base text-left text-gray-500">
          <thead className="bg-white">
            <tr className="border-b border-gray6 text-tiny">
              <th
                scope="col"
                className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold w-[170px]"
              >
                INVOICE NO
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-tiny text-text2 uppercase font-semibold"
              >
                Customer
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end"
              >
                QTY
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end"
              >
                Total
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-9 py-3 text-tiny text-text2 uppercase  font-semibold w-[14%] text-end"
              >
                Action
              </th>
              <th
                scope="col"
                className="px-9 py-3 text-tiny text-text2 uppercase  font-semibold w-[4%] text-end"
              >
                Invoice
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
                <tr
                  key={item._id}
                  className="bg-white border-b border-gray6 last:border-0 text-start mx-9"
                >
                  <td className="px-3 py-3 font-normal text-[#55585B]">
                    #{item.invoice}
                  </td>
                  <td className="pr-8 py-5 whitespace-nowrap">
                    <a
                      href="#"
                      className="flex items-center space-x-5 text-hover-primary text-heading"
                    >
                      {item.user?.imageURL && (
                        <Image
                          className="w-[50px] h-[50px] rounded-full"
                          src={item.user.imageURL}
                          alt="user-img"
                          width={50}
                          height={50}
                        />
                      )}
                      <span className="font-medium">{item?.user?.name}</span>
                    </a>
                  </td>

                  <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                    {item.cart.reduce(
                      (acc, curr) => acc + curr.orderQuantity,
                      0
                    )}
                  </td>
                  <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                    ₹
                    {item.cart
                      .reduce((acc, curr) => acc + curr.price, 0)
                      .toFixed(2)}
                  </td>
                  <td className="px-3 py-3 text-end">
                    <span
                      className={`text-[11px] ${
                        item.status === "pending"
                          ? "text-warning bg-warning/10"
                          : item.status === "delivered"
                          ? "text-success bg-success/10"
                          : item.status === "processing"
                          ? "text-indigo-500 bg-indigo-100"
                          : item.status === "cancel"
                          ? "text-danger bg-danger/10"
                          : ""
                      } px-3 py-1 rounded-md leading-none font-medium text-end`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                    {dayjs(item.createdAt).format("MMM D, YYYY")}
                  </td>

                  <td className="px-9 py-3 text-end">
                    <div className="flex items-center justify-end space-x-2">
                      <OrderStatusChange id={item._id}/>
                    </div>
                  </td>
                  {/* order actions */}
                  <OrderActions id={item._id} />
                  {/* order actions */}
                </tr>
              ))}
          </tbody>
        </table>

        {/* pagination start */}
        <div className="flex justify-between items-center flex-wrap">
          <p className="mb-0 text-tiny">
             Showing 1- {currentItems.length} of {orders?.data.length}
          </p>
          <div className="pagination py-3 flex justify-end items-center sm:mx-8">
            <Pagination
              handlePageClick={handlePageClick}
              pageCount={pageCount}
            />
          </div>
        </div>
        {/* pagination end */}
      </>
    );
  }

  // handle change input 
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };
  // handle change input 
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectVal(e.target.value);
  };
  return (
    <>
      <div className="tp-search-box flex items-center justify-between px-8 py-8 flex-wrap">
        <div className="search-input relative">
          <input
            className="input h-[44px] w-full pl-14"
            type="text"
            placeholder="Search by invoice no"
            onChange={handleSearchChange}
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
            <select onChange={handleSelectChange}>
              <option value="">Status</option>
              <option value="delivered">Delivered</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="cancel">Cancel</option>
            </select>
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto mx-8">{content}</div>
    </>
  );
};

export default OrderTable;
