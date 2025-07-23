import React from "react";
import { Order } from "@/types/order-amount-type";
import dayjs from "dayjs";

// prop type
type IPropType = {
  orderData: Order;
};

const InvoicePrint = ({ orderData }: IPropType) => {
  const total = orderData.cart.reduce((acc, curr) => acc + curr.price, 0);
  const grand_total = total + orderData.shippingCost;
  return (
    <>
      {/* top bar start */}
      <div className="flex items-center justify-center flex-wrap px-8 mb-6 bg-white border-b border-slate-200 py-6 text-center">
        <div className="relative">
          <h3 className="font-normal mb-0">ThemePure</h3>
          <p className="mb-0 text-tiny">Dhaka, Bangladesh</p>
          <p className="mb-0 text-tiny">0123456789</p>
        </div>
      </div>
      {/* top bar end */}

      {/* details table */}
      <div className="grid grid-cols-12 gap-6 px-6">
        <div className="col-span-12">
          <div className="bg-white border border-slate-200 py-8 mb-4">
            <div className="relative overflow-x-auto  mx-8">
              <table className="w-[500px] md:w-full text-base text-left text-gray-500">
                <thead className="bg-white">
                  <tr className="border-b border-gray6 text-tiny">
                    <th
                      scope="col"
                      className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end"
                    >
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orderData.cart.map((p) => (
                    <tr
                      key={p._id}
                      className="bg-white border-b border-gray6 last:border-0 text-start mx-9"
                    >
                      <td className="pr-8 py-5 whitespace-nowrap">
                        <a href="#" className="flex items-center space-x-5">
                          <span className="font-medium text-heading text-hover-primary transition">
                            {p.title}
                          </span>
                        </a>
                      </td>
                      <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                        {p.orderQuantity}
                      </td>
                      <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                        ₹{(p.orderQuantity * p.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white border border-slate-200 py-4 px-4">
            <h5 className="text-center mb-0">Order Price</h5>
            <div className="relative overflow-x-auto mx-4">
              <table className="w-full text-base text-left text-gray-500">
                <tbody>
                  <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                    <td className="pr-3 py-3 pt-6 font-normal text-[#55585B] text-start">
                      Subtotal
                    </td>
                    <td className="px-3 py-3 pt-6 font-normal text-[#55585B] text-end">
                      ₹{total.toFixed(2)}
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                    <td className="pr-3 py-3 font-normal text-[#55585B] text-start">
                      Shipping cost:
                    </td>
                    <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                      ₹{orderData.shippingCost.toFixed(2)}
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                    <td className="pr-3 py-3 font-normal text-[#55585B] text-start">
                      Grand total:
                    </td>
                    <td className="px-3 py-3 text-[#55585B] text-end text-lg font-semibold">
                      ₹{grand_total.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* details table */}
      
      {/* details table */}
      <div className="grid grid-cols-12 gap-6 px-6 py-6">
        <div className="col-span-12">
          <div className="bg-white border border-slate-200 px-4">
            <div className="relative overflow-x-auto mx-4">
              <table className="w-full text-base text-left text-gray-500">
                <tbody>
                  <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                    <td className="pr-3 py-3 pt-6 font-normal text-[#55585B] text-start">
                      Payment Method
                    </td>
                    <td className="px-3 py-3 pt-6 font-normal text-[#55585B] text-end">
                      {orderData.paymentMethod}
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                    <td className="pr-3 py-3 font-normal text-[#55585B] text-start">
                      Bill No:
                    </td>
                    <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                      #{orderData.invoice}
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                    <td className="pr-3 py-3 font-normal text-[#55585B] text-start">
                      No of items:
                    </td>
                    <td className="px-3 py-3 text-[#55585B] text-end text-lg font-semibold">
                      {orderData.cart.length}
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                    <td className="pr-3 py-3 font-normal text-[#55585B] text-start">
                      Date:
                    </td>
                    <td className="px-3 py-3 text-[#55585B] text-end text-lg font-semibold">
                      {dayjs(orderData.createdAt).format('DD/MM/YYYY')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* details table */}

      <div className="flex items-center justify-center flex-wrap px-8 mb-6 bg-white rounded-t-md rounded-b-md  py-6 text-center">
          <h3 className="font-normal mb-0">Thank you for your order. Come again!</h3>
      </div>
    </>
  );
};

export default InvoicePrint;
