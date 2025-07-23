"use client";
import React from "react";
import StaffTables from "./staff-table";
import useStaffSubmit from "@/hooks/useStaffSubmit";
import GlobalImgUpload from "../category/global-img-upload";
import FormFieldTwo from "../brand/form-field-two";
import AdminRole from "../profile/admin-role";
import { useGetStuffQuery } from "@/redux/auth/authApi";
import Loading from "../common/loading";
import ErrorMsg from "../common/error-msg";

const EditStaffArea = ({ id }: { id: string }) => {
  const { data: stuffData, isError, isLoading } = useGetStuffQuery(id);
  const {
    setStaffImg,
    isSubmitted,
    errors,
    register,
    setRole,
    handleSubmit,
    handleSubmitEditStuff,
  } = useStaffSubmit();
  const handleChange = (value: string | number | undefined) => {
    setRole(value as string);
  };
  // decide to render
  let content = null;
  if (isLoading) {
    content = <Loading loading={isLoading} spinner="bar" />;
  }
  if (!stuffData && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (stuffData && !isError) {
    content = (
      <div className="col-span-12 lg:col-span-4">
        <form
          onSubmit={handleSubmit((data) => handleSubmitEditStuff(data, id))}
        >
          <div className="mb-6 bg-white px-8 py-8 rounded-md">
            {/* category image upload */}
            <GlobalImgUpload
              isSubmitted={isSubmitted}
              setImage={setStaffImg}
              default_img={stuffData.image}
            />
            {/* category image upload */}

            <FormFieldTwo
              register={register}
              errors={errors}
              name="Name"
              isReq={true}
              default_val={stuffData.name}
            />
            <FormFieldTwo
              register={register}
              errors={errors}
              name="email"
              isReq={true}
              type="email"
              default_val={stuffData.email}
            />
            <FormFieldTwo
              register={register}
              errors={errors}
              name="password"
              isReq={false}
              type="password"
            />
            <FormFieldTwo
              register={register}
              errors={errors}
              name="Phone"
              isReq={false}
              default_val={stuffData.phone}
            />
            <FormFieldTwo
              register={register}
              errors={errors}
              name="JoiningDate"
              isReq={true}
              type="date"
              default_val={stuffData.joiningDate}
            />

            {/* admin role */}
            <div className="mb-6">
              <p className="mb-0 text-base text-black">Admin role</p>
              <div className="category-add-select select-bordered">
                <AdminRole
                  handleChange={handleChange}
                  default_value={stuffData.role}
                  setRole={setRole}
                />
              </div>
            </div>
            {/* Product Type */}

            <button type="submit" className="tp-btn px-7 py-2">
              Edit Stuff
            </button>
          </div>
        </form>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-12 gap-6">
      {content}
      <div className="col-span-12 lg:col-span-8">
        <StaffTables />
      </div>
    </div>
  );
};

export default EditStaffArea;
