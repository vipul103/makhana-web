import React, { useState } from "react";
import Image from "next/image";
import { notifySuccess } from "@/utils/toast";
import { useDeleteCloudinaryImgMutation } from "@/redux/cloudinary/cloudinaryApi";

type IPropType = {
  uploadItems: { url: string; id: string }[];
};
const ThumbItems = ({ uploadItems }: IPropType) => {
  const [items, setItems] =
    useState<{ url: string; id: string }[]>(uploadItems);
  const [
    deleteCloudinaryImg,
    { data: delData, isError: delError, isLoading: delLoading },
  ] = useDeleteCloudinaryImgMutation();

  const handleDeleteImg = (file: { url: string; id: string }) => {
    try {
      const { id } = file;
      const folder_name = id.split("/")[0];
      const public_id = id.split("/")[1];
      deleteCloudinaryImg({
        folder_name: folder_name,
        id: public_id,
      });
      // Handle the response if needed
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      if (delData?.data?.result === "ok") {
        notifySuccess("Image deleted successfully");
      }
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      {items.map((file, i) => (
        <div
          key={i}
          className="inline-block mr-5"
          onClick={() => handleDeleteImg(file)}
        >
          <Image
            className="inline-flex border-2 border-gray-100 w-24 max-h-24"
            src={file.url}
            alt="thumb image"
            width={120}
            height={120}
          />
        </div>
      ))}
    </React.Fragment>
  );
};

export default ThumbItems;
