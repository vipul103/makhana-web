import Link from "next/link";
import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useGetSingleOrderQuery } from "@/redux/order/orderApi";
import { Invoice, View } from "@/svg";
import { notifyError } from "@/utils/toast";
import InvoicePrint from "./invoice-print";

const OrderActions = ({ id,cls }: { id: string,cls?:string }) => {
  const [showInvoice, setShowInvoice] = useState<boolean>(false);
  const [showView, setShowView] = useState<boolean>(false);
  const printRefTwo = useRef<HTMLDivElement | null>(null);
  const { data: orderData, isLoading, isError } = useGetSingleOrderQuery(id);

  const handlePrint = useReactToPrint({
    content: () => printRefTwo?.current,
    documentTitle: "Receipt",
  });

  const handlePrintReceipt = async () => {
    try {
      handlePrint();
    } catch (err) {
      console.log("order by user id error", err);
      notifyError("Failed to print");
    }
    // console.log('id', id);
  };

  return (
    <>
      <td style={{ display: "none" }}>
        {orderData && (
          <div ref={printRefTwo}>
            <InvoicePrint orderData={orderData} />
          </div>
        )}
      </td>

      <td className={`${cls?cls:'px-9 py-3 text-end'}`}>
        <div className="flex items-center justify-end space-x-2">
          <div className="relative">
            <button
              onMouseEnter={() => setShowInvoice(true)}
              onMouseLeave={() => setShowInvoice(false)}
              onClick={handlePrintReceipt}
              className="w-auto px-3 h-10 leading-10 text-tiny bg-gray text-black rounded-md hover:bg-theme hover:text-white"
            >
              <Invoice />
            </button>
            <div
              className={`${
                showInvoice ? "flex" : "hidden"
              } flex-col items-center z-50 absolute left-1/2 -translate-x-1/2 bottom-full mb-1`}
            >
              <span className="relative z-10 p-2 text-tiny leading-none font-medium text-white whitespace-no-wrap w-max bg-slate-800 rounded py-1 px-2 inline-block">
                Print
              </span>
              <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
            </div>
          </div>
          <div className="relative">
            <Link
              onMouseEnter={() => setShowView(true)}
              onMouseLeave={() => setShowView(false)}
              href={`/orders/${id}`}
              className="inline-block w-auto px-3 h-10 leading-10 text-tiny bg-gray text-black rounded-md hover:bg-theme hover:text-white"
            >
              <View />
            </Link>
            <div
              className={`${
                showView ? "flex" : "hidden"
              } flex-col items-center z-50 absolute left-1/2 -translate-x-1/2 bottom-full mb-1`}
            >
              <span className="relative z-10 p-2 text-tiny leading-none font-medium text-white whitespace-no-wrap w-max bg-slate-800 rounded py-1 px-2 inline-block">
                View
              </span>
              <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
            </div>
          </div>
        </div>
      </td>
    </>
  );
};

export default OrderActions;
