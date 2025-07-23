import React from "react";
import ErrorMsg from "../../common/error-msg";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type IPropType = {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  defaultValue?: string;
};

const DescriptionTextarea = ({ register, errors, defaultValue }: IPropType) => {
  return (
    <div className="mb-5">
      <p className="mb-0 text-base text-black">Description</p>
      <div id="editor" className="text-base">
        <textarea
          {...register("description", {
            required: `description is required!`,
          })}
          placeholder="Your Description"
          className="input h-[120px] resize-none w-full py-3 text-base"
          defaultValue={defaultValue}
        />
        <ErrorMsg msg={(errors?.description?.message as string) || ""} />
      </div>
    </div>
  );
};

export default DescriptionTextarea;
