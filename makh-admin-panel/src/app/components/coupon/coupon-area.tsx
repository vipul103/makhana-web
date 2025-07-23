"use client";
import React, { useState } from "react";
import { Search } from "@/svg";
import CouponTable from "./coupon-table";
import CouponOffcanvas from "./coupon-offcanvas";
import useCouponSubmit from "@/hooks/useCouponSubmit";

const CouponArea = () => {
  const {
    handleCouponSubmit,
    errors,
    handleSubmit,
    isSubmitted,
    logo,
    openSidebar,
    register,
    setIsSubmitted,
    setLogo,
    setOpenSidebar,
    control,
    setSelectProductType,
  } = useCouponSubmit();
  const [searchValue,setSearchValue] = useState<string>("");
  // handle search value
  const handleSearchValue = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }
  return (
    <>
      <div className="bg-white rounded-t-md rounded-b-md shadow-xs py-4">
        <div className="overflow-scroll 2xl:overflow-visible">
          <div className="w-[1500px] xl:w-full">
            <div className="tp-search-box flex items-center justify-between px-8 py-8">
              <div className="search-input relative">
                <input
                  className="input h-[44px] w-full pl-14"
                  type="text"
                  placeholder="Search by coupon name"
                  onChange={handleSearchValue}
                />
                <button className="absolute top-1/2 left-5 translate-y-[-50%] hover:text-theme">
                  <Search />
                </button>
              </div>
              <div className="flex justify-end space-x-6">
                <div className="product-add-btn flex ">
                  <button
                    onClick={() => setOpenSidebar(true)}
                    type="button"
                    className="tp-btn offcanvas-open-btn"
                  >
                    Add Coupon
                  </button>
                </div>
              </div>
            </div>
            <CouponTable
              setOpenSidebar={setOpenSidebar}
              searchValue={searchValue}
            />
          </div>
        </div>
      </div>

      {/* coupon offcanvas start */}
      <CouponOffcanvas
        propsItems={{
          openSidebar,
          setOpenSidebar,
          setLogo,
          logo,
          handleCouponSubmit,
          handleSubmit,
          register,
          errors,
          isSubmitted,
          setIsSubmitted,
          control,
          setSelectProductType,
        }}
      />
      {/* coupon offcanvas end */}
    </>
  );
};

export default CouponArea;
