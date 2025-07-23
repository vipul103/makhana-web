import { apiSlice } from "../api/apiSlice";
import { ICloudinaryDeleteResponse, ICloudinaryMultiplePostRes, ICloudinaryPostResponse } from "./type";


export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    uploadImage: builder.mutation<ICloudinaryPostResponse, FormData>({
      query: (data) => ({
        url: "/api/cloudinary/add-img",
        method: "POST",
        body: data,
      }),
    }),
    uploadImageMultiple: builder.mutation<ICloudinaryMultiplePostRes, FormData>({
      query: (data) => ({
        url: "/api/cloudinary/add-multiple-img",
        method: "POST",
        body: data,
      }),
    }),
    deleteCloudinaryImg: builder.mutation<
      ICloudinaryDeleteResponse,
      { folder_name: string; id: string }
    >({
      query({ folder_name, id }) {
        return {
          url: `/api/cloudinary/img-delete?folder_name=${folder_name}&id=${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useDeleteCloudinaryImgMutation,
  useUploadImageMutation,
  useUploadImageMultipleMutation,
} = authApi;
