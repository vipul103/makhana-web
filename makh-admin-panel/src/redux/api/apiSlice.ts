import Cookies from "js-cookie";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async (headers, { getState, endpoint }) => {
      try {
        const userInfo = Cookies.get("admin");
        if (userInfo) {
          const user = JSON.parse(userInfo); 
          if (user?.accessToken) {
            headers.set("Authorization", `Bearer ${user.accessToken}`);
          }
        }
      } catch (error) {
        console.error("Error parsing user info:", error);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({}),
  tagTypes: [
    "DashboardAmount",
    "DashboardSalesReport",
    "DashboardMostSellingCategory",
    "DashboardRecentOrders",
    "AllProducts",
    "StockOutProducts",
    "AllCategory",
    "AllBrands",
    "getCategory",
    "AllOrders",
    "getBrand",
    "ReviewProducts",
    "AllCoupons",
    "Coupon",
    "AllStaff",
    "Stuff",
    "SingleProduct",
  ],
});
