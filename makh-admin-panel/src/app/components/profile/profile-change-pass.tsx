"use client";
import { useAdminChangePasswordMutation} from "@/redux/auth/authApi";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ErrorMsg from "../common/error-msg";
import { notifyError, notifySuccess } from "@/utils/toast";

// schema
const schema = Yup.object().shape({
  password: Yup.string().required().min(6).label("Password"),
  newPassword: Yup.string().required().min(6).label("New Password"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("newPassword"), undefined],
    "Passwords must match"
  ),
});

const ProfileChangePass = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [changePassword, {}] = useAdminChangePasswordMutation();
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // on submit
  const onSubmit = async (data: { password: string; newPassword: string }) => {
    if (user) {
     const res =  await changePassword({
        email: user.email,
        oldPass: data.password,
        newPass: data.newPassword,
      });
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Password change successfully");
        reset();
      }
    }
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-5">
        <p className="mb-0 text-base text-black">Current Password</p>
        <input
          {...register("password", {
            required: `Password is required!`,
          })}
          name="password"
          className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base text-black"
          type="password"
          placeholder="Current Password"
        />
        <ErrorMsg msg={errors.password?.message as string} />
      </div>
      <div className="mb-5">
        <p className="mb-0 text-base text-black">New Password</p>
        <input
          {...register("newPassword", {
            required: `New Password is required!`,
          })}
          name="newPassword"
          className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base text-black"
          type="password"
          placeholder="New Password"
        />
        <ErrorMsg msg={errors.newPassword?.message as string} />
      </div>
      <div className="mb-5">
        <p className="mb-0 text-base text-black">Confirm Password</p>
        <input
          {...register("confirmPassword")}
          name="confirmPassword"
          className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base text-black"
          type="password"
          placeholder="Confirm Password"
        />
        <ErrorMsg msg={errors.confirmPassword?.message as string} />
      </div>
      <div className="text-end mt-5">
        <button className="tp-btn px-10 py-2">Save</button>
      </div>
    </form>
  );
};

export default ProfileChangePass;
