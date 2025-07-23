import React from "react";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import Wrapper from "@/layout/wrapper";
import ProductListArea from "../components/products/product-lists/product-list-area";

const ProductList = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="Product" subtitle="Product List" />
        {/* breadcrumb end */}

        {/* ProductListArea start */}
        <ProductListArea />
        {/* ProductListArea end */}
      </div>
    </Wrapper>
  );
};

export default ProductList;
