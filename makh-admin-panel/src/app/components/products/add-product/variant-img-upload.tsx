import React, { useEffect, useState } from "react";
import { Drug } from "@/svg";
import Loading from "../../common/loading";
import { useUploadImageMutation } from "@/redux/cloudinary/cloudinaryApi";
import UploadImage from "./upload-image";
import DefaultUploadImg from "./default-upload-img";

type IPropType = {
  index: number;
  relatedImages: string[];
  setImageURLs: React.Dispatch<React.SetStateAction<string[]>>;
  isSubmitted: boolean;
};
const VariantImgUpload = ({
  index,
  isSubmitted,
  setImageURLs,
  relatedImages,
}: IPropType) => {
  const [uploadImage, { data: uploadData, isError, isLoading, error }] =
    useUploadImageMutation();

  // handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      uploadImage(formData);
    }
  };
  useEffect(() => {
    if (uploadData && !isError) {
      setImageURLs((prev) => {
        const updatedFormData = [...prev];
        updatedFormData[index] = uploadData.data.url
        return updatedFormData;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, uploadData, isError]);
  

  return (
    <>
      <div className="mb-5">
        <p className="mb-0 text-base text-black">Upload your image here</p>
        <input
          onChange={handleImageUpload}
          type="file"
          name="image"
          id={`product_image_${index + 1}`}
          className="hidden"
        />
        <label
          htmlFor={`product_image_${index + 1}`}
          className="border-2 border-gray6 dark:border-gray-600 border-dashed rounded-md cursor-pointer  flex items-center justify-center h-[44px] leading-[44px] hover:bg-slate-100 transition-all linear ease"
        >
          <span className="mx-auto flex justify-center">
            <Drug />
          </span>
        </label>
      </div>

      {uploadData && !isError ? (
        <div>
          <p className="text-base text-black mb-3">image</p>
          <span className="mx-auto">
            {isLoading ? (
              <Loading loading={isLoading} spinner="scale" />
            ) : (
              <UploadImage
                file={{
                  url: uploadData ? uploadData.data.url : relatedImages[index],
                  id: uploadData?.data.id,
                }}
                setFormData={setImageURLs}
              />
            )}
          </span>
        </div>
      ) : (
        <div className="mb-5">
          <p className="mb-0 text-base text-black">Image</p>
          <DefaultUploadImg
            img={relatedImages[index]}
            isLoading={isLoading}
            wh={40}
          />
        </div>
      )}
    </>
  );
};

export default VariantImgUpload;
