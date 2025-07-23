import Image from "next/image";
import React, { useEffect } from "react";
import profile_img from "@assets/img/users/user-4.jpg";
import { CameraTwo } from "@/svg";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useUploadImage from "@/hooks/useUploadImg";
import { IAdminUpdateRes } from "@/types/admin-type";
import Loading from "../common/loading";

// prop type
type IPropType = {
  setProfileImg: React.Dispatch<React.SetStateAction<string>>;
  updateData: IAdminUpdateRes | undefined;
};

const ProfileImage = ({ setProfileImg, updateData }: IPropType) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { handleImageUpload, uploadData, isError, isLoading } =
    useUploadImage();

  useEffect(() => {
    setProfileImg(
      uploadData?.data.url
        ? uploadData.data.url
        : user?.image
          ? user.image
          : ''
    );
  }, [setProfileImg, uploadData, user]);
  

  return (
    <div className="px-8 pb-8 relative">
      <div className="-mt-[75px] mb-3 relative inline-block">
        {isLoading ? (
          <Loading loading={isLoading} spinner="bar" />
        ) : (
          <Image
            className="w-[150px] h-[150px] rounded-[14px] border-4 border-white bg-white"
            src={
              uploadData?.data.url
                ? uploadData?.data.url
                : user?.image
                ? user.image
                : profile_img
            }
            width={142}
            height={142}
            alt="profile-img"
            style={{objectFit:'cover'}}
          />
        )}
        <input
          onChange={handleImageUpload}
          type="file"
          id="profilePhoto"
          className="hidden"
        />
        <label
          htmlFor="profilePhoto"
          className="inline-block w-8 h-8 rounded-full shadow-lg text-white bg-theme border-[2px] border-white text-center absolute top-[6px] right-[6px] translate-x-1/2 -translate-y-1/2 hover:cursor-pointer"
        >
          <CameraTwo />
        </label>
      </div>
      <div className="">
        <h5 className="text-xl mb-0 capitalize">{user?.name}</h5>
      </div>
    </div>
  );
};

export default ProfileImage;
