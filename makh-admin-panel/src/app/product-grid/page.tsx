import React from "react";
import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import ProductGridArea from "../components/products/product-grid/product-grid-area";

const ProductGrid = () => {
 
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="Product" subtitle="Product Grid" />
        {/* breadcrumb end */}

        {/* ProductGridArea start */}
        <ProductGridArea/>
        {/* ProductGridArea end */}
      </div>
    </Wrapper>
  );
};

export default ProductGrid;
