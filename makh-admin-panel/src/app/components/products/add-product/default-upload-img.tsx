import Image from "next/image";
import React from "react";
import upload_default from "@assets/img/icons/upload.png";
import Loading from "../../common/loading";

const DefaultUploadImg = ({
  isLoading,
  wh,
  img,
}: {
  isLoading?: boolean;
  wh: number;
  img?: string;
}) => {
  return (
    <>
      {isLoading ? (
        <Loading loading={isLoading} spinner="bar" />
      ) : (
        <span className="mx-auto">
          <Image
            className="inline-flex border rounded-md border-gray6 w-24 max-h-24 p-2"
            src={img ? img : upload_default}
            alt="productImg"
            width={wh}
            height={wh}
          />
        </span>
      )}
    </>
  );
};

export default DefaultUploadImg;
