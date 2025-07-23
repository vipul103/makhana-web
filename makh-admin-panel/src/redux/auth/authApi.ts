import Cookies from "js-cookie";
import { apiSlice } from "@/redux/api/apiSlice";
import { userLoggedIn } from "./authSlice";
import { IAddStuff, IAdminGetRes, IAdminLoginAdd, IAdminLoginRes, IAdminRegisterAdd, IAdminRegisterRes, IAdminUpdate, IAdminUpdateRes, IStuff } from "@/types/admin-type";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // registerAdmin
    registerAdmin: builder.mutation<IAdminRegisterRes, IAdminRegisterAdd>({
      query: (data) => ({
        url: "api/admin/register",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const { token, ...others } = result.data;
          Cookies.set(
            "admin",
            JSON.stringify({
              accessToken: token,
              user: others
            }),
            { expires: 0.5 }
          );

          dispatch(
            userLoggedIn({
              accessToken: token,
              user: others
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    // login
    loginAdmin: builder.mutation<IAdminLoginRes, IAdminLoginAdd>({
      query: (data) => ({
        url: "api/admin/login",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const { token, ...others } = result.data;
          Cookies.set(
            "admin",
            JSON.stringify({
              accessToken: token,
              user: others
            }),
            { expires: 0.5 }
          );

          dispatch(
            userLoggedIn({
              accessToken: token,
              user: others
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    // reset password
    forgetPassword: builder.mutation<{message:string},{email:string}>({
      query: (data) => ({
        url: "api/admin/forget-password",
        method: "PATCH",
        body: data,
      }),
    }),
    // confirmForgotPassword
    adminConfirmForgotPassword: builder.mutation<{message:string},{token:string,password:string}>({
      query: (data) => ({
        url: "api/admin/confirm-forget-password",
        method: "PATCH",
        body: data,
      }),
    }),
    // change password
    adminChangePassword: builder.mutation<{ message: string }, { email: string; oldPass: string; newPass: string }>({
      query: (data) => ({
        url: "api/admin/change-password",
        method: "PATCH",
        body: data,
      }),
    }),
    // updateProfile password
    updateProfile: builder.mutation<IAdminUpdateRes, { id: string, data: IAdminUpdate }>({
      query: ({ id, ...data }) => ({
        url: `/api/admin/update-stuff/${id}`,
        method: "PATCH",
        body: data.data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const { token, ...others } = result.data;
          Cookies.set(
            "admin",
            JSON.stringify({
              accessToken: token,
              user: others
            }),
            { expires: 0.5 }
          );

          dispatch(
            userLoggedIn({
              accessToken: token,
              user: others
            })
          );
        } catch (err) {
          // do nothing
        }
      },
      invalidatesTags:["AllStaff"]
    }),
    addStaff: builder.mutation<{ message: string }, IAddStuff>({
      query: (data) => ({
        url: "api/admin/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AllStaff"]
    }),
    // get all categories
    getAllStaff: builder.query<IAdminGetRes, void>({
      query: () => `/api/admin/all`,
      providesTags: ["AllStaff"],
      keepUnusedDataFor: 600,
    }),
    // delete category
    deleteStaff: builder.mutation<{ message: string }, string>({
      query(id: string) {
        return {
          url: `/api/admin/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AllStaff"],
    }),
    // get single product
    getStuff: builder.query<IStuff, string>({
      query: (id) => `/api/admin/get/${id}`,
      providesTags: ['Stuff']
    }),
  }),
});

export const {
  useLoginAdminMutation,
  useRegisterAdminMutation,
  useForgetPasswordMutation,
  useAdminConfirmForgotPasswordMutation,
  useAdminChangePasswordMutation,
  useUpdateProfileMutation,
  useGetAllStaffQuery,
  useAddStaffMutation,
  useDeleteStaffMutation,
  useGetStuffQuery,
} = authApi;
