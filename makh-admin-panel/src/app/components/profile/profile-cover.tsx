import React from "react";
import { Camera } from "@/svg";
import default_cover from "@assets/img/bg/profile-header.jpg";
import useUploadImage from "@/hooks/useUploadImg";

const ProfileCover = () => {
  const { handleImageUpload, uploadData, isError, isLoading } = useUploadImage();
  return (
    <div className="relative h-[200px] w-full">
      <div
        style={{
          backgroundImage: `url(${
            uploadData?.data.url ? uploadData?.data.url : default_cover.src
          })`,
        }}
        className="data-bg absolute top-0 left-0 w-full h-full bg-no-repeat bg-cover"
      ></div>
      <input
        onChange={handleImageUpload}
        type="file"
        id="coverPhoto"
        className="hidden"
      />
      <label
        htmlFor="coverPhoto"
        className="bg-white px-4 py-1 rounded-md text-center absolute right-5 top-5 sm:top-auto sm:bottom-5 z-10 text-tiny font-medium shadow-lg transition-all duration-200 border-0  hover:cursor-pointer hover:bg-theme hover:text-white"
      >
        <Camera />
        Upload Cover Photo
      </label>
    </div>
  );
};

export default ProfileCover;
