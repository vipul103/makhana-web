import React from "react";
import dayjs from "dayjs";
import { IOrder } from "@/types/order-amount-type";
import OrderActions from "../orders/order-actions";
import OrderStatusChange from "../orders/status-change";

const TableItem = (props: { order: IOrder }) => {
  const { order } = props;
  console.log('order',order)
  console.log(order.createdAt)
  const p_method =
    order.paymentMethod === "COD"
      ? "Cash"
      : order.paymentMethod === "Card"
      ? "Card"
      : order.paymentMethod;
  return (
    <tr className="bg-white border-b border-gray6 last:border-0 text-start">
      <td className="px-3 py-3">#{order.invoice}</td>
      <td className="px-3 py-3">
        {dayjs(order.createdAt).format("MMMM D, YYYY h:mm A")}
      </td>
      <td className="px-3 py-3">{order.name}</td>
      <td className="px-3 py-3">${order.totalAmount}</td>
      <td className="px-3 py-3">
        <span
          className={`text-[11px] px-3 py-1 rounded-md leading-none ${
            order.status === "pending"
              ? "text-warning bg-warning/10"
              : order.status === "delivered"
              ? "text-success bg-success/10"
              : order.status === "processing"
              ? "text-indigo-500 bg-indigo-100"
              : order.status === "cancel"
              ? "text-danger bg-danger/10"
              : ""
          }  font-medium`}
        >
          {order.status}
        </span>
      </td>
      <td className="px-3 py-3">
        <OrderStatusChange id={order._id} />
      </td>
      {/* order actions */}
      <OrderActions id={order._id} cls="px-3 py-3" />
      {/* order actions */}
    </tr>
  );
};

export default TableItem;
