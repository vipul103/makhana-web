"use client";
import React from "react";
import useProductSubmit from "@/hooks/useProductSubmit";
import ErrorMsg from "../../common/error-msg";
import FormField from "../form-field";
import DescriptionTextarea from "../add-product/description-textarea";
import { useGetProductQuery } from "@/redux/product/productApi";
import ProductTypeBrand from "../add-product/product-type-brand";
import ProductVariants from "../add-product/product-variants";
import ProductImgUpload from "../add-product/product-img-upload";
import Tags from "../add-product/tags";
import ProductCategory from "../../category/product-category";

const EditProductSubmit = ({ id }: { id: string }) => {
  const { data: product, isError, isLoading } = useGetProductQuery(id);
  const {
    handleSubmit,
    register,
    errors,
    tags,
    setTags,
    control,
    setCategory,
    setParent,
    setChildren,
    setImg,
    img,
    setBrand,
    isSubmitted,
    relatedImages,
    setRelatedImages,
    setColors,
    colors,
    handleEditProduct
  } = useProductSubmit();

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <h2>Loading....</h2>;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && product) {
    content = (
      <form onSubmit={handleSubmit((data) => handleEditProduct(data, id))}>
        <div className="grid grid-cols-12 gap-6 mb-6">
          {/* left side */}
          <div className="col-span-12 xl:col-span-8 2xl:col-span-9">
            <div className="mb-6 bg-white px-8 py-8 rounded-md">
              <h4 className="text-[22px]">General</h4>
              <FormField
                title="title"
                isRequired={true}
                placeHolder="Product Title"
                register={register}
                errors={errors}
                defaultValue={product.title}
              />
              <DescriptionTextarea
                register={register}
                errors={errors}
                defaultValue={product.description}
              />
            </div>

            <div className="bg-white px-8 py-8 rounded-md mb-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6">
                <FormField
                  title="price"
                  isRequired={true}
                  placeHolder="Product price"
                  bottomTitle="Set the base price of product."
                  type="number"
                  defaultValue={product.price}
                  register={register}
                  errors={errors}
                />
                <FormField
                  title="sku"
                  isRequired={true}
                  placeHolder="SKU"
                  bottomTitle="Enter the product SKU."
                  defaultValue={product.sku}
                  register={register}
                  errors={errors}
                />
                <FormField
                  title="quantity"
                  isRequired={true}
                  placeHolder="Quantity"
                  bottomTitle="Enter the product quantity."
                  type="number"
                  defaultValue={product.quantity}
                  register={register}
                  errors={errors}
                />
                <FormField
                  title="discount"
                  type="number"
                  isRequired={false}
                  placeHolder="Discount"
                  bottomTitle="Set the Discount Percentage."
                  defaultValue={product.discount}
                  register={register}
                  errors={errors}
                />
              </div>
            </div>


            {/* product type and brands start */}
            <ProductTypeBrand
              register={register}
              errors={errors}
              control={control}
              setSelectBrand={setBrand}
              default_value={{
                brand: product.brand.name,
                unit: product.unit,
              }}
            />
            {/* product type and brands end */}

            {/* product variations start */}
            <ProductVariants
              isSubmitted={isSubmitted}
              setImageURLs={setRelatedImages}
              relatedImages={relatedImages}
              default_value={product.relatedImages}
            />
            {/* product variations end */}
          </div>

          {/* right side */}
          <div className="col-span-12 xl:col-span-4 2xl:col-span-3">
            <ProductImgUpload
              imgUrl={img}
              setImgUrl={setImg}
              default_img={product.image}
              isSubmitted={isSubmitted}
            />

            <div className="bg-white px-8 py-8 rounded-md mb-6">
              <p className="mb-5 text-base text-black">Product Category</p>
              {/* category start */}
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 mb-5">
                <ProductCategory
                  setCategory={setCategory}
                  setParent={setParent}
                  setChildren={setChildren}
                  default_value={{
                    parent: product.category.name,
                    id: product.category.id,
                    children: product.children,
                  }}
                />
                <Tags
                  tags={tags}
                  setTags={setTags}
                  default_value={product.tags}
                />
              </div>
            </div>
          </div>
        </div>
        <button className="tp-btn px-5 py-2 mt-5" type="submit">
          Submit Product
        </button>
      </form>
    );
  }

  return <>{content}</>;
};

export default EditProductSubmit;
