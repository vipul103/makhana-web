"use client";
import React, { useState } from "react";
import { useGetAllProductsQuery } from "@/redux/product/productApi";
import ErrorMsg from "../../common/error-msg";
import ProductGridItem from "./product-grid-item";
import Pagination from "../../ui/Pagination";
import { Search } from "@/svg";
import Link from "next/link";
import usePagination from "@/hooks/use-pagination";

const ProductGridArea = () => {
  const { data: products, isError, isLoading } = useGetAllProductsQuery();
  const paginationData = usePagination(products?.data || [], 10);
  const { currentItems, handlePageClick, pageCount } = paginationData;
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectValue, setSelectValue] = useState<string>("");

  // search field
  const handleSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // handle select input
  const handleSelectField = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
  };

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <h2>Loading....</h2>;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && isError && products?.data.length === 0) {
    content = <ErrorMsg msg="No Products Found" />;
  }

  if (!isLoading && !isError && products?.success) {
    let productItems = [...currentItems].reverse();

    // search field
    if (searchValue) {
      productItems = productItems.filter((p) =>
        p.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    }


    content = (
      <>
        <div className="relative mx-8 mb-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 ">
            {productItems.map((prd) => (
              <ProductGridItem key={prd._id} product={prd} />
            ))}
          </div>
        </div>

        {/* bottom  */}
        <div className="flex justify-between items-center flex-wrap mx-8">
          <p className="mb-0 text-tiny">
            Showing {currentItems.length} of{" "}
            {products?.data.length}
          </p>
          <div className="pagination py-3 flex justify-end items-center mx-8">
            <Pagination
              handlePageClick={handlePageClick}
              pageCount={pageCount}
            />
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="bg-white rounded-t-md rounded-b-md shadow-xs py-4">
      <div className="tp-search-box flex items-center justify-between px-8 py-8 flex-wrap">
        <div className="search-input relative">
          <input
            onChange={handleSearchProduct}
            className="input h-[44px] w-full pl-14"
            type="text"
            placeholder="Search by product name"
          />
          <button className="absolute top-1/2 left-5 translate-y-[-50%] hover:text-theme">
            <Search />
          </button>
        </div>
        <div className="flex sm:justify-end sm:space-x-6 flex-wrap">
          <div className="product-add-btn flex ">
            <Link href="/add-product" className="tp-btn">
              Add Product
            </Link>
          </div>
        </div>
      </div>
      {content}
    </div>
  );
};

export default ProductGridArea;
