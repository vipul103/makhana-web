import { Order } from '@/types/order-amount-type';
import dayjs from 'dayjs';
import Image from 'next/image';
import React from 'react';

// prop type 
type IPropType = {
    orderData:Order;
}
const OrderDetailsTable = ({orderData}:IPropType) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-t-md rounded-b-md shadow-xs px-8 py-8">
              <h5>Customer Details</h5>
              <div className="relative overflow-x-auto ">
                  <table className="w-[400px] sm:w-full text-base text-left text-gray-500">
                      <tbody>
                          <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                              <td className="py-3 font-normal text-[#55585B] w-[50%]">
                                  Name
                              </td>
                              <td  className="py-3 whitespace-nowrap ">
                                  <a href="#" className="flex items-center justify-end space-x-5 text-end text-heading text-hover-primary">
                                      {orderData?.user?.imageURL && <Image className="w-10 h-10 rounded-full" src={orderData?.user?.imageURL} alt="user-img"/>}
                                      <span className="font-medium">{orderData?.user?.name}</span>
                                  </a>
                              </td>                                            
                          </tr>                                                           
                          <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                              <td className="py-3 font-normal text-[#55585B] w-[50%]">
                                  Email
                              </td>
                              <td  className="py-3 text-end">
                                  <a href="mailto:support@mail.com">{orderData?.user?.email}</a>
                              </td>                                            
                          </tr>                                                           
                          <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                              <td className="py-3 font-normal text-[#55585B] w-[50%]">
                                  Phone
                              </td>
                              <td  className="py-3 text-end">
                                  <a href="tel:9458785014">{orderData?.contact}</a>
                              </td>                                            
                          </tr>                                                           
                      </tbody>
                  </table>
              </div>
          </div>
          <div className="bg-white rounded-t-md rounded-b-md shadow-xs px-8 py-8">
              <h5>Order Summary</h5>

              <div className="relative overflow-x-auto ">
                  <table className="w-[400px] sm:w-full text-base text-left text-gray-500">
                      <tbody>
                          <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                              <td className="py-3 font-normal text-[#55585B] w-[50%]">
                                  Order Date
                              </td>
                              <td  className="py-3 whitespace-nowrap text-end">
                                  {dayjs(orderData.createdAt).format('MM/DD/YYYY')}
                              </td>                                            
                          </tr>                                                           
                          <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                              <td className="py-3 font-normal text-[#55585B] w-[50%]">
                                  Shipping cost 
                              </td>
                              <td  className="py-3 text-end">
                                  {orderData?.shippingCost}
                              </td>                                            
                          </tr>                                                           
                          <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                              <td className="py-3 font-normal text-[#55585B] w-[50%]">
                                  Shipping Method
                              </td>
                              <td  className="py-3 text-end">
                                  {orderData?.paymentMethod === 'COD' ? 'Cash On Delivery' : orderData.paymentMethod === 'Card' ? 'Card' : ''}
                              </td>                                            
                          </tr>                                                           
                      </tbody>
                  </table>
              </div>
          </div>
          <div className="bg-white rounded-t-md rounded-b-md shadow-xs px-8 py-8">
              <h5>Deliver To</h5>

              <div className="relative overflow-x-auto ">
                  <table className="w-[400px] sm:w-full text-base text-left text-gray-500">
                      <tbody>
                          <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                              <td className="py-3 font-normal text-[#55585B] w-[40%]">
                                  Country
                              </td>
                              <td  className="py-3 text-end">
                                  {orderData.country}
                              </td>                                            
                          </tr>
                          <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                              <td className="py-3 font-normal text-[#55585B] w-[40%]">
                                  Address
                              </td>
                              <td  className="py-3 whitespace-nowrap text-end">
                                 {orderData.address}
                              </td>                                            
                          </tr>                                                           
                          <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                              <td className="py-3 font-normal text-[#55585B] w-[40%]">
                                  City
                              </td>
                              <td  className="py-3 text-end">
                                  {orderData.city}
                              </td>                                            
                          </tr>                                                           
                                                                                      
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
    </>
  );
};

export default OrderDetailsTable;