import Image from "next/image";
import React, { useState } from "react";
import { IProduct } from "@/types/product-type";
import EditDeleteBtn from "../../button/edit-delete-btn";

const ProductTableItem = ({ product }: { product: IProduct }) => {

  return (
    <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
      <td className="pr-8 py-5 whitespace-nowrap">
        <a href="#" className="flex items-center space-x-5">
          <Image
            className="w-[60px] h-[60px] rounded-md object-cover bg-[#F2F3F5]"
            src={product.image}
            width={60}
            height={60}
            alt="product img"
          />
          <span className="font-medium text-heading text-hover-primary transition">
            {product.title}
          </span>
        </a>
      </td>
      <td className="px-3 py-3 font-normal text-[#55585B] text-end">#{product.sku}</td>
      <td className="px-3 py-3 font-normal text-[#55585B] text-end">
        {product.quantity}
      </td>
      <td className="px-3 py-3 font-normal text-[#55585B] text-end">
        ₹{product.originalPrice}
      </td>
      <td className="px-3 py-3 text-end">
        <span
          className={`text-[11px] px-3 py-1 rounded-md leading-none font-medium text-end 
          ${product.status === "active"? "text-success bg-success/10": "text-danger bg-danger/10"}`}
        >
          {product.status}
        </span>
      </td>
      <td className="px-9 py-3 text-end">
        <div className="flex items-center justify-end space-x-2">
          <EditDeleteBtn id={product._id}/>
        </div>
      </td>
    </tr>
  );
};

export default ProductTableItem;
