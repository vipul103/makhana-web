"use client";
import React from "react";
import useBrandSubmit from "@/hooks/useBrandSubmit";
import CategoryImgUpload from "../category/global-img-upload";
import ErrorMsg from "../common/error-msg";
import BrandTables from "./brand-table";
import { useGetBrandQuery } from "@/redux/brand/brandApi";
import Loading from "../common/loading";
import BrandFormField from "./form-field-two";
import BrandDesc from "./brand-desc";
import BrandStatus from "./brand-status";

const EditBrand = ({id}:{id:string}) => {
  const {
    errors,
    handleSubmit,
    register,
    setLogo,
    setStatus,
    handleSubmitEditBrand,
    isSubmitted,
    setIsSubmitted,
  } = useBrandSubmit();
  // get brand 
  const {data:brand,isLoading,isError,error} = useGetBrandQuery(id)

  // handle Change status
  const handleChange = (value: string | number | undefined) => {
    setStatus(value as string);
  };

  // decide to render
  let content = null;
  if(isLoading){
    content = <Loading loading={isLoading} spinner="bar" />
  }
  if(!brand && isError){
    content = <ErrorMsg msg="There was an error" />
  }
  if(brand && !isError){
    content = (
      <div className="col-span-12 lg:col-span-4">
        <form onSubmit={handleSubmit((data) => handleSubmitEditBrand(data, id))}>
          <div className="mb-6 bg-white px-8 py-8 rounded-md">
            {/* brand image upload */}
            <CategoryImgUpload
              isSubmitted={isSubmitted}
              setImage={setLogo}
              image={brand.logo ? brand.logo : ''}
              setIsSubmitted={setIsSubmitted}
              default_img={brand.logo}
            />
            {/* brand image upload */}

            {/* Form Field */}
            <BrandFormField default_val={brand.name} register={register} errors={errors} name="Name" isReq={true} />
            <BrandFormField default_val={brand.email} register={register} errors={errors} name="Email" isReq={true} />
            <BrandFormField default_val={brand.website} register={register} errors={errors} name="Website" isReq={false} />
            <BrandFormField default_val={brand.location} register={register} errors={errors} name="Location" isReq={false} />
            {/* Form Field */}

            {/* description start */}
            <BrandDesc register={register} default_val={brand.description}/>
            {/* description end */}

            {/* brand status start */}
            <BrandStatus handleChange={handleChange} default_value={brand.status} />
            {/* brand status end */}

            <button className="tp-btn px-7 py-2">Edit Brand</button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      {content}
      <div className="col-span-12 lg:col-span-8">
        {/* brand table start */}
        <BrandTables/>
        {/* brand table end */}
      </div>
    </div>
  );
};

export default EditBrand;
