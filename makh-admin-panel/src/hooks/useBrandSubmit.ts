import { useState } from "react";
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form";
import { useAddBrandMutation, useEditBrandMutation } from "@/redux/brand/brandApi";
import { notifyError, notifySuccess } from "@/utils/toast";

const useBrandSubmit = () => {
  const [logo, setLogo] = useState<string>("");
  const [status, setStatus] = useState<string>("active");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const router = useRouter();
  // add
  const [addBrand,{ data:brandData }] = useAddBrandMutation();
  // add
  const [editBrand, { data: brandEditData}] = useEditBrandMutation();

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // submit handle
  const handleSubmitBrand = async (data: any) => {
    try {
      const brand_data = {
        name: data?.name,
        description: data?.description,
        email: data?.email,
        website: data.website,
        location: data.location,
        logo: logo,
        status: status
      };
      const res = await addBrand({ ...brand_data });
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Brand added successfully");
        setIsSubmitted(true);
        reset();
        setLogo("");
      }
    } catch (error) {
      console.log(error);
      notifyError("Something went wrong");
    }
  };

  //handle Submit edit Category
  const handleSubmitEditBrand = async (data: any, id: string) => {
    try {
      const brand_data = {
        name: data?.name,
        description: data?.description,
        email: data?.email,
        website: data.website,
        location: data.location,
        logo: logo,
        status: status
      };
      const res = await editBrand({ id, data: brand_data });
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Brand update successfully");
        router.push('/brands')
        setIsSubmitted(true);
        reset();
      }
    } catch (error) {
      console.log(error);
      notifyError("Something went wrong");
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    setLogo,
    setStatus,
    handleSubmitBrand,
    isSubmitted,
    setIsSubmitted,
    handleSubmitEditBrand,
  };
};

export default useBrandSubmit;
