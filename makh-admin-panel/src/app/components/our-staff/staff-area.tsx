"use client";
import React from "react";
import StaffTables from "./staff-table";
import useStaffSubmit from "@/hooks/useStaffSubmit";
import GlobalImgUpload from "../category/global-img-upload";
import FormFieldTwo from "../brand/form-field-two";
import AdminRole from "../profile/admin-role";

const AddStaffArea = () => {
  const { setStaffImg, isSubmitted, errors, register,setRole,handleSubmit,handleSubmitStuff } = useStaffSubmit();
  const handleChange = (value: string | number | undefined) => {
    setRole(value as string)
  };
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-4">
        <form onSubmit={handleSubmit(handleSubmitStuff)}>
          <div className="mb-6 bg-white px-8 py-8 rounded-md">
            {/* category image upload */}
            <GlobalImgUpload isSubmitted={isSubmitted} setImage={setStaffImg} />
            {/* category image upload */}

            <FormFieldTwo
              register={register}
              errors={errors}
              name="Name"
              isReq={true}
            />
            <FormFieldTwo
              register={register}
              errors={errors}
              name="email"
              isReq={true}
              type="email"
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
            />
            <FormFieldTwo
              register={register}
              errors={errors}
              name="JoiningDate"
              isReq={true}
              type="date"
            />

            {/* admin role */}
            <div className="mb-6">
              <p className="mb-0 text-base text-black">Admin role</p>
              <div className="category-add-select select-bordered">
                <AdminRole handleChange={handleChange}/>
              </div>
            </div>
            {/* Product Type */}

            <button type="submit" className="tp-btn px-7 py-2">Add Stuff</button>
          </div>
        </form>
      </div>
      <div className="col-span-12 lg:col-span-8">
        <StaffTables />
      </div>
    </div>
  );
};

export default AddStaffArea;
