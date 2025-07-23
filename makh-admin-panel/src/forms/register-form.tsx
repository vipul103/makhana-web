"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
// internal
import { notifyError, notifySuccess } from "@/utils/toast";
import { useRegisterAdminMutation } from "@/redux/auth/authApi";
import ErrorMsg from "@/app/components/common/error-msg";

// schema
const schema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

const RegisterForm = () => {
  const [registerAdmin, {}] = useRegisterAdminMutation();
  const router = useRouter();
  // react hook form
  const {register,handleSubmit,formState: { errors },reset} = useForm({
    resolver: yupResolver(schema),
  });
  // on submit
  const onSubmit = async (data:{name:string;email:string;password:string}) => {
    const res = await registerAdmin({name:data.name,email:data.email,password:data.password});
    if ("error" in res) {
      if ("data" in res.error) {
        const errorData = res.error.data as { message?: string };
        if (typeof errorData.message === "string") {
          return notifyError(errorData.message);
        }
      }
    } else {
      notifySuccess("Register successfully");
      router.push('/dashboard')
      reset();
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-5">
        <p className="mb-0 text-base text-black">
          Your Name <span className="text-red">*</span>
        </p>
        <input
          {...register("name", { required: `Name is required!` })}
          name="name"
          className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base"
          type="text"
          placeholder="Enter Your Name"
        />
        <ErrorMsg msg={errors.name?.message as string} />
      </div>
      <div className="mb-5">
        <p className="mb-0 text-base text-black">
          Your Email <span className="text-red">*</span>
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
      <div className="mb-5">
        <p className="mb-0 text-base text-black">
          Password <span className="text-red">*</span>
        </p>
        <input
          {...register("password", { required: `Password is required!` })}
          name="password"
          className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base"
          type="password"
          placeholder="Password"
        />
        <ErrorMsg msg={errors.password?.message as string} />
      </div>
      <div className="tp-checkbox flex items-start space-x-2 mb-3">
        <input id="product-1" type="checkbox" />
        <label htmlFor="product-1" className="text-tiny">
          I accept the terms of the Service &amp; <a href="#">Privacy Policy</a>
          .
        </label>
      </div>
      <button className="tp-btn h-[49px] w-full justify-center">Sign Up</button>
    </form>
  );
};

export default RegisterForm;
