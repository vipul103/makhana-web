import React from "react";
import Image from "next/image";
// internal
import { IProduct } from "@/types/product-type";
import ProductGridAction from "./product-grid-action";

const ProductGridItem = ({ product }: { product: IProduct }) => {
  const { _id,image,originalPrice,title } = product || {};
  return (
    <div className="rounded-md bg-white border-gray6 border">
      <div className="relative">
        <a href="#" className="inline-block bg-[#F2F3F5]">
          <Image
            className="w-full"
            src={image}
            width={279}
            height={297}
            alt="product img"
          />
        </a>
        <div className="absolute top-5 right-5 z-10">
          <ProductGridAction id={_id}/>
        </div>
      </div>
      <div className="px-5 py-5">
        <a
          href="#"
          className="text-lg font-normal text-heading text-hover-primary mb-2 inline-block leading-none"
        >
          {title}
        </a>
        <div className="leading-none mb-2">
          <span className="text-base font-medium text-black">
            ${originalPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductGridItem;
