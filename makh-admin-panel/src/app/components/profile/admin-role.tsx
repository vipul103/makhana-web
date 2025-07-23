"use client"
import React,{useEffect} from 'react';
import ReactSelect from "react-select";

// prop type 
type IPropType = {
  handleChange: (value: string | number | undefined) => void;
  default_value?:string;
  setRole?:React.Dispatch<React.SetStateAction<string>>;
}
const AdminRole = ({handleChange,default_value,setRole}:IPropType) => {
  useEffect(() => {
    if(default_value && setRole){
      setRole(default_value)
    }
  },[default_value, setRole])
  return (
    <ReactSelect
    onChange={(value) => handleChange(value?.value)}
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
    options={[
      { value: "Admin", label: "Admin" },
      { value: "Super Admin", label: "Super Admin" },
      { value: "Manager", label: "Manager" },
      { value: "CEO", label: "CEO" },
    ]}
  />
  );
};

export default AdminRole;