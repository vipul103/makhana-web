import React from 'react';

const ProductTableHead = () => {
  return (
    <thead className="bg-white">
      <tr className="border-b border-gray6 text-tiny">
        <th scope="col" className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold">
          Product
        </th>
        <th scope="col" className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end">
          SKU
        </th>
        <th scope="col" className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end">
          QTY
        </th>
        <th scope="col" className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end">
          Price
        </th>
        <th scope="col" className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end">
          Status
        </th>
        <th scope="col" className="px-9 py-3 text-tiny text-text2 uppercase  font-semibold w-[12%] text-end">
          Action
        </th>
      </tr>
    </thead>
  );
};

export default ProductTableHead;