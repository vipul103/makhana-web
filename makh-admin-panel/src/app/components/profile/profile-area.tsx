"use client";
import React, { useState } from "react";
import ProfileContent from "./profile-content";
import ProfileImage from "./profile-image";
import { useUpdateProfileMutation } from "@/redux/auth/authApi";

const ProfileArea = () => {
  const [profileImg, setProfileImg] = useState<string>("");
  const [updateProfile, { data: updateData }] = useUpdateProfileMutation();
  return (
    <>
      <div className="bg-white rounded-md pt-10 mb-10">
        <ProfileImage setProfileImg={setProfileImg} updateData={updateData} />
      </div>

      {/* profile content start */}
      <ProfileContent
        profileImg={profileImg}
        updateProfile={updateProfile}
      />
      {/* profile content end */}
    </>
  );
};

export default ProfileArea;
