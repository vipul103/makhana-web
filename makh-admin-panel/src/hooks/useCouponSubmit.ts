import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useAddCouponMutation, useEditCouponMutation, useGetCouponQuery } from "@/redux/coupon/couponApi";
import dayjs from "dayjs";

const useCouponSubmit = () => {
  const [logo, setLogo] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [selectProductType, setSelectProductType] = useState<string>("");
  const [editId, setEditId] = useState<string>("");
  const router = useRouter();

  // add coupon
  const [addCoupon, { }] = useAddCouponMutation();
  // edit coupon
  const [editCoupon, { }] = useEditCouponMutation();
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();


  useEffect(() => {
    if (!openSidebar) {
      setLogo("")
      setSelectProductType("");
      reset();
    }
  }, [openSidebar, reset])
  // submit handle
  const handleCouponSubmit = async (data: any) => {
    try {
      const coupon_data = {
        logo: logo,
        title: data?.name,
        couponCode: data?.code,
        endTime: dayjs(data.endtime).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
        discountPercentage: data?.discountpercentage,
        minimumAmount: data?.minimumamount,
        productType: selectProductType,
      };

      const res = await addCoupon({ ...coupon_data });
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Coupon added successfully");
        setIsSubmitted(true);
        setLogo("")
        setOpenSidebar(false);
        setSelectProductType("");
        reset();
      }
    } catch (error) {
      console.log(error);
      notifyError("Something went wrong");
    }
  };

   //handle Submit edit Category
   const handleSubmitEditCoupon = async (data: any, id: string) => {
    try {
      const coupon_data = {
        logo: logo,
        title: data?.name,
        couponCode: data?.code,
        endTime: dayjs(data.endtime).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
        discountPercentage: data?.discountpercentage,
        minimumAmount: data?.minimumamount,
        productType: selectProductType,
      };
      const res = await editCoupon({ id, data: coupon_data });
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Coupon update successfully");
        router.push('/coupon')
        setIsSubmitted(true);
        reset();
      }
    } catch (error) {
      console.log(error);
      notifyError("Something went wrong");
    }
  };

  return {
    handleCouponSubmit,
    isSubmitted,
    setIsSubmitted,
    logo,
    setLogo,
    register,
    handleSubmit,
    errors,
    openSidebar,
    setOpenSidebar,
    control,
    selectProductType,
    setSelectProductType,
    handleSubmitEditCoupon,
    setEditId,
  };
};

export default useCouponSubmit;
