import React from "react";
import { UseFormRegister } from "react-hook-form";

const BrandDesc = ({
  default_val,
  register,
}: {
  default_val?: string;
  register: UseFormRegister<any>;
}) => {
  return (
    <div className="mb-5">
      <p className="mb-0 text-base text-black">Description</p>
      <textarea
        {...register(`description`, {
          required: false,
        })}
        className="input w-full rounded-md border border-gray6 px-6 text-base"
        name={`description`}
        placeholder="Description"
        rows={5}
        cols={15}
        defaultValue={default_val && default_val}
      />
    </div>
  );
};

export default BrandDesc;
