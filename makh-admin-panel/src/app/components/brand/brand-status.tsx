import React from "react";
import ReactSelect from "react-select";

// type
type IPropType = {
  handleChange: (value: string | undefined | number) => void;
  default_value?:string
};

const BrandStatus = ({ handleChange ,default_value}: IPropType) => {
  return (
    <div className="mb-5">
      <p className="mb-0 text-base text-black">Status</p>
      <ReactSelect
        onChange={(value) => handleChange(value?.value)}
        options={[
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" },
        ]}
        defaultValue={
          default_value
            ? {
                label: default_value,
                value: default_value,
              }
            : {
                label: "Select..",
                value: 0,
              }
        }
      />
    </div>
  );
};

export default BrandStatus;
