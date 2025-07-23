import { notifySuccess, notifyError } from "@/utils/toast";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAddStaffMutation, useUpdateProfileMutation } from "@/redux/auth/authApi";
import dayjs from "dayjs";

const useStaffSubmit = () => {
  const [staffImg, setStaffImg] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const router = useRouter();
  // add
  const [addStaff, { data: addStuffData }] = useAddStaffMutation();
  // edit
  const [updateProfile, { data: updateData }] = useUpdateProfileMutation();

  // react hook form
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm();

  //handleSubmitStuff
  const handleSubmitStuff = async (data: any) => {
    try {
      const stuff_data = {
        image: staffImg,
        name: data?.name,
        email: data?.email,
        phone: data?.phone,
        password: data?.password,
        role: role,
        joiningDate: data?.joiningdate
          ? data.joiningdate
          : dayjs(new Date()).format("YYYY-MM-DD"),
      };
      const res = await addStaff({ ...stuff_data });
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Stuff added successfully");
        setIsSubmitted(true);
        reset();
        setStaffImg("");
      }
    } catch (error) {
      console.log(error);
      notifyError("Something went wrong");
    }
  };
  //handle Submit edit Category
  const handleSubmitEditStuff = async (data: any, id: string) => {
    try {
      const stuff_data = {
        image: staffImg,
        name: data?.name,
        email: data?.email,
        phone: data?.phone,
        password: data?.password,
        role: role,
        joiningDate: data?.joiningdate
          ? data.joiningdate
          : dayjs(new Date()).format("YYYY-MM-DD"),
      };
      const res = await updateProfile({ id, data: stuff_data });
      console.log(res)
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Stuff update successfully");
        router.push('/our-staff')
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
    setValue,
    errors,
    control,
    staffImg,
    setStaffImg,
    parent,
    handleSubmitStuff,
    isSubmitted,
    handleSubmitEditStuff,
    role,
    setRole,
  };
};

export default useStaffSubmit;
