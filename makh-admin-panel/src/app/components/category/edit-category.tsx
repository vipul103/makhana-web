"use client";
import React from "react";
import useCategorySubmit from "@/hooks/useCategorySubmit";
import ProductType from "../products/add-product/product-type";
import CategoryTables from "./category-tables";
import CategoryImgUpload from "./global-img-upload";
import CategoryChildren from "./category-children";
import ErrorMsg from "../common/error-msg";
import { useGetCategoryQuery } from "@/redux/category/categoryApi";
import CategoryParent from "./category-parent";
import CategoryDescription from "./category-description";

const  EditCategory = ({ id }: { id: string }) => {
  const { data: categoryData, isError, isLoading } = useGetCategoryQuery(id);
  const {
    errors,
    control,
    categoryChildren,
    setCategoryChildren,
    register,
    handleSubmit,
    setCategoryImg,
    categoryImg,
    error,
    isSubmitted,
    handleSubmitEditCategory,
  } = useCategorySubmit();
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-4">
        {categoryData && (
          <form
            onSubmit={handleSubmit((data) =>
              handleSubmitEditCategory(data, id)
            )}
          >
            <div className="mb-6 bg-white px-8 py-8 rounded-md">
              {/* category image upload */}
              <CategoryImgUpload
                isSubmitted={isSubmitted}
                setImage={setCategoryImg}
                default_img={categoryData?.img}
                image={categoryImg}
              />
              {/* category image upload */}

              {/* category parent */}
              <CategoryParent
                register={register}
                errors={errors}
                default_value={categoryData.parent}
              />
              {/* category parent */}

              <CategoryChildren
                categoryChildren={categoryChildren}
                setCategoryChildren={setCategoryChildren}
                error={error}
                default_value={categoryData.children}
              />

              {/* Category Description */}
              <CategoryDescription
                register={register}
                default_value={categoryData?.description}
              />
              {/* Category Description */}

              <button className="tp-btn px-7 py-2">Edit Category</button>
            </div>
          </form>
        )}
      </div>
      <div className="col-span-12 lg:col-span-8">
        <CategoryTables />
      </div>
    </div>
  );
};

export default EditCategory;
