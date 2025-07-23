import React, { useEffect, useState } from "react";
import Loading from "../../common/loading";
import UploadImage from "./upload-image";
import DefaultUploadImg from "./default-upload-img";
import useUploadImage from "@/hooks/useUploadImg";

type IPropType = {
  imgUrl: string;
  setImgUrl: React.Dispatch<React.SetStateAction<string>>;
  isSubmitted: boolean;
  default_img?: string;
};

const ProductImgUpload = ({
  imgUrl,
  setImgUrl,
  isSubmitted,
  default_img,
}: IPropType) => {
  const [initialLoad, setInitialLoad] = useState(true);
  const {handleImageUpload,uploadData,isError,error,isLoading} = useUploadImage();

  useEffect(() => {
    if (uploadData && !isError) {
      setImgUrl(uploadData.data.url);
    }
  }, [uploadData, isError, setImgUrl]);

  useEffect(() => {
    if (default_img && initialLoad) {
      setImgUrl(default_img);
      setInitialLoad(false);
    }
  }, [default_img, initialLoad, setImgUrl]);

  // console.log(imgUrl);
  return (
    <div className="bg-white px-8 py-8 rounded-md mb-6 text-center">
      <p className="text-base text-black mb-4">Upload Image</p>
      <div className="text-center flex items-center justify-center">
        { isLoading ? (
          <Loading loading={isLoading} spinner="fade" />
        ) : uploadData && !isError ? (
          <UploadImage
            file={{
              url: uploadData?.data.url ? uploadData?.data.url : imgUrl,
              id: uploadData?.data.id,
            }}
            setImgUrl={setImgUrl}
          />
        ) : (
          <DefaultUploadImg img={default_img} isLoading={isLoading} wh={100} />
        )}
      </div>

      <div className="mt-8">
        <div>
          <input
            onChange={handleImageUpload}
            type="file"
            name="image"
            id="product_img"
            className="hidden"
          />
          <label
            htmlFor="product_img"
            className="text-tiny w-full inline-block py-1 px-4 rounded-md border border-gray6 text-center hover:cursor-pointer hover:bg-theme hover:text-white hover:border-theme transition"
          >
            Upload Image
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductImgUpload;
