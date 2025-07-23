"use client";
import React from "react";
import useCategorySubmit from "@/hooks/useCategorySubmit";
import ProductType from "../products/add-product/product-type";
import CategoryTables from "./category-tables";
import CategoryImgUpload from "./global-img-upload";
import CategoryChildren from "./category-children";
import CategoryParent from "./category-parent";
import CategoryDescription from "./category-description";

const AddCategory = () => {
  const {
    errors,
    control,
    categoryChildren,
    setCategoryChildren,
    register,
    handleSubmit,
    handleSubmitCategory,
    setCategoryImg,
    categoryImg,
    error,
    isSubmitted,
  } = useCategorySubmit();
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-4">
        <form onSubmit={handleSubmit(handleSubmitCategory)}>
          <div className="mb-6 bg-white px-8 py-8 rounded-md">
            {/* category image upload */}
            <CategoryImgUpload
              isSubmitted={isSubmitted}
              setImage={setCategoryImg}
              image={categoryImg}
            />
            {/* category image upload */}

            {/* category parent */}
            <CategoryParent register={register} errors={errors} />
            {/* category parent */}

            <CategoryChildren
              categoryChildren={categoryChildren}
              setCategoryChildren={setCategoryChildren}
              error={error}
            />

            {/* Category Description */}
            <CategoryDescription register={register} />
            {/* Category Description */}

            <button className="tp-btn px-7 py-2">Add Category</button>
          </div>
        </form>
      </div>
      <div className="col-span-12 lg:col-span-8">
        <CategoryTables />
      </div>
    </div>
  );
};

export default AddCategory;
