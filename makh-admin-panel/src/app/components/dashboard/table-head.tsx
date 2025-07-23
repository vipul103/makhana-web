import React from "react";

function ThItem({ title,cls }: { title: string,cls?:string }): React.JSX.Element {
  return (
    <th
      scope="col"
      className={`px-3 py-3 text-tiny text-text2 uppercase font-semibold ${cls}`}
    >
      {title}
    </th>
  );
}

const TableHead = () => {
  return (
    <thead className="bg-white">
      <tr className="border-b border-gray6 text-tiny">
        <ThItem title="INVOICE NO" />
        <ThItem title="ORDER TIME" />
        <ThItem title="CUSTOMER NAME" />
        <ThItem title="Price" />
        <ThItem title="Status" />
        <ThItem title="Action" />
        <ThItem title="Invoice" cls="text-end" />
      </tr>
    </thead>
  );
};

export default TableHead;
