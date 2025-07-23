import React from "react";
import { UseFormRegister } from "react-hook-form";

const CategoryDescription = ({
  register,
  default_value
}: {
  register: UseFormRegister<any>;
  default_value?: string;
}) => {
  return (
    <div className="mb-6">
      <p className="mb-0 text-base text-black">Description</p>
      <textarea
        {...register("description", {
          required: false,
        })}
        className="input h-[150px] w-full py-3 resize-none"
        placeholder="Description Here"
        defaultValue={default_value && default_value}
      />
    </div>
  );
};

export default CategoryDescription;
