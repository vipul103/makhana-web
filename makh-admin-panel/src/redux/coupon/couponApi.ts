import { IAddCoupon } from "./../../types/coupon";
import { ICoupon } from "@/types/coupon";
import { apiSlice } from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // add coupon
    addCoupon: builder.mutation<{ message: string }, IAddCoupon>({
      query(data: IAddCoupon) {
        return {
          url: `/api/coupon/add`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["AllCoupons"],
    }),
    // getUserOrders
    getAllCoupons: builder.query<ICoupon[], void>({
      query: () => `/api/coupon`,
      providesTags: ["AllCoupons"],
      keepUnusedDataFor: 600,
    }),
    // get single coupon
    getCoupon: builder.query<ICoupon, string>({
      query: (id) => `/api/coupon/${id}`,
      providesTags: ['Coupon']
    }),
    // edit coupon
    editCoupon: builder.mutation<{message:string}, { id: string; data: Partial<IAddCoupon> }>({
      query({ id, data }) {
        return {
          url: `/api/coupon/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["AllCoupons", "Coupon"],
    }),
    // delete coupon
    deleteCoupon: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query(id: string) {
        return {
          url: `/api/coupon/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AllCoupons"],
    }),
  }),
});

export const {
  useGetAllCouponsQuery,
  useDeleteCouponMutation,
  useAddCouponMutation,
  useGetCouponQuery,
  useEditCouponMutation,
} = authApi;
