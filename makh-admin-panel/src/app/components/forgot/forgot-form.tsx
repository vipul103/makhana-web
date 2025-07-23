"use client";
import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ErrorMsg from "../common/error-msg";
import { useForgetPasswordMutation } from "@/redux/auth/authApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import Link from "next/link";

// schema
const schema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

const ForgotForm = () => {
  const [forgetPassword, {}] = useForgetPasswordMutation();
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  // onSubmit
  const onSubmit = async (data: { email: string }) => {
    const res = await forgetPassword({
      email: data.email,
    });
    if ("error" in res) {
      if ("data" in res.error) {
        const errorData = res.error.data as { message?: string };
        if (typeof errorData.message === "string") {
          return notifyError(errorData.message);
        }
      }
    } else {
      if ("data" in res) {
        if("message" in res.data){
          notifySuccess(res.data.message);
        }
      }
      reset();
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-5">
        <p className="mb-0 text-base text-black">
          Email <span className="text-red">*</span>
        </p>
        <input
          {...register("email", { required: `Email is required!` })}
          name="email"
          className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base"
          type="email"
          placeholder="Enter Your Email"
        />
        <ErrorMsg msg={errors.email?.message as string} />
      </div>
      <button className="tp-btn h-[49px] w-full justify-center">
        Send Mail
      </button>

      <div className="tp-checkbox flex items-start space-x-2 mt-5 justify-center">
        <p className="mb-0 leading-none">
          Remember password ?{" "}
          <Link
            href="/login"
            className="text-theme border-b border-transparent hover:border-theme"
          >
            Login
          </Link>
        </p>
      </div>
    </form>
  );
};

export default ForgotForm;
