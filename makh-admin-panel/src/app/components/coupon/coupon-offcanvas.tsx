import React from "react";
import { CloseTwo } from "@/svg";
import GlobalImgUpload from "../category/global-img-upload";
import {
  Control,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import CouponFormField from "../brand/form-field-two";
import ProductType from "../products/add-product/product-type";
import { useGetAllCategoriesQuery } from "@/redux/category/categoryApi";
import ErrorMsg from "../common/error-msg";

// prop type
type IPropType = {
  propsItems: {
    openSidebar: boolean;
    setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
    setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectProductType: React.Dispatch<React.SetStateAction<string>>;
    setLogo: React.Dispatch<React.SetStateAction<string>>;
    handleCouponSubmit: (data: any) => void;
    isSubmitted: boolean;
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
    logo: string;
    handleSubmit: UseFormHandleSubmit<any, undefined>;
    control: Control;
  };
};

const CouponOffcanvas = ({ propsItems }: IPropType) => {
  const {
    openSidebar,
    setOpenSidebar,
    isSubmitted,
    setIsSubmitted,
    setLogo,
    errors,
    handleCouponSubmit,
    handleSubmit,
    logo,
    register,
    control,
    setSelectProductType,
  } = propsItems;

  const { data: categories, isLoading, isError } = useGetAllCategoriesQuery();
  let content = null;
  if (isLoading) {
    content = <h4>Loading...</h4>;
  }
  if (isError) {
    content = <ErrorMsg msg="Failed to load product type" />;
  }
  if (!isError && !isLoading && categories) {
    content = (
      <ProductType
        setSelectProductType={setSelectProductType}
        control={control}
        errors={errors}
        options={categories.result.map((item) => {
          return { value: item.parent, label: item.parent };
        })}
      />
    );
  }
  return (
    <>
      <div
        className={`offcanvas-area fixed top-0 right-0 h-full bg-white w-[280px] sm:w-[400px] z-[999] overflow-y-scroll overscroll-y-contain scrollbar-hide shadow-md translate-x-[calc(100%+80px)]  transition duration-300 ${
          openSidebar ? "offcanvas-opened" : ""
        }`}
      >
        <div className="flex flex-col justify-between h-full">
          {/* main wrap */}
          <form onSubmit={handleSubmit((data) => handleCouponSubmit(data))}>
            <div className="flex items-center space-x-3 py-3 px-8 shadow-md sticky top-0 left-0 right-0 w-full z-[99] bg-white">
              <button
                onClick={() => setOpenSidebar(false)}
                className="text-black offcanvas-close-btn"
              >
                <CloseTwo />
              </button>
              <p className="mb-0 text-[15px] font-medium text-[#82808a]">
                Enter Coupon Details
              </p>
            </div>
            {/* <!-- main content --> */}
            <div className="px-8 pt-6">
              <div className="">
                {/* coupon image upload */}
                <div className="bg-white">
                  <GlobalImgUpload
                    isSubmitted={isSubmitted}
                    setImage={setLogo}
                    image={logo}
                    setIsSubmitted={setIsSubmitted}
                  />
                </div>
                {/* coupon image upload */}
                <CouponFormField
                  register={register}
                  errors={errors}
                  name="Name"
                  isReq={true}
                />
                {/* Product Type */}
                <div className="mb-6">
                  <p className="mb-0 text-base text-black">Product Type</p>
                  <div className="category-add-select select-bordered">
                    {content}
                  </div>
                </div>
                {/* Product Type */}
                <CouponFormField
                  register={register}
                  errors={errors}
                  name="Code"
                  isReq={true}
                />
                <CouponFormField
                  register={register}
                  errors={errors}
                  name="endTime"
                  isReq={true}
                  type="date"
                />
                <CouponFormField
                  register={register}
                  errors={errors}
                  name="discountPercentage"
                  isReq={true}
                />
                <CouponFormField
                  register={register}
                  errors={errors}
                  name="minimumAmount"
                  isReq={true}
                />
              </div>
            </div>
            <div className="sm:flex items-center sm:space-x-3 py-6 px-8 sticky bottom-0 left-0 right-0 w-full z-[99] bg-white shadow-_md mt-8 flex-wrap sm:flex-nowrap">
              <button
                type="submit"
                className="tp-btn w-full sm:w-1/2 items-center justify-around mb-2 sm:mb-0"
              >
                Add Coupon
              </button>
              <button
                type="button"
                onClick={() => setOpenSidebar(false)}
                className="tp-btn w-full sm:w-1/2 items-center justify-around border border-gray6 bg-white text-black hover:text-white hover:border-danger hover:bg-danger"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        onClick={() => setOpenSidebar(false)}
        className={`body-overlay fixed bg-black top-0 left-0 w-full h-full z-[60] invisible opacity-0 transition-all duration-300 ${openSidebar ? "opened" : ""}`}
      ></div>
    </>
  );
};

export default CouponOffcanvas;
